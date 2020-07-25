from flask import Flask, jsonify, request
import customers_handler
import customersColls_handler

app = Flask(__name__)


@app.route('/customers/get')
def customers_get():
    response = jsonify(customers_handler.get_customers())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/customers_colls/get')
def customers_colls_get():
    response = jsonify(customersColls_handler.get_customers_colls())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    app.run(debug=True)
