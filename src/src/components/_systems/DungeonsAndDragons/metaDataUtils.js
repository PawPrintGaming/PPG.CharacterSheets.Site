import {getKeyFromMetaData} from '../../../metaDataUtils';

export const getClass = (metaData) => {
  return getKeyFromMetaData('Class', metaData);
}

export const getLevel = (metaData) => {
  return getKeyFromMetaData('Level', metaData);
}

export const getBackground = (metaData) => {
  return getKeyFromMetaData('Background', metaData);
}

export const getRace = (metaData) => {
  return getKeyFromMetaData('Race', metaData);
}

export const getAligment = (metaData) => {
  return getKeyFromMetaData('Alignment', metaData);
}