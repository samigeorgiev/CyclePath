#!/usr/bin/env python3
from math import ceil
from os import getenv
from time import time

import argh
import osmium
from dotenv import load_dotenv
from py2neo import Graph
from py2neo.bulk import create_nodes, merge_relationships
from tqdm import tqdm

from utils import GraphEdge, GraphNode, NeoHandler, batchify, clear_db, haversine

load_dotenv()


class FileHandler(osmium.SimpleHandler):
    def __init__(self, neo_handler):
        super(FileHandler, self).__init__()
        self.neo_handler = neo_handler

    def node(self, n):  # default function called on node
        node = GraphNode(n.id, n.location)
        self.neo_handler.add_node(node)

    def way(self, w):  # default function called on edge

        # way starts and ends at one point
        if w.nodes[0].ref == w.nodes[-1].ref:
            return
        for i in range(len(w.nodes) - 1):
            start = GraphNode(w.nodes[i].ref, w.nodes[i].location)
            end = GraphNode(w.nodes[i + 1].ref, w.nodes[i + 1].location)
            distance = haversine(start, end)
            edge = GraphEdge(start.node_id, end.node_id, distance, 4)
            self.neo_handler.add_edge(edge)


def load(
    url: str = "http://download.geofabrik.de/europe/monaco-latest.osm.pbf",
    node_batch: int = 25000,
    relation_batch: int = 100,
    clear: bool = False,
):
    """load osm file into neo4j database

    Args:
        url (str, optional): location of osm file, could be in the cloud.
        Defaults to "http://download.geofabrik.de/europe/monaco-latest.osm.pbf".
        node_batch (int, optional): size of batches for nodes. Defaults to 25000.
        relation_batch (int, optional): size of batches for relations. Defaults to 50.
        clear (bool, optional): should database be cleared first. Defaults to False.
    """
    start_time = time()
    db = Graph(getenv("CON_STRING"), auth=(getenv("CON_USER"), getenv("CON_PASS")))
    print("connected to db")

    if clear:
        clear_db(db)

    neo_handler = NeoHandler()
    osm_handler = FileHandler(neo_handler)
    osm_handler.apply_file(url, locations=True)
    num_nodes = len(neo_handler.nodes)
    num_edges = len(neo_handler.edges)
    print(f"read file {url}, nodes: {num_nodes}, relations: {num_edges}")

    nodes = map(
        lambda n: {"node_id": n.node_id, "lat": n.lat, "long": n.long},
        neo_handler.nodes,
    )

    print(f"starting nodes with batch size {node_batch}")
    for batch in tqdm(
        batchify(nodes, batch_size=node_batch),
        total=ceil(num_nodes / node_batch),
    ):
        create_nodes(db.auto(), batch, labels={"Node"})

    edges = map(
        lambda e: (
            e.start_node_id,
            {"distance": e.distance, "rating": e.rating, "cost": e.cost},
            e.end_node_id,
        ),
        neo_handler.edges,
    )

    print(f"starting relations with batch size {relation_batch}")
    for batch in tqdm(
        batchify(edges, batch_size=relation_batch),
        total=ceil(num_edges / relation_batch),
    ):
        merge_relationships(
            db.auto(),
            batch,
            merge_key=("Route"),
            start_node_key=("Node", "node_id"),
            end_node_key=("Node", "node_id"),
        )

    print("creating gds graph")
    db.run("CALL gds.graph.create( 'nodesGraph', 'Node', 'Route', { relationshipProperties: ['rating', 'cost', 'distance'] } )")

    print(f"total time: {(time() - start_time)/60:.2f} minutes")


argh.dispatch_command(load)
