def split_list_to_batches(initial_list, batch_size=5000):
    for i in range(0, len(initial_list), batch_size):
        yield initial_list[i : i + batch_size]

