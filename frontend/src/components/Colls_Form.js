import React from "react";
import "./colls_form.css";
import axios from "axios";

class CollsF extends React.Component {
  state = {
    value: "",
    loaded: false    
  };

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
      url: "http://127.0.0.1:5000/customers_colls",
      data: {
        id: this.props.id,
        name: decodeURIComponent(this.state.value)
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
      url: "http://127.0.0.1:5000/customers_colls",
      data: {
        id: this.props.coll_id,
        name: decodeURIComponent(this.state.value)
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
    if(this.props.update){
      this.handleEdit()
    }
    else{
      this.handleSubmit()
    }
  }
  

  render() {    
    if(!this.state.loaded && this.props.update){
      this.setState({value:this.props.coll_name, loaded:true, action:this.handleEdit})
    }
    return (
      <section className="overlay">
        <div className="collsForm" ref={(node) => (this.node = node)}>
          <center>
            <div className="formHead">
              {this.props.update && <h1>ערוך עמודה</h1>}
              {!this.props.update && <h1>הוסף עמודה</h1>}
            </div>
            <label>שם עמודה: </label>
            <input
              onChange={this.handleChange}
              value={this.state.value}
              type="text"
              placeholder="הכנס שם עמודה"
            />
            <br></br>
            <br></br>
            <button onClick={this.action}>שלח</button>
          </center>
        </div>
      </section>
    );
  }
}

export default CollsF;
