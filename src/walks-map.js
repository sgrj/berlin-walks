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

function distance(walks) {
  return walks.map(function(walk) {
    return walk.distance;
  }).reduce(function(x, y) {
    return x + y;
  }, 0);
}


const TILE_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_ATTRIBUTION =
  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
  ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
  ' Imagery © <a href="http://mapbox.com">Mapbox</a>';
const ACCESS_TOKEN =
  'pk.eyJ1IjoiY3JlcGVscyIsImEiOiJjaXdheGxpdTcwMDF2MnpvNmNucDhrdnN0In0.WiXElc_RJUWKB_CFqssrBA';
const TILE_ID = 'mapbox.outdoors';

class WalksMap extends React.Component {
  constructor() {
    super();

    this.state = {
      walk: walks[0]
    };
  }
  render() {
    const walkObjects = walks.map((walk, i) => <Walk positions={walk.path} key={i}/>);
    const totalDistance = distance(walks);
    const totalWalks = walks.length;

    return (
      <div>
        <Map id='mapid' center={position} zoom={9}>
          <TileLayer
            url={TILE_URL}
            attribution={TILE_ATTRIBUTION}
            accessToken={ACCESS_TOKEN}
            id={TILE_ID}
          />
          {walkObjects}
        </Map>
        <div id='overlays'>
          <div className='global-info'>
            <div className='title'>Berlin Walks</div>
            <div className='distance'>{totalDistance} km on {totalWalks} walks</div>
          </div>
          <div className='walk-details'>
            <div className='walk-header'>
              <div className='title'>{this.state.walk.title}</div>
              <div className='info'>
                <span className='date'>{this.state.walk.date}</span>
                &nbsp;–&nbsp;
                <span className='distance'>{this.state.walk.distance} km</span>
                &nbsp;–&nbsp;
                <span className='participants'>
                  {this.state.walk.participants.length} walkers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WalksMap;
