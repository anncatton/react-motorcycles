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
    // if (this.state.data) {
    //   return (
    //     <div>
    //       <UsersMap initialLat={config.initialLat} initialLng={config.initialLng} userNames={this.state.data} />
    //       <List userNames={this.state.data} />
    //     </div>
    //   )
    // } else {
    //   return (
    //     <div>
    //       <UsersMap initialLat={config.initialLat} initialLng={config.initialLng} />
    //       <List />
    //     </div>
    //   )
    // }
  }

});

var UsersMap = React.createClass({

  getInitialState: function () {
    return {
      data: null
    };
  },

  // updateState: function() {

  componentWillUpdate: function() {

  // componentWillReceiveProps: function() {
    var mapMarkers = []
    var lastUser = null;
    var id = 1;

    // var latLng = new google.maps.LatLng(this.state.lat, this.state.lng);

    // this.props.userNames.forEach(function(user) {
    //   if (user.name !== lastUser) {
    //     var marker = new google.maps.Marker({
    //       position: {lat: user.lat, lng: user.lng},
    //       map: map,
    //       draggable: false
    //     });
    //     marker.setMap(map);
    //   }
    // });
  },
    /**
   * Render the map on the page
   */
  renderMap: function(lat, lng) {

    /**
     * Map coordinates and pin coordinates are added in updateMap(),
     * which is run by updateStateWithData()
     */
    
    /// Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true,
      center: new google.maps.LatLng(lat, lng)
    });
  
    /// Create a new marker
    
    /// Set the initial pin drop animation
    // marker.setAnimation(google.maps.Animation.DROP);
  
    /// Add an event listener for click
    // google.maps.event.addListener(map, 'click', function(event) {
    //   var latLng = event.latLng;
    //   var lat = latLng.lat();
    //   var lng = latLng.lng();
      
    //   /// Update state based on lat lon
    //   this.updateState(null, lat, lng);
    // }.bind(this));
    
    // /// Add an event listener for drag end
    // google.maps.event.addListener(marker, 'dragend', function(event) {
      
    //   var latLng = event.latLng;
    //   var lat = latLng.lat();
    //   var lng = latLng.lng();
    //   /// Update state based on lat lon
    //   this.updateState(null, lat, lng);
    // }.bind(this));
    
    /// Update variable on map change
    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },

  // updateState: function () {


    /// Set a timeout before doing map stuff
    // window.setTimeout( function() {
      
    //   /// Set the marker position
    //   // marker.setMap(map);
      
    //   /// Pan map to that position
    //   // map.panTo(latLng);
    // }.bind(this), 300);
  // },
  /**
   * Set map marker position and pan settings
   */

  // updateState: function() {
  //   console.log('here');
  //   updateMap();
  // },
    /**
   * After initial render
   */
  componentDidMount: function () {
    /// Render a new map
    this.renderMap(config.initialLat, config.initialLng);

    // this.serverRequest = $.get(this.props.source).done(function(result) {
    //   var users = result.users;
    //   // this.setState({data: result});
    // }.bind(this));


    // this.getData();
    // this.updateState();

    /// Run update state, passing in the setup
    // this.updateState(null, this.state.lat, this.state.lon);
  },

  // somewhere in this function is where the ajax needs to happen (getData, then update map)
  // getData: function () {
  //   this.serverRequest = $.get(this.props.source).done(function(result) {
  //     var users = result.users;
  //     this.setState({data: result});
  //   }.bind(this));
  // },
    // Variable to return
    // var data;
    
    // return data;
    /**
   * Update state
   */
  // updateState: function (locationName, lat, lon) {
    
  //   // Get data from the API, then set state with it
    // this.getData(locationName, lat, lon)
    //   .then(function(data) {
    //     /// Update the state, pass updateMap as a callback
    //     this.setState({
    //       lat:      data.coord.lat,
    //       lon:      data.coord.lon,
    //       weather:  this.capitalizeFirstLetter( data.weather[0].description ),
    //       location: data.name,
    //       icon:     'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png' /// Messy
    //     }, this.updateMap ) /// Pass updateMap as a callback
    //   }.bind(this));
  //   // return null;
  // },

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