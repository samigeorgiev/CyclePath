from itertools import chain, islice


def split_list_to_batches(initial_list, batch_size=5000):
    for i in range(0, len(initial_list), batch_size):
        yield initial_list[i : i + batch_size]


def batchify(iterable, batch_size=5000):
    sourceiter = iter(iterable)
    while True:
        try:
            batchiter = islice(sourceiter, batch_size)
            yield chain([next(batchiter)], batchiter)
        except:
            pass
