import json


def get_customers_colls():
    file = open('Customers_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    return data
