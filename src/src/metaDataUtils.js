export const getKeyFromMetaData = (key, metaData, defaultValue = '-') => {
  return metaData.some(d => d.key === key)
      ? metaData.find(d => d.key === key).value || defaultValue
      : defaultValue;
}