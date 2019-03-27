import React, { Component } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./Square.css";

class Square extends Component {

  render() {
    return (
      <div className={classNames('Square', 'Square-' + this.props.model.color)}>
        
      </div>
    )
  }

}

Square.propTypes = {
  model: PropTypes.object.isRequired
}

export default Square