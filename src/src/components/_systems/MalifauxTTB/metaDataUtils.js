import {getKeyFromMetaData} from '../../../metaDataUtils';
import * as keys from './metaDataKeys';

export const getCurrentPursuit = (metaData) => {
  return getKeyFromMetaData(keys.CURRENTPURSUIT, metaData);
}

export const getStation = (metaData) => {
  return getKeyFromMetaData(keys.STATION, metaData);
}

export const getDestinyStepsFulfilled = (metaData) => {
  return getKeyFromMetaData(keys.DESTINYSTEPSFULFILLED, metaData)
}