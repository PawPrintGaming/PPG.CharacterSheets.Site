import React from 'react';
import CrowsIcon from './CrowsIcon';
import MasksIcon from './MasksIcon';
import RamsIcon from './RamsIcon';
import TomesIcon from './TomesIcon';
import './suits.css'

const suitNames = {
  crows: 'crows',
  masks: 'masks',
  rams: 'rams',
  tomes: 'tomes'
}

export default suitNames

export const iconForSuit = (suitName) => {
  switch (suitName) {
    case suitNames.crows:
      return <CrowsIcon />;
    case suitNames.masks:
      return <MasksIcon />;
    case suitNames.rams:
      return <RamsIcon />;
    case suitNames.tomes:
      return <TomesIcon />;
    default:
      return null;
  }
}