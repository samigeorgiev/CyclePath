from copy import deepcopy


class GraphNode:
    """Node of graph

    used to copy a node from an osm graph
    """

    def __init__(self, node_id, location):
        self.node_id = deepcopy(node_id)
        self.long, self.lat = map(float, deepcopy(str(location)).split("/"))

    def __repr__(self):
        return {node_id: {self.node_id}, lat: {self.lat}, long: {self.long}}


class GraphEdge:
    """Edge of graph

    used to copy an edge from an osm graph
    """

    def __init__(self, start_node_id, end_node_id, distance, rating):
        self.start_node_id = start_node_id
        self.end_node_id = end_node_id
        self.distance = distance
        self.rating = rating
        self.cost = distance / rating

    def __repr__(self):
        return {
            start_node_id: {self.start_node_id},
            end_node_id: {self.end_node_id},
            distance: {self.distance},
            rating: {self.rating},
            cost: {self.cost},
        }


class NeoHandler:
    """Store nodes and edges from osm file"""

    def __init__(self):
        self.nodes = []
        self.edges = []

    def add_node(self, node):
        self.nodes.append(node)

    def add_edge(self, edge):
        self.edges.append(edge)
