import React from "react";
import "./Customers.css";
import Customer_Mid from "./Customer_Mid";
import axios from "axios";
import CollsF from "./Colls_Form";
import CustomersF from "./Customers_Form";
import Coll from "./coll";
import Products from "./Products";

class Customers extends React.Component {
  state = {
    loaded: false,
    customers: [],
    colls: [],
    collsf: false,
    customersf: false,
    edit_colls: false,
    coll_name: "",
    edit_coll_id: 0,
    cust: [],
    edit_cust_id: 0,
    edit_cust: false,
    prods: false,
    prod_id: ""
  };

  getCustomers = () => {
    axios.get("http://127.0.0.1:5000/customers").then((res) => {
      this.setState({ customers: Object.values(res.data)[0] });      
    });
  };

  getColls = () => {
    axios.get("http://127.0.0.1:5000/customers_colls").then((res) => {
      this.setState({ colls: Object.values(res.data)[0] });
    });
  };

  toggle_collsf = (load=false, update=false, id) => {     
    for(let i = 0; i < this.state.colls.length; i++)
    {
      if(this.state.colls[i]['id'] == id)
      {        
        this.setState({coll_name:this.state.colls[i]['name'], edit_coll_id:id})
        break;
      }
    }

    this.setState({ collsf: !this.state.collsf });    
    if(load)
    {
      this.setState({loaded: false})
    }
    this.setState({edit_colls: update})
  };

  toggle_customersf = (load=false, update=false, id, cust) => {        
    this.setState({ customersf: !this.state.customersf });
    this.setState({edit_cust_id:id, cust:cust, edit_cust: update})
    if(load)
    {
      this.load_page()
    }    
  };

  prods = (id) => {    
    this.setState({prods: true, prod_id: id})
  }

  load_page = () => {
    this.setState({loaded: false})
  }

  lastCollId = () => {
    return parseInt(Object.values(Object(this.state.colls[this.state.colls.length-1]))[0])+1
  }

  lastCustomerId = () => {
    return parseInt(Object.values(Object(this.state.customers[this.state.customers.length-1])).slice(-2,-1)[0])+1
  }  
  
  reloadProds = (id) => {
    window.location.reload().then(this.setState({prod_id: id, prods: true}))    
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
        {this.state.collsf && <CollsF coll_id={this.state.edit_coll_id} coll_name={this.state.coll_name} toggle={this.toggle_collsf} update={this.state.edit_colls} id={this.lastCollId()}/>}
        {this.state.customersf && <CustomersF update={this.state.edit_cust} cust={this.state.cust} edit_id={this.state.edit_cust_id} colls={this.state.colls} toggle={this.toggle_customersf} id={this.lastCustomerId()}/>}
        {this.state.prods && <Products back={this.back} id={this.state.prod_id} reload={this.reloadProds}/>}
        {!this.state.prods && <table>
          <thead>
            <tr>
              <th colSpan={this.state.colls.length + 1}>לקוחות</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(this.state.colls).map((obj) => {
                return <Coll toggle={this.toggle_collsf} load={this.load_page} name={Object.values(obj)[1]} id={Object.values(obj)[0]}/>;                
              })}
              <th onClick={this.toggle_collsf} className="plus">
                +
              </th>
            </tr>
            <Customer_Mid prods={this.prods} toggle={this.toggle_customersf} load={this.load_page} c_lst={this.state.customers} />
            <tr>
              <th onClick={this.toggle_customersf} colSpan={this.state.colls.length + 1} className="plus">+</th>
            </tr>
          </tbody>
        </table>}
      </div>
    );
  }
}

export default Customers;