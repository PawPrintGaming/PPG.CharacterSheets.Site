export const getKeyFromMetaData = (key, metaData, defaultValue = '-') => {
  return metaData.find(d => d.key === key).value || defaultValue;
}