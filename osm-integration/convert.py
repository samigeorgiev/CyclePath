#!/bin/env python3
import sys

import argh
from osmium import SimpleHandler, SimpleWriter


class Convert(SimpleHandler):
    def __init__(self, writer):
        super(Convert, self).__init__()
        self.writer = writer

    def node(self, n):
        self.writer.add_node(n)

    def way(self, w):
        self.writer.add_way(w)

    def relation(self, r):
        self.writer.add_relation(r)


def convert(in_file: str, out_file: str):
    writer = SimpleWriter(out_file)
    handler = Convert(writer)

    handler.apply_file(in_file)
    writer.close()
    print(f"converted {in_file} to {out_file}")


argh.dispatch_command(convert)
