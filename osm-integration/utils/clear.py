from py2neo import Graph


def clear_db(graph: Graph):
    graph.run(
        """call apoc.periodic.iterate("MATCH (n:Node) return n", "DETACH DELETE n", {batchSize:10000})
        yield batches, total return batches, total"""
    )
    print("cleared db")