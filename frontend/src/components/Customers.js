import React from "react";
import "./Customers.css";
import Customer_Mid from "./Customer_Mid";
import axios from "axios";
import CollsF from "./Colls_Form";

class Customers extends React.Component {
  state = {
    loaded: false,
    customers: [],
    colls: [],
    collsf: false
  };

  getCustomers = () => {
    axios.get("http://127.0.0.1:5000/customers/get").then((res) => {
      this.setState({ customers: Object.values(res.data)[0] });      
    });
  };

  getColls = () => {
    axios.get("http://127.0.0.1:5000/customers_colls").then((res) => {
      this.setState({ colls: Object.values(res.data)[0] });
    });
  };

  toggle_collsf = (load=false) => {    
    this.setState({ collsf: !this.state.collsf });
    if(load)
    {
      this.setState({loaded: false})
    }
  };

  last = () => {
    return parseInt(Object.values(Object(this.state.colls[this.state.colls.length-1]))[0])+1
  }

  render() {
    {          
      if (!this.state.loaded) {
        this.getColls();
        this.getCustomers();
        this.setState({ loaded: true });                             
      }      
    }
    return (
      <div>
        {this.state.collsf && <CollsF toggle={this.toggle_collsf} id={this.last()}/>}
        <table>
          <thead>
            <tr>
              <th colSpan={this.state.colls.length + 1}>לקוחות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(this.state.colls).map((obj) => {
                return <th>{Object.values(obj)[1]}</th>;
              })}
              <th onClick={this.toggle_collsf} className="plus">
                +
              </th>
            </tr>
            <Customer_Mid c_lst={this.state.customers} />
            <tr>
              <th colSpan={this.state.colls.length + 1} className="plus">+</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;