from flask import Flask, jsonify, request, Response
import customers_handler
import customersColls_handler
from flask_cors import CORS
import productsColls_handler
import json

app = Flask(__name__)
CORS(app)


@app.route('/customers', methods=['GET', 'POST', 'DELETE', 'PUT'])
def customers_get():
    if request.method == 'GET':
        response = jsonify(customers_handler.get_customers())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        customer = json.loads(request.data)
        customers_handler.add_customer(customer)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = json.loads(request.data)
        customers_handler.delete_cust(id['id'])
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        cust = json.loads(request.data)
        customers_handler.edit_cust(cust)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/customers_colls', methods=['GET', 'POST', 'DELETE', 'PUT'])
def customers_colls_get():
    if request.method == 'GET':
        response = jsonify(customersColls_handler.get_customers_colls())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        coll = json.loads(request.data)
        customersColls_handler.post_customers_colls(coll)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = json.loads(request.data)
        customersColls_handler.delete_customer_coll(id['id'])
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        coll = json.loads(request.data)
        customersColls_handler.edit_coll(coll)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/products_colls', methods=['GET', 'POST', 'DELETE', 'PUT'])
def products_colls():
    if request.method == 'GET':
        response = jsonify(productsColls_handler.get_products_colls())
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        coll = json.loads(request.data)
        productsColls_handler.post_products_colls(coll)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = json.loads(request.data)
        productsColls_handler.delete_products_coll(id['id'])
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        coll = json.loads(request.data)
        productsColls_handler.edit_prod(coll)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


@app.route('/products', methods=['GET', 'POST'])
def prods():
    if request.method == 'GET':
        id = int(request.args.get('id'))
        response = jsonify(customers_handler.get_prods(id))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'POST':
        coll = json.loads(request.data)
        customers_handler.update_prods(coll)
        response = Response(status=200)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == '__main__':
    app.run(debug=True)
