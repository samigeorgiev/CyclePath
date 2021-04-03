from itertools import chain, islice


def split_list_to_batches(initial_list, batch_size=5000):
    for i in range(0, len(initial_list), batch_size):
        yield initial_list[i : i + batch_size]


def batchify(iterable, batch_size=5000):
    """split any list or iterable into batches

    Args:
        iterable (any): self explanatory, input data
        batch_size (int, optional): size of each batch. Defaults to 5000.

    Yields:
        chain: iterable batch
    """
    sourceiter = iter(iterable)
    while True:
        try:
            batchiter = islice(sourceiter, batch_size)
            yield chain([next(batchiter)], batchiter)
        except:
            break
