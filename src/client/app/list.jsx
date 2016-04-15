'use strict'

import React from 'react';
import ListItem from './list_item.jsx';

var List = React.createClass({

  render: function() {
    var rows = [];
    if(this.props.users != null) {
      var lastUser = null;
      var id = 1;
      var bounds = this.props.bounds;
      this.props.users.forEach(function(user) {
        if (user.name !== lastUser) {
          var userLatLng = new google.maps.LatLng({lat: user.lat, lng: user.lng});
          if (bounds == null || bounds.contains(userLatLng)){
            if (this.props.selectedUser && this.props.selectedUser.id == user.id) {
              var className = "selected";
            } else {
              var className = ""
            }
            rows.push(<ListItem 
              className={className} 
              key={id} 
              name={user.name} 
              lat={user.lat} 
              lng={user.lng} 
              avatar={user.avatar}
              lastSeen={user.lastSeen}
              distanceSI={user.distanceSI} />);
            id += 1
          }
        }
      }.bind(this));
    }
    return (
      <ul>
        {rows}
      </ul>
    );
  }

});

export default List;

