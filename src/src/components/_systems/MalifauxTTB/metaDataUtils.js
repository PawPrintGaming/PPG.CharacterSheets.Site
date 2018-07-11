import * as keys from './metaDataKeys';
import {getKeyFromMetaData} from '../../../metaDataUtils';

export const getDestinyStepsFulfilled = (metaData) => {
  return parseInt(getKeyFromMetaData(keys.DESTINYSTEPSFULFILLED, metaData, 0), 10);
}