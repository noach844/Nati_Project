import React from "react";
import axios from "axios";

class Prod_coll extends React.Component {
  clicked = () => {
    axios({
      method: "DELETE",
      url: "http://127.0.0.1:5000/products_colls",
      data: {
        id: this.props.id,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => {
      this.props.reload(this.props.reload_id)
    });
  };


  render() {
    return (
      <th>
        {this.props.name + " "}         
        {" " + this.props.price + "$"}
        <button onClick={this.clicked}>
          <span
            class="iconify"
            data-icon="mdi:delete-outline"
            data-inline="true"
          ></span>
        </button>
        <button
          onClick={this.props.toggle.bind(this, false, true, this.props.id)}
        >
          <span
            class="iconify"
            data-icon="mdi:pencil-outline"
            data-inline="true"
          ></span>
        </button>
      </th>
    );
  }
}

export default Prod_coll;
