import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import WalkPath from './walk-path';
import WalkDetails from './walk-details';


const POSITION = [52.45, 13.30];
const TILE_URL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
const TILE_ATTRIBUTION =
  'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
  ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
  ' Imagery © <a href="http://mapbox.com">Mapbox</a>';
const ACCESS_TOKEN =
  'pk.eyJ1IjoiY3JlcGVscyIsImEiOiJjaXdheGxpdTcwMDF2MnpvNmNucDhrdnN0In0.WiXElc_RJUWKB_CFqssrBA';
const TILE_ID = 'mapbox.outdoors';



function distance(walks) {
  return walks.map(function(walk) {
    return walk.distance;
  }).reduce(function(x, y) {
    return x + y;
  }, 0);
}


function GlobalInfo(props) {
  const totalDistance = distance(props.walks);
  const totalWalks = props.walks.length;

  const displayName = props.name ?
    props.name + '\'' + (props.name.endsWith('s') ? '' : 's') :
    'Berlin';

  const prefix = props.name ? props.name + ' walked ' : '';

  return (
    <div className='global-info'>
      <div className='title'>{displayName} Walks</div>
      <div className='distance'>{prefix}{totalDistance} km on {totalWalks} walks</div>
    </div>
  );
}

class WalksMap extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedWalk: null,
      selectedName: null
    };
  }
  isHighlighted(walk) {
    return walk.participants.indexOf(this.state.selectedName) >= 0;
  }
  selectWalk(walk) {
    this.setState({ selectedWalk: walk });
  }
  selectName(name) {
    this.setState({ selectedName: name });
  }
  reset() {
    this.setState({
      selectedWalk: null,
      selectedName: null
    });
  }
  render() {
    const walkObjects = this.props.walks.map((walk, i) =>
      <WalkPath
        positions={walk.path}
        key={i}
        selected={this.isHighlighted(walk)}
        onClick={() => this.selectWalk(walk)}
        />
    );

    const selectedWalks = this.state.selectedName ?
      this.props.walks.filter(walk => this.isHighlighted(walk)) :
      this.props.walks;

    return (
      <div>
        <Map id='mapid' center={POSITION} zoom={9} onClick={() => this.reset()}>
          <TileLayer
            url={TILE_URL}
            attribution={TILE_ATTRIBUTION}
            accessToken={ACCESS_TOKEN}
            id={TILE_ID}
          />
          {walkObjects}
        </Map>
        <div id='overlays'>
          <GlobalInfo walks={selectedWalks} name={this.state.selectedName} />
          <WalkDetails walk={this.state.selectedWalk} onClickName={(name) => this.selectName(name)} />
        </div>
      </div>
    );
  }
}

export default WalksMap;
