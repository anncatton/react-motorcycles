import React from 'react';
import ReactDOM from 'react-dom';
import List from './list.jsx';

/// So secure
var key = "AIzaSyC_9SnjEtTWdvu1bcIkE7GTMt1ZGGfOMJs";
var USERS = [
  {name: 'Hugo', location: 'Toronto'},
  {name: 'Johnny', location: 'Montreal'},
  {name: 'Tammy', location: 'Vancouver'},
  {name: 'Sally', location: 'Halifax'},
  {name: 'Chocolate Thunder', location: 'New York'},
  {name: 'Handsome', location: 'Cleveland'}
];
/// Google Map Vars
var map;
var marker;
var mapZoomLevel;

/// Config for the app setup
var config = {
  initialLat: 43.75,
  initialLon: -79.38,
  mapZoomLevel: 10
}

var UsersMap = React.createClass({
 
  /** 
   * Set an initial state
   */
  getInitialState: function () {

    return {
      /// Passed as props on render
      lat: this.props.initialLat,
      lon: this.props.initialLon,
    };
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
    marker = new google.maps.Marker({
      map: map,
      draggable: false
    });
    
    /// Set the initial pin drop animation
    marker.setAnimation(google.maps.Animation.DROP);
  
    /// Add an event listener for click
    google.maps.event.addListener(map, 'click', function(event) {
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      
      /// Update state based on lat lon
      this.updateState(null, lat, lng);
    }.bind(this));
    
    /// Add an event listener for drag end
    google.maps.event.addListener(marker, 'dragend', function(event) {
      
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      /// Update state based on lat lon
      this.updateState(null, lat, lng);
    }.bind(this));
    
    /// Update variable on map change
    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  },

    /**
   * After initial render
   */
  componentDidMount: function () {
    
    /// Render a new map
    this.renderMap(config.initialLat, config.initialLon);
    
    /// Run update state, passing in the setup
    this.updateState(null, this.state.lat, this.state.lon);
  },
  // somewhere in this function is where the ajax needs to happen (getData, then update map)
 // getData: function (location, lat, lon) {
    
 //    Variable to return
 //    var data;
    
    
 //    return data;
 //  },
    /**
   * Update state
   */
  updateState: function (locationName, lat, lon) {
    
    /// Get data from the API, then set state with it
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
    return null;
  },
  
  /**
   * Set map marker position and pan settings
   */
  updateMap: function (lat, lon) {

    var latLng = new google.maps.LatLng(this.state.lat, this.state.lon);
    
    /// Set a timeout before doing map stuff
    window.setTimeout( function() {
      
      /// Set the marker position
      marker.setPosition(latLng);
      
      /// Pan map to that position
      map.panTo(latLng);
    }.bind(this), 300);
  },
    render: function() {
      var divStyle = {height: "50%", width: "50%"};
      return (
        <div>
          <div id="map" style={divStyle}></div>
          <List userNames={this.props.users} />
        </div>
      );
    }
});

/**
 * Slap it on the page
 */
ReactDOM.render(
  <UsersMap initialLat={config.initialLat} initialLon={config.initialLon} users={USERS} />,
  document.getElementById('app')
);