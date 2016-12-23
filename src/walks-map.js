import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

const position = [52.45, 13.30];

class WalksMap extends React.Component {
  render() {
    return (
      <Map id='mapid' center={position} zoom={9}>
        <TileLayer
          url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}'
          attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
          accessToken='pk.eyJ1IjoiY3JlcGVscyIsImEiOiJjaXdheGxpdTcwMDF2MnpvNmNucDhrdnN0In0.WiXElc_RJUWKB_CFqssrBA'
          id='mapbox.outdoors'
        />
      </Map>
    );
  }
}

export default WalksMap;
