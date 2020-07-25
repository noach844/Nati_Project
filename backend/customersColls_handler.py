import json


def get_customers_colls():
    file = open('Customers_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    return data


def post_customers_colls(coll):
    data = get_customers_colls()
    data["customers_colls"].append(coll)
    file = open('Customers_colls.json', 'w')
    json.dump(data, file, indent=4)



