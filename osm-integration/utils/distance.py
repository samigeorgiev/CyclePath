from math import asin, cos, radians, sin, sqrt

from utils import GraphNode


def haversine(node_a: GraphNode, node_b: GraphNode):
    """haversine distance

    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)

    Args:
        node_a: (GraphNode), starting node
        node_b: (GraphNode), ending node

    Returns:
        float: distance in kilometers between the two nodes
    """
    # convert decimal degrees to radians
    lon1, lat1, lon2, lat2 = map(
        radians, [node_a.long, node_a.lat, node_b.long, node_b.lat]
    )

    # haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 6371  # Radius of earth in kilometers. Use 3956 for miles
    return c * r
