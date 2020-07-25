from flask import Flask, jsonify, request, Response
import customers_handler
import customersColls_handler
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/customers/get')
def customers_get():
    response = jsonify(customers_handler.get_customers())
    print(customers_handler.get_customers())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/customers_colls', methods=['GET', 'POST'])
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


if __name__ == '__main__':
    app.run(debug=True)
