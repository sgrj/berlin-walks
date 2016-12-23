import React from 'react';
import { Map, Polyline, TileLayer } from 'react-leaflet';
import walks from './walks';

const position = [52.45, 13.30];

class Walk extends React.Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }
  handleMouseOver() {
    this.setState({ hover: true });
  }
  handleMouseOut() {
    this.setState({ hover: false });
  }
  render() {
    return (
      <div>
        <Polyline
          className={this.state.hover ? 'hover' : ''}
          positions={this.props.positions} />
        <Polyline
          className='hidden'
          positions={this.props.positions}
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
        />
      </div>
    );
  }
}

class WalksMap extends React.Component {
  render() {
    const walkObjects = walks.map(walk => <Walk positions={walk.path} />);
    return (
      <Map id='mapid' center={position} zoom={9}>
        <TileLayer
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          accessToken='pk.eyJ1IjoiY3JlcGVscyIsImEiOiJjaXdheGxpdTcwMDF2MnpvNmNucDhrdnN0In0.WiXElc_RJUWKB_CFqssrBA'
          id='mapbox.outdoors'
        />
        {walkObjects}
      </Map>
    );
  }
}

export default WalksMap;
