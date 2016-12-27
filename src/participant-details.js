import React from 'react';
import './participant-details.css';

function distance(walks) {
  return walks.map(function(walk) {
    return walk.distance;
  }).reduce(function(x, y) {
    return x + y;
  }, 0);
}


function ParticipantDetails(props) {
  const totalDistance = distance(props.walks);
  const totalWalks = props.walks.length;

  const displayName = props.name ?
    props.name + '\'' + (props.name.endsWith('s') ? '' : 's') :
    'Berlin';

  const prefix = props.name ? props.name + ' walked ' : '';

  return (
    <div className='participant-details'>
      <div className='title'>{displayName} Walks</div>
      <div className='distance'>
        {prefix}{totalDistance} km on {totalWalks} walk{totalWalks === 1 ? '' : 's'}
      </div>
    </div>
  );
}

export default ParticipantDetails;
