import json


def get_customers():
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    return data
