'use strict'

import React from 'react';
import ListItem from './list_item.jsx';

var List = React.createClass({

  render: function() {
    var rows = [];
    var lastUser = null;
    var id = 1;

    this.props.userNames.forEach(function(user) {
      if (user.name !== lastUser) {
        rows.push(<ListItem key={id} name={user.name} lat={user.lat} lng={user.lng} />);
        id += 1
      }
    });

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

