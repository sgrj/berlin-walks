import React from 'react';
import _ from 'lodash';
import './walk-details.css';

function WalkDetails(props) {
  if (props.walk == null) {
    return (
      <div className='walk-details empty'>
        <div className='title'>Select a walk</div>
      </div>
    );
  }

  const separator = ' – ';

  const participatsLinks = props.walk.participants.map(participant =>
    <a
      className='participant'
      onClick={() => props.onClickName(participant)}
      key={participant}>
      {participant}
    </a>
  );

  const participantsList = _.range(participatsLinks.length * 2 - 1).map(function(i) {
    return i % 2 === 0 ? participatsLinks[i / 2] : ' • ';
  });

  const blogLink = props.walk.blog ? [
    separator,
    <a className='blog' target='_blank' href={props.walk.blog} key='blog'>blog</a>
  ] : '';

  return (
    <div className='walk-details'>
      <div className='title'>{props.walk.title}</div>
      <div className='info'>
        <span className='date'>{props.walk.date}</span>
        {separator}
        <span className='distance'>{props.walk.distance} km</span>
        {separator}
        <span className='participants'>
          {props.walk.participants.length} walkers
        </span>
        {blogLink}
      </div>
      <div className='details'>
        {participantsList}
      </div>
    </div>
  );
}

export default WalkDetails;
