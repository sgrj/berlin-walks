import React from 'react';
import { Polyline } from 'react-leaflet';
import { DomEvent } from 'leaflet';
import './walk-path.css';

class WalkPath extends React.Component {
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
    var className = 'walk-path';
    if (this.state.hover) {
      className += ' hover';
    }
    if (this.props.selected) {
      className += ' selected';
    }
    if (this.props.highlighted) {
      className += ' highlighted';
    }
    return (
      <div>
        <Polyline
          className={className}
          positions={this.props.positions} />
        <Polyline
          className='hidden'
          positions={this.props.positions}
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={e => {
            this.props.onClick();
            DomEvent.stopPropagation(e);
          }}
        />
      </div>
    );
  }
}

export default WalkPath;
