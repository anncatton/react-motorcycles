'use strict'

import React from 'react';
import ListItem from './list_item.jsx';

var rows = [];

var List = React.createClass({

  getInitialState: function() {
    return {data: null}
  },

  updateState: function() {
    var lastUser = null;
    var id = 1;

    /// Set a timeout before doing map stuff

    this.props.userNames.forEach(function(user) {
      if (user.name !== lastUser) {
        rows.push(<ListItem key={id} name={user.name} lat={user.lat} lng={user.lng} />);
        id += 1
      }
    });

  },

  componentDidMount: function() {
    window.setTimeout( function() {
      var lastUser = null;
      var id = 1;

    /// Set a timeout before doing map stuff

      this.props.userNames.forEach(function(user) {
        if (user.name !== lastUser) {
          rows.push(<ListItem name={user.name} lat={user.lat} lng={user.lng} />);
          id += 1
        }
      });
    }.bind(this), 300);
  },

  render: function() {
    return (
      <div>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }

});

export default List;

