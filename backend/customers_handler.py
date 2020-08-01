import json
import productsColls_handler

def get_customers():
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    return data


def add_customer(cust):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    data['customers'].append(customer_create(cust))
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def customer_create(cust):
    new_cust = {}
    new_cust['id'] = cust['id']
    new_cust['prods'] = []
    file = open('Customers_colls.json', 'r+', encoding='utf-8')
    colls = file.read()
    colls = json.loads(colls)
    prodColls = productsColls_handler.get_products_colls()
    for i in prodColls['products']:
        prod = {"id":i['id'], "quantity":0}
        new_cust['prods'].append(prod)
    for i in colls['customers_colls']:
        new_cust[str(i['id'])] = ""
    for i in cust['values']:
        data = i.split("_")
        new_cust[data[0]] = data[1][1:]
    file.close()
    return new_cust


def delete_key(id):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        if id in i.keys():
            del i[id]
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def delete_cust(id):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        if i['id'] == id:
            data['customers'].remove(i)
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def add_coll(id):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        i[id] = ""
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def edit_cust(cust):
    file = open('Customers.json', 'r+', encoding='utf-8')
    f_data = file.read()
    f_data = json.loads(f_data)
    for i in f_data['customers']:
        if i['id'] == cust['id']:
            for j in cust['values']:
                data = j.split("_")
                i[data[0]] = data[1][1:]

    file.truncate(0)
    file.seek(0)
    json.dump(f_data, file, indent=4)
    file.close()


def get_prods(id):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    file.close()
    for i in data['customers']:
        if i['id'] == id:
            return i['prods']


def del_prod(id):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        for j in i['prods']:
            if j['id'] == id:
                i['prods'].remove(j)
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()


def update_prods(prods):
    file = open('Customers.json', 'r+', encoding='utf-8')
    data = file.read()
    data = json.loads(data)
    for i in data['customers']:
        if i['id'] == prods['id']:
            for j in i['prods']:
                for k in prods['values']:
                    if j['id'] == int(k.split("_")[0]):
                        j['quantity'] = float(k.split("_")[1])
                        break
    file.truncate(0)
    file.seek(0)
    json.dump(data, file, indent=4)
    file.close()

