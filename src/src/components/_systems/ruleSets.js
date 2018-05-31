export const displayValue = (key) => {
  for(const ruleSetProp in RuleSets) {
    const ruleSet = RuleSets[ruleSetProp];
    if(ruleSet.key === key) {
      return ruleSet.value;
    }
  }
}

export const RuleSets = {
  malifaux: {key: "MALIFAUX_TTB", value: "Malifaux: Through the Breach"},
  dnd: {key: "DUNGEONSAND_DRAGONS", value: "Dungeons & Dragons"}
}

export default RuleSets