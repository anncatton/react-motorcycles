'use strict';

import React from 'react';

var ListItem = React.createClass({

  getInitialState: function() {
    return {
      // userLat: this.props.lat,
      // userLng: this.props.lng
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
      <li>{this.props.name}, {this.props.location}</li>
    );
  }


});

export default ListItem;