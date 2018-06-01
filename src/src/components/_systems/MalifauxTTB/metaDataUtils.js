import * as keys from './metaDataKeys';
import {getKeyFromMetaData} from '../../../metaDataUtils';

export const getCurrentPursuit = (metaData) => {
  return getKeyFromMetaData(keys.CURRENTPURSUIT, metaData);
}

export const getStation = (metaData) => {
  return getKeyFromMetaData(keys.STATION, metaData);
}

export const getDestinyStepsFulfilled = (metaData) => {
  return getKeyFromMetaData(keys.DESTINYSTEPSFULFILLED, metaData)
}