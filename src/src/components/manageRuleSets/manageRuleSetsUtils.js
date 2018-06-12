export const filterForRuleSetsToCreate = (ruleSets, ruleSetInfos) => {
  if(ruleSets === undefined || ruleSets === [] || ruleSetInfos === undefined || ruleSetInfos === []) {
    return [];
  }
  const existingConfiguredRuleSets = ruleSetInfos.map(ruleSetInfo => ruleSetInfo.ruleSet);
  const configurableRuleSets = ruleSets.filter(ruleSet => !existingConfiguredRuleSets.includes(ruleSet));
  return configurableRuleSets;
}