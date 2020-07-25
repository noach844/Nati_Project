import React from "react";
import "./colls_form.css";

class CollsF extends React.Component {
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

  render() {
    return (
      <section className="overlay">
        <div className="collsForm" ref={(node) => (this.node = node)}>
          <center>
            <div className="formHead">
              <h1>הוסף עמודה</h1>
            </div>
            <label>שם עמודה: </label>
            <input type={Text} placeholder="הכנס שם עמודה" />
            <br></br>
            <br></br>
            <button>שלח</button>
          </center>
        </div>
      </section>
    );
  }
}

export default CollsF;
