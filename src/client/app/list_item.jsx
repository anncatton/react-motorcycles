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
      <li className={this.props.className}>{this.props.name}, {this.props.lat}, {this.props.lng}</li>
    );
  }


});

export default ListItem;