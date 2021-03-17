#!/bin/env python3
import argparse
from os import getenv

import osmium
from dotenv import load_dotenv
from py2neo import Graph
from py2neo.bulk import create_nodes, merge_relationships

from utils import GraphEdge, GraphNode, batchify, haversine

load_dotenv()


parser = argparse.ArgumentParser()
parser.add_argument("--url", type=str, default="", help="link or path to osm")


class FileHandler(osmium.SimpleHandler):
    def __init__(self, neoHandler):
        super(FileHandler, self).__init__()
        self.neoHandler = neoHandler

    def node(self, n):
        node = GraphNode(n.id, n.location)
        self.neoHandler.add_node(node)

    def way(self, w):
        if w.nodes[0].ref == w.nodes[-1].ref:
            return
        for i in range(len(w.nodes) - 1):
            start = GraphNode(w.nodes[i].ref, w.nodes[i].location)
            end = GraphNode(w.nodes[i + 1].ref, w.nodes[i + 1].location)
            distance = haversine(start, end)
            edge = GraphEdge(start.node_id, end.node_id, distance, 4)
            self.neoHandler.add_edge(edge)


class Neo4jHandler:
    def __init__(self):
        self.nodes = []
        self.edges = []

    def add_node(self, node):
        self.nodes.append(node)

    def add_edge(self, edge):
        self.edges.append(edge)


if __name__ == "__main__":
    args = parser.parse_args()
    url = args.url

    g = Graph(getenv("CON_STRING"), auth=(getenv("CON_USER"), getenv("CON_PASS")))
    print("connected to db")

    neo_handler = Neo4jHandler()
    h = FileHandler(neo_handler)
    h.apply_file(url, locations=True)
    print(f"read file {url}")

    nodes = map(
        lambda n: {"node_id": n.node_id, "lat": n.lat, "long": n.long},
        neo_handler.nodes,
    )

    print("starting nodes")
    for i, batch in enumerate(batchify(nodes, batch_size=25000)):
        create_nodes(g.auto(), batch, labels={"Node"})
    print("end nodes")

    edges = map(
        lambda e: (
            e.start_node_id,
            {"distance": e.distance, "rating": e.rating, "cost": e.cost},
            e.end_node_id,
        ),
        neo_handler.edges,
    )

    print("starting edges")
    for i, batch in enumerate(batchify(edges, batch_size=50)):
        print(f"relation {i}")
        merge_relationships(
            g.auto(),
            batch,
            merge_key=("Route"),
            start_node_key=("Node", "node_id"),
            end_node_key=("Node", "node_id"),
        )
    print("end edges")

