import React from "react";
import "./inputs.css";

class PInputF extends React.Component {
  state = {
    value: "",
    loaded: false,
  };

  render() {
    if (!this.state.loaded) {
        this.setState({value: this.props.value, loaded: true})        
    }
    return (                
          <td>
            <input
              placeholder={"הכנס כמות"}
              onChange={(event) => {
                this.props.change(event.target.value, this.props.id);
                this.setState({ value: event.target.value });
              }}
              id={this.props.id}
              className="inpF"
              value={this.state.value}
            />
          </td>        
    );
  }
}

export default PInputF;
