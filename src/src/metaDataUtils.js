export const getKeyFromMetaData = (key, metaData, defaultValue = '-') => {
  return metaData.some(d => d.key === key)
      ? metaData.find(d => d.key === key).value || defaultValue
      : defaultValue;
}

export const despace = (value, search = ' ', replace = '') => {
  return value.replace(new RegExp('[' + search +']', 'g'), replace);
}