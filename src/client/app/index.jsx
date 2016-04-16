import React from 'react';
import ReactDOM from 'react-dom';

import List from './list.jsx';
import NavBar from './nav_bar.jsx';

var map;
var mapZoomLevel;
var mapMarkers = [];

var config = {
  initialLat: 43.75,
  initialLng: -79.38,
  mapZoomLevel: 10
};

// className selectors
var selectedUser = null;

// component styles
var appStyle = {
  height: '100%',
  width: '100%'
};

var mapStyle = {
  width: '70%',
  height: '85%',
  position: 'fixed !important',
  top: '4.3rem',
  left: '1%',
  marginRight: '1%',
  marginBottom: '2rem'
};

// from https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// root component
var App = React.createClass({

  getInitialState: function() {
    return {
      users: null,
      bounds: null,
      selectedUser: null
    }
  },

  reloadUsers: function() {
    $.get(this.props.source, function (result) {
      this.setState({
        users: result.users,
      });
    }.bind(this));
  },

  onBoundsChanged: function(newBounds) {
    this.setState({bounds: newBounds});
    debounce(this.reloadUsers, 250);
  },

  componentDidMount: function() {
    // want to do this on create as well
    this.reloadUsers();
  },

  onUserSelected: function(user) {
    this.setState({selectedUser: user});
    $('ul').animate({
      scrollTop: $("li.selected")[0].offsetTop
    }, "fast");
  },

  render: function() {
    return (
      <div style={appStyle}>
        <NavBar />
        <UsersMap 
          initialLat={config.initialLat} 
          initialLng={config.initialLng} 
          users={this.state.users} 
          bounds={this.state.bounds} 
          onUserSelected={this.onUserSelected}
          onBoundsChanged={this.onBoundsChanged}
          />
        <List selectedUser={this.state.selectedUser} users={this.state.users} bounds={this.state.bounds} />
      </div>
    );
  }

});

var UsersMap = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    var boundsHaveChanged = nextProps.bounds != this.props.bounds;
    return this.props.users == null || nextProps.bounds == null || boundsHaveChanged;
  },

  renderMarkers: function() {

    mapMarkers.forEach(function(marker) {
      marker.setMap(null);
    });

    if (this.props.users != null) {
      this.props.users.forEach(function(user) {

        var userImage = new google.maps.Circle({
          url: user.avatar,
          scaledSize: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0) 
        });

        var marker = new google.maps.Marker({
          position: {lat: user.lat, lng: user.lng},
          map: map,
          draggable: false,
          icon: userImage
        });

        marker.setMap(map);
        mapMarkers.push(marker); 

        marker.addListener('click', function() {
          this.props.onUserSelected(user);
        }.bind(this));
    
      }.bind(this));
    }

    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },

  renderMap: function(lat, lng) {

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true,
      center: new google.maps.LatLng(lat, lng)
    });

    map.addListener('bounds_changed', function() {
      this.props.onBoundsChanged(map.getBounds());
    }.bind(this));

  },

  componentDidMount: function () {
    this.renderMap(config.initialLat, config.initialLng);
  },

  componentDidUpdate: function() {
    this.renderMarkers();
  },

  render: function() {
    return (
      <div style={mapStyle} id="map"></div>        
    );
  }

});

navigator.geolocation.getCurrentPosition(function(result) {
  var coordinates = result.coords;
  var url = 'https://engine.eatsleepride.com:8088/api/search/usersNearby?lat=' + coordinates.latitude + '&lng=' + coordinates.longitude + '&token=17a9b49cf1a6748e466c498dc077edc9';
  ReactDOM.render(
    <App style={appStyle} source={url} />,
    document.getElementById('app')
  );
});
