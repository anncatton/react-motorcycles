import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';

var map;
var mapZoomLevel;
var mapMarkers = [];

var config = {
  initialLat: 43.75,
  initialLng: -79.38,
  mapZoomLevel: 10
}
var selectedUser = null;

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

var App = React.createClass({

  getInitialState: function() {
    return {
      users: null,
      bounds: null,
      selectedUser: null
    }
  },

  updateData: function(e, data) {
    var bounds;
    if (data != null) { 
      bounds = data.bounds;
    }

    $.get(this.props.source, function (result) {
      var users = result.users;
      this.setState({
        users: users,
        bounds: bounds
      });
    }.bind(this));
  },
  
  componentDidMount: function() {

    $(document).on("map_changed", debounce(this.updateData, 250));

    // want to do this on create as well
    this.updateData();

    $(document).on("user_selected", function(e, data) {
      this.setState({selectedUser: data.selected});
    }.bind(this));
  },

  render: function() {
    return (
      <div>
        <UsersMap initialLat={config.initialLat} initialLng={config.initialLng} users={this.state.users} bounds={this.state.bounds}/>
        <List selectedUser={this.state.selectedUser} users={this.state.users} bounds={this.state.bounds} />
      </div>
    );
  }

});

var UsersMap = React.createClass({

  shouldComponentUpdate: function(nextProps, nextState) {
    var boundsHaveChanged = nextProps.bounds != this.props.bounds;
    return nextProps.bounds == null || boundsHaveChanged;
  },

  renderMarkers: function() {

    mapMarkers.forEach(function(marker) {
      marker.setMap(null);
    });

    if (this.props.users != null) {
      this.props.users.forEach(function(user) {
        var userImage = {
          url: user.avatar,
          scaledSize: new google.maps.Size(20, 32),
          origin: new google.maps.Point(0, 0)
        };

        var marker = new google.maps.Marker({
          position: {lat: user.lat, lng: user.lng},
          map: map,
          draggable: false,
          icon: userImage
        });

        marker.setMap(map);
        mapMarkers.push(marker); 

        marker.addListener('click', function() {
          $(document).trigger('user_selected', { selected: user });
        });
      });
    }

    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },

  triggerMapChanged: function(map) {
    $(document).trigger("map_changed", { bounds: map.getBounds() });
  },

  renderMap: function(lat, lng) {

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true,
      center: new google.maps.LatLng(lat, lng)
    });

    // is there a way to do this in React?
    map.addListener('bounds_changed', function() {
      this.triggerMapChanged(map);
    }.bind(this));

  },

  componentDidMount: function () {
    this.renderMap(config.initialLat, config.initialLng);
  },

  componentDidUpdate: function() {
    this.renderMarkers();
  },

  render: function() {
    var divStyle = {height: "100%", width: "70%"};

    return (
      <div id="map" style={divStyle}></div>        
    );
  }

});

navigator.geolocation.getCurrentPosition(function(result) {
  var coordinates = result.coords;
  var url = 'https://engine.eatsleepride.com:8088/api/search/usersNearby?lat=' + coordinates.latitude + '&lng=' + coordinates.longitude + '&token=17a9b49cf1a6748e466c498dc077edc9';
  ReactDOM.render(
    <App source={url} />,
    document.getElementById('app')
  );
});
