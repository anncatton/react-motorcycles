'use strict';

import React from 'react';

var ListItem = React.createClass({

  getInitialState: function() {
    return {

    };
  },

  getDefaultProps: function() {
    return {
      name: ''
    }
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <li className={this.props.className}>
        <img src={this.props.avatar} />
        {this.props.name}, {this.props.lastSeen}, {this.props.distanceSI}
      </li>
    );
  }


});

export default ListItem;