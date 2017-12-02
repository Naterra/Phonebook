import React, { Component } from "react";

class Mymodal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_open: false
    };

    this.button_click = this.button_click.bind(this);
  }

  button_click() {
    console.log(this, "button_click");
    this.setState({ is_open: !this.state.is_open });
    console.log(this.state.is_open, "MODAL");
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextState, "componentWillUpdate");
    if (nextState.is_open == true) {
      $("#modal1").modal("open");
    } else {
      $("#modal1").modal("close");
    }
  }
  modal_body() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a className="modal-action modal-close waves-effect waves-green btn-flat">
            Agree
          </a>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.button_click} className="btn modal-trigger">
          Modal
        </button>
        {this.modal_body()}
      </div>
    );
  }
}

export default Mymodal;
