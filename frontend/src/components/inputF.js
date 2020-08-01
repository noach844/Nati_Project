import React from "react";
import "./inputs.css";

class InputF extends React.Component {
  state = {
    value: "",
    loaded: false,
  };

  render() {
    if (!this.state.loaded) {
        this.setState({value: this.props.value, loaded: true})              
    }
    return (
      <table className="inTab">
        <tr>
          <td>{this.props.name}:</td>
          <td>
            <input
              placeholder={"הכנס " + this.props.name}
              onChange={(event) => {
                this.props.change(event.target.value, this.props.id);
                this.setState({ value: event.target.value });
              }}
              id={this.props.id}
              className="inpF"
              value={this.state.value}
            />
          </td>
        </tr>
      </table>
    );
  }
}

export default InputF;
