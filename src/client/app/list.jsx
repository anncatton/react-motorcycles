'use strict'

import React from 'react';
import ListItem from './list_item.jsx';

var List = React.createClass({

  getInitialState: function() {
    return {data: null}
  },

  componentDidMount: function() {
    
  },

  render: function() {
    var rows = [];
    if(this.props.userNames != null) {
      var lastUser = null;
      var id = 1;
      this.props.userNames.forEach(function(userName) {
        if (userName.name !== lastUser) {
          rows.push(<ListItem key={id} name={userName.name} lat={userName.lat} lng={userName.lng} />);
          id += 1
        }
      });
    }
    return (
      <ul>
        {rows}
      </ul>
    );
  }

});

export default List;

