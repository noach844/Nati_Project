import json
import customers_handler

def get_products_colls():
    file = open('Products_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    return data


def delete_products_coll(id):
    file = open('Products_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['products']:
        if i['id'] == id:
            data['products'].remove(i)
    customers_handler.del_prod(id)
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def post_products_colls(coll):
    data = get_products_colls()
    data["products"].append(coll)
    file = open('Products_colls.json', 'w')
    json.dump(data, file, indent=4)
    file.close()
    file = open("Customers.json", 'r+')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        i['prods'].append({"id":coll['id'], "quantity": 0})
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def edit_prod(coll):
    file = open('Products_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['products']:
        if i['id'] == coll['id']:
            i['name'] = coll['name']
            i['price'] = coll['price']
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()

