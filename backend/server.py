from flask import Flask, jsonify, request
import customer_handler

app = Flask(__name__)


@app.route('/customers/get')
def hello_world():
    return customer_handler.get_customers()


if __name__ == '__main__':
    app.run(debug=True)
