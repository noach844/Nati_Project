import React from "react";
import "./Customers.css";
import Customer_Mid from "./Customer_Mid";
import axios from 'axios';

class Customers extends React.Component {
  // customers = [
  //   {
  //     name: "עומר",
  //     lanme: "נח",
  //     phone: "0503344478",      
  //   },
  //   {
  //     name: "עומר1",
  //     lanme: "נח1",
  //     phone: "0503344478",
  //   },
  //   {
  //     name: "עומר1",
  //     lanme: "נח1",
  //     phone: "0503344478",      
  //   },
  // ];

  getCustomers = () => {
    axios.get('http://127.0.0.1:5000/customers/get').then(res => {console.log(res.data)})   
  }  

  colls = {
      colls: [
          "שם","שם משפחה","פלאפון"
      ]
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th onClick={this.getCustomers} colSpan={Object.values(this.colls)[0].length}>לקוחות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {this.colls["colls"].map(col => {
              return <th>{col}</th>}
              )}
            </tr>
            {/* <Customer_Mid c_lst={this.customers} /> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;
