import React from "react";
import "./colls_form.css";
import axios from "axios";

class PCollsF extends React.Component {
  state = {
    value: "",
    price: "",
    loaded: false,
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

  handlePrice = (event) => {
    this.setState({ price: event.target.value });
  };

  handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/products_colls",
      data: {
        id: this.props.id,
        name: decodeURIComponent(this.state.value),
        price: parseFloat(this.state.price),
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
      url: "http://127.0.0.1:5000/products_colls",
      data: {
        id: this.props.coll_id,
        name: decodeURIComponent(this.state.value),
        price: parseFloat(this.state.price)
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
    if (this.props.update) {
      this.handleEdit();
    } else {
      this.handleSubmit();
    }
  };

  render() {
    if (!this.state.loaded && this.props.update) {
      this.setState({
        value: this.props.coll_name,
        loaded: true,
        action: this.handleEdit,
        price: this.props.coll_price
      });
    }
    return (
      <section className="overlay">
        <div className="collsForm" ref={(node) => (this.node = node)}>
          <center>
            <div className="formHead">
              {this.props.update && <h1>ערוך מוצר</h1>}
              {!this.props.update && <h1>הוסף מוצר</h1>}
            </div>
            <table className="inTab">
              <tr>
                <td>שם המוצר:</td>
                <td>
                  <input
                    onChange={this.handleChange}
                    value={this.state.value}
                    type="text"
                    placeholder="הכנס שם מוצר"
                  />
                </td>
              </tr>
              <tr>
                <td>מחיר:</td>
                <td>
                  <input
                    onChange={this.handlePrice}
                    value={this.state.price}
                    type="text"
                    placeholder="הכנס מחיר"
                  />
                </td>
              </tr>
            </table>
            <button onClick={this.action}>שלח</button>
          </center>
        </div>
      </section>
    );
  }
}

export default PCollsF;
