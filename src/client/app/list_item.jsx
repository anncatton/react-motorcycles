'use strict';

import React from 'react';

// component styles
var listItemStyle = {
  position: 'relative',
  height: '6rem',
  borderBottom: '2px solid lightgray',
  padding: '0.2rem'
};

var selectedListItemStyle = {
  backgroundColor: '#E8F3DB',
  position: 'relative',
  height: '6rem',
  borderBottom: '2px solid lightgray',
  padding: '0.2rem'
};

var imageStyle = {
  borderRadius: '50%',
  position: 'absolute',
  top: '0.8rem',
  left: '3%',
  objectFit: 'cover',
  height: '5rem',
  width: '25%'
};

var userNameStyle = {
  fontSize: '1.3rem',
  color: '#03A9F4',
  fontWeight: '300',
  float: 'right',
  textAlign: 'right'
};

var userDistanceStyle = {
  display: 'inline-block',
  position: 'absolute',
  right: '2%',
  top: '4rem',
  paddingBottom: '0.2rem',
  textAlign: 'right'
};

var userTimeStyle = {
  display: 'inline-block',
  position: 'absolute',
  right: '2%',
  top: '5rem',
  textAlign: 'right',
  paddingBottom: '0.1rem'
};

var ListItem = React.createClass({

  render: function() {
    if (this.props.className == 'selected') {
      return (
        <li style={selectedListItemStyle} className={this.props.className}>
          <h3 style={userNameStyle}>{this.props.name}</h3>
          <img style={imageStyle} src={this.props.avatar} />
          <span style={userDistanceStyle}>Last seen at: {new Date(this.props.lastSeen).toLocaleTimeString("en-us")}</span>
          <span style={userTimeStyle}>About {Math.floor(this.props.distanceSI)} km away</span>
        </li> 
      );  
    } else {
      return (
        <li style={listItemStyle} className={this.props.className}>
          <h3 style={userNameStyle}>{this.props.name}</h3>
          <img style={imageStyle} src={this.props.avatar} />
          <span style={userDistanceStyle}>Last seen at: {new Date(this.props.lastSeen).toLocaleTimeString("en-us")}</span>
          <span style={userTimeStyle}>About {Math.floor(this.props.distanceSI)} km away</span>
        </li>
      );
    }
  }
});

export default ListItem;