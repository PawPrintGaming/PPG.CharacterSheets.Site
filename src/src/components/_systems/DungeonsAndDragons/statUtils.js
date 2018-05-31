export const calculateModifierForStat = (statValue) => {
    const modifier = Math.floor(statValue/2)-5;
  return `${modifier>0?'+':''}${modifier}`;
}