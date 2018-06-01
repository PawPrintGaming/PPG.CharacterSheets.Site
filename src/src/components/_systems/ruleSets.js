export const displayValue = (key) => {
  for(const ruleSetProp in RuleSets) {
    const ruleSet = RuleSets[ruleSetProp];
    if(ruleSet.key === key) {
      return ruleSet.displayValue;
    }
  }
}

export const ruleSetNotSupported = (ruleSet) => {
  return `The Rule Set ${ruleSet} is not currently supported`;
}

export const RuleSets = {
  malifaux: {key: "MALIFAUX_TTB", displayValue: "Malifaux: Through the Breach"},
  dnd: {key: "DUNGEONSAND_DRAGONS", displayValue: "Dungeons & Dragons"}
}

export default RuleSets