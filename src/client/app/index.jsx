import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';

/// So secure
var key = "AIzaSyC_9SnjEtTWdvu1bcIkE7GTMt1ZGGfOMJs";
var USERS = [
  {name: 'Hugo', lat: 43.45, lng: -80.99},
  {name: 'Johnny', lat: 44.01, lng: -79.22},
  {name: 'Tammy', lat: 44.90, lng: -78.56},
  {name: 'Sally', lat: 43.06, lng: -79.03},
  {name: 'Chocolate Thunder', lat: 44.20, lng: -79.86},
  {name: 'Handsome', lat: 43.10, lng: -79.65}
];
/// Google Map Vars
var map;
var mapZoomLevel;
/// Config for the app setup
var config = {
  initialLat: 43.75,
  initialLng: -79.38,
  mapZoomLevel: 10
}

var App = React.createClass({

  getInitialState: function() {
    return {data: null}
  },
  
  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var users = result.users;
      this.setState({
        data: users
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <UsersMap initialLat={config.initialLat} initialLng={config.initialLng} userNames={this.state.data} />
        <List userNames={this.state.data} />
      </div>
    );
  }

});

var UsersMap = React.createClass({

  getInitialState: function () {
    return {
      data: null
    };
  },

  componentWillUpdate: function() {

  },


  renderMarkers: function() {
    var lastUser = null;


    if (this.props.userNames != null) {
      this.props.userNames.forEach(function(user) {
        if (user.name !== lastUser) {
          var marker = new google.maps.Marker({
            position: {lat: user.lat, lng: user.lng},
            map: map,
            draggable: false
          });
          marker.setMap(map);
        }
      });
    }


    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },

  renderMap: function(lat, lng) {
    
    /// Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true,
      center: new google.maps.LatLng(lat, lng)
    });
  
    this.renderMarkers();
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

ReactDOM.render(
  <App source={'https://engine.eatsleepride.com:8088/api/search/usersNearby?lat=43.648714&lng=-79.3924411&token=17a9b49cf1a6748e466c498dc077edc9'} />,
  document.getElementById('app')
);