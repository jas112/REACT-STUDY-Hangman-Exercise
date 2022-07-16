import React, { Component } from 'react';


class AlphaButton extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.functionMethod(this.props.value)
    }

  render() {
    return (
        <button className='AlphaButton'
            value={this.props.value}
            onClick={this.handleClick}
            disabled={this.props.isDisabled}
        >
            {this.props.value}
        </button>
    )
  }
}

export default AlphaButton