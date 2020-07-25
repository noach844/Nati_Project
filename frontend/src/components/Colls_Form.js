import React from "react";
import "./colls_form.css";

class CollsF extends React.Component {
  state = {
    value:""
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

  sendValues = () => {
    
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {    
    console.log(this.props.id)
    console.log(this.state.value)
  }

  render() {    
    return (    
      <section className="overlay">
        <div className="collsForm" ref={(node) => (this.node = node)}>
          <center>
            <div className="formHead">
              <h1>הוסף עמודה</h1>
            </div>
            <label>שם עמודה: </label>
            <input onChange={this.handleChange} value={this.state.value} type={Text} placeholder="הכנס שם עמודה" />
            <br></br>
            <br></br>
            <button onClick={this.handleSubmit}>שלח</button>
          </center>
        </div>
      </section>
    );
  }
}

export default CollsF;
