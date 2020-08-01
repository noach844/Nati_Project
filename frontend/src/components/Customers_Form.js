import React from "react";
import "./colls_form.css";
import axios from "axios";
import InputF from "./inputF";

class CustomersF extends React.Component {
  state = {
    load: false,
  };

  values = [];

  componentWillMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.props.toggle();
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/customers",
      data: {
        id: this.props.id,
        values: this.values,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => {
      this.props.toggle(true);
    });
  };

  handleEdit = () => {
    axios({
      method: "PUT",
      url: "http://127.0.0.1:5000/customers",
      data: {
        id: this.props.edit_id,
        values: this.values,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => {
      this.props.toggle(true);
    });
  };

  action = () => {
    if(this.props.update)
    {
      this.handleEdit()
    }
    else{
      this.handleSubmit()
    }
  }

  change = (data, id) => {
    let flag = false;
    let del = false;
    if (data == "") {
      del = true;
    }
    if (this.values.length < 1) {
      this.values.push(id + "_d" + decodeURIComponent(data));
    } else {
      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].split("_")[0] == id) {
          if (del) {
            this.values.splice(i, 1);
          } else {
            this.values[i] = id + "_d" + decodeURIComponent(data);
          }
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.values.push(id + "_d" + decodeURIComponent(data));
      }
    }
  };
  
  render() {
    console.log(this.props.cust)
    return (
      <section className="overlay">
        <div className="collsForm" ref={(node) => (this.node = node)}>
          <center>
            <div className="formHead">
              <h1>הוסף לקוח</h1>
            </div>
            {this.props.colls.map((coll, index) => {
              if (!this.props.update) {
                return (
                  <InputF
                    change={this.change}
                    id={Object.values(coll)[0]}
                    name={Object.values(coll)[1]}
                  />
                );
              } else {                                                            
                return (
                  <InputF
                    change={this.change}
                    id={Object.values(coll)[0]}
                    name={Object.values(coll)[1]}
                    value={this.props.cust[index]}                    
                  />
                );                                              
              }              
            })}
            <br></br>
            <br></br>
            <button onClick={this.action}>שלח</button>
          </center>
        </div>
      </section>
    );
  }
}

export default CustomersF;
