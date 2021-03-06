export const displayValue = (ruleSetInfos, ruleSet) => {
  return ruleSetInfos.find(ruleSetInfo => ruleSetInfo.ruleSet === ruleSet).name;
}

export const ruleSetNotSupported = (ruleSet, action) => {
  return `The Rule Set ${ruleSet} is not currently supported for ${action}`;
}