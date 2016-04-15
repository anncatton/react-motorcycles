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
      var bounds = this.props.bounds;
      this.props.userNames.forEach(function(user) {
        if (user.name !== lastUser) {
          var userLatLng = new google.maps.LatLng({lat: user.lat, lng: user.lng});
          if (bounds == null || bounds.contains(userLatLng)){
            rows.push(<ListItem key={id} name={user.name} lat={user.lat} lng={user.lng} />);
            id += 1
          }
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

