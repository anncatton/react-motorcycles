'use strict';

import React from 'react';

var navStyle = {
  height: '3.5rem',
  width: '100%',
  position: 'fixed',
  top: '0px',
  left: '0px',
  backgroundColor: '#EF7062',
  zIndex: '500'
};

var navTextStyle = {
  fontsize: '1.3rem',
  color: 'whitesmoke',
  fontFamily: 'Optima',
  textTransform: 'uppercase',
  display: 'inline-block',
  marginLeft: '10%',
  paddingTop: '0.3rem'
}
var NavBar = React.createClass({
  
  render: function() {
    return(
      <div style={navStyle}>
      <h3 style={navTextStyle}>My Name</h3>
      <h3 style={navTextStyle}>News</h3>
      <h3 style={navTextStyle}>Hot</h3>
      <h3 style={navTextStyle}>Bikes</h3>
      <h3 style={navTextStyle}>Routes</h3>
      <h3 style={navTextStyle}>Stories</h3>
      </div>
    );
  }

});

export default NavBar;