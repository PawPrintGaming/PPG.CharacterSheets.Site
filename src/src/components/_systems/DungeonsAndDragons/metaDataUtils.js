import * as keys from './metaDataKeys';
import {getKeyFromMetaData} from '../../../metaDataUtils';

export const getClass = (metaData) => {
  return getKeyFromMetaData(keys.CLASS, metaData);
}

export const getLevel = (metaData) => {
  return getKeyFromMetaData(keys.LEVEL, metaData);
}

export const getBackground = (metaData) => {
  return getKeyFromMetaData(keys.BACKGROUND, metaData);
}

export const getRace = (metaData) => {
  return getKeyFromMetaData(keys.RACE, metaData);
}

export const getAligment = (metaData) => {
  return getKeyFromMetaData(keys.ALIGNMENT, metaData);
}