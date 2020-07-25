import json

with open('Customers.json', 'r+', encoding='utf-8') as file:
    data = file.read()
    data = json.loads(data)


def get_customers():
    return data



