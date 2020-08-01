import json
import customers_handler


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
    customers_handler.add_coll(str(coll['id']))
    file.close()


def delete_customer_coll(id):
    file = open('Customers_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers_colls']:
        if i['id'] == id:
            data['customers_colls'].remove(i)
    customers_handler.delete_key(str(id))
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def edit_coll(coll):
    file = open('Customers_colls.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers_colls']:
        if i['id'] == coll['id']:
            i['name'] = coll['name']
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()
