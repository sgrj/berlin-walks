import React from 'react';
import { Polyline } from 'react-leaflet';
import { DomEvent } from 'leaflet';
import './walk-path.css';

class WalkPath extends React.Component {
  render() {
    var className = 'walk-path';
    if (this.props.selected) {
      className += ' selected';
    }
    if (this.props.highlighted) {
      className += ' highlighted';
    }
    return (
      <div>
        <Polyline
          className='hidden'
          positions={this.props.positions}
          onClick={e => {
            this.props.onClick();
            DomEvent.stopPropagation(e);
          }}
        />
        <Polyline
          className={className}
          interactive={false}
          positions={this.props.positions} />
      </div>
    );
  }
}

export default WalkPath;
