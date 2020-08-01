import React from "react";
import axios from "axios";
import Prod_coll from "./prod_coll";
import PCollsF from "./PCollsF";
import PInputF from "./PInput";

class Products extends React.Component {
  state = {
    colls: [],
    prods: [],
    loaded: false,
    collsf: false,
    coll_name: "",
    edit_coll_id: 0,
    coll_price: 0,
    edit_colls: false,
  };

  values = [];

  getColls = () => {
    axios.get("http://127.0.0.1:5000/products_colls").then((res) => {
      this.setState({ colls: Object.values(res.data)[0] });
    });
  };

  getProds = () => {
    axios
      .get("http://127.0.0.1:5000/products?id=" + this.props.id)
      .then((res) => {
        this.setState({ prods: Object.values(res.data) });
      });
  };

  sendProds = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/products",
      data: {
        id: this.props.id,
        values: this.values,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => {
      this.load_page();
    });
  };

  change = (data, id) => {
    let flag = false;
    let del = false;
    if (data == "") {
      del = true;
    }
    if (this.values.length < 1) {
      this.values.push(id + "_" + decodeURIComponent(data));
    } else {
      for (let i = 0; i < this.values.length; i++) {
        if (this.values[i].split("_")[0] == id) {
          if (del) {
            this.values.splice(i, 1);
          } else {
            this.values[i] = id + "_" + decodeURIComponent(data);
          }
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.values.push(id + "_" + decodeURIComponent(data));
      }
    }
    console.log(this.values);
  };

  toggle_collsf = (load = false, update = false, id) => {
    for (let i = 0; i < this.state.colls.length; i++) {
      if (this.state.colls[i]["id"] == id) {
        this.setState({
          coll_name: this.state.colls[i]["name"],
          edit_coll_id: id,
          coll_price: this.state.colls[i]["price"],
        });
        break;
      }
    }

    this.setState({ collsf: !this.state.collsf });
    if (load) {
      this.setState({ loaded: false });
    }
    this.setState({ edit_colls: update });
  };

  lastCollId = () => {
    return (
      parseInt(
        Object.values(Object(this.state.colls[this.state.colls.length - 1]))[0]
      ) + 1
    );
  };

  load_page = () => {
    this.setState({ loaded: false });
  };

  render() {
    if (!this.state.loaded) {
      this.getProds();
      this.getColls();
      this.setState({ loaded: true });
      console.log(this.state.prods);
      console.log(this.state.colls);
    }
    return (
      <div>
        {this.state.collsf && (
          <PCollsF
            coll_id={this.state.edit_coll_id}
            coll_name={this.state.coll_name}
            coll_price={this.state.coll_price}
            toggle={this.toggle_collsf}
            update={this.state.edit_colls}
            id={this.lastCollId()}
          />
        )}
        <center>
          <button onClick={this.props.reload}>חזור</button>
        </center>
        <table className="prod_tab">
          <thead>
            <tr>
              <th colSpan={this.state.colls.length + 1}>מוצרים</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(this.state.colls).map((obj) => {
              return (
                <Prod_coll
                  reload={this.props.reload}
                  reload_id={this.props.id}
                  load={this.load_page}
                  toggle={this.toggle_collsf}
                  price={Object.values(obj)[2]}
                  name={Object.values(obj)[1]}
                  id={Object.values(obj)[0]}
                />
              );
            })}
            <th onClick={this.toggle_collsf} className="plus">
              +
            </th>
            <tr>
              {this.state.colls.map((coll, index) => {
                return (
                  <PInputF
                    change={this.change}
                    id={Object.values(coll)[0]}
                    value={this.state.prods[index]["quantity"]}
                  />
                );
              })}
            </tr>
          </tbody>
        </table>
        <br></br>
        <center>
          <button onClick={this.sendProds}>שלח</button>
        </center>
      </div>
    );
  }
}

export default Products;
