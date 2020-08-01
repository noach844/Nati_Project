import React from "react";
import axios from "axios";

class Customer extends React.Component {
  state = {
    id: this.props.details[this.props.details.length - 2],
    prods: this.props.details[this.props.details.length - 1],
    details: this.props.details.slice(0, this.props.details.length - 2),
  };

  handleclick = () => {
    console.log(this.props.details);
  };

  clicked = () => {
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:5000/customers",
      data: {
        id: this.state.id,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => {
      this.props.load();
    });
  };

  render() {
    return (
      <tr>
        {this.props.details
          .slice(0, this.props.details.length - 2)
          .map((value) => (
            <td onClick={this.props.prods.bind(this, this.state.id)}>{value}</td>
          ))}
        <td>
          <button onClick={this.clicked} className="delbtn">
            <span
              class="iconify"
              data-icon="mdi:delete-outline"
              data-inline="true"
            ></span>
          </button>
          <button
            onClick={this.props.toggle.bind(
              this,
              false,
              true,
              this.state.id,
              this.props.details.slice(0, this.props.details.length - 2)
            )}
            className="delbtn"
          >
            <span
              class="iconify"
              data-icon="mdi:pencil-outline"
              data-inline="true"
            ></span>
          </button>
        </td>
      </tr>
    );
  }
}

export default Customer;
