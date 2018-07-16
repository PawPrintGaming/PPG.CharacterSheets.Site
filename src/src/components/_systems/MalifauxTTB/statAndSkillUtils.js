import * as keys from './metaDataKeys';

export const groupStats = (stats, statSets) => {
  const physicalKeys = statSets.some(set => set.key === 'Physical')
      ? statSets.find(set => set.key === 'Physical').value
      : [];
  const mentalKeys = statSets.some(set => set.key === 'Mental')
      ? statSets.find(set => set.key === 'Mental').value
      : [];
  return {
    physical: stats.filter(stat => physicalKeys.includes(stat.key)),
    mental: stats.filter(stat => mentalKeys.includes(stat.key))
  }
}

export const potentialSkillRank = (skills, skillKey) => {
  return skills.some(skill => skill.name === skillKey)
      ? skills.find(skill => skill.name === skillKey).rank
      : null;
}

export const calculateDefense = (stats, skills) => {
  let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
  let evadeRank = potentialSkillRank(skills, keys.skillNames.EVADE);
  let evade = evadeRank + speed;
  let dominant = Math.max(speed, evade);
  return dominant + 2;
}

export const calculateWillpower = (stats, skills) => {
  let tenacity = stats.find(stat => stat.key === keys.statNames.TENACITY).value;
  let centeringRank = potentialSkillRank(skills, keys.skillNames.CENTERING);
  let centering = centeringRank + tenacity;
  let dominant = Math.max(tenacity, centering);
  return dominant + 2;
}

export const calculateWalk = (stats) => {
  let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
  return Math.ceil(speed/2) + 4;
}

export const calculateCharge = (stats) => {
  let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
  let charge = speed + 4;
  let walk = calculateWalk(stats);
  return charge >= walk
    ? charge
    : walk;
}

export const caluclateMaxWounds = (stats, skills) => {
  let resilience = stats.find(stat => stat.key === keys.statNames.RESILIENECE).value;
  let toughnessRank = potentialSkillRank(skills, keys.skillNames.TOUGHNESS);
  let toughness = toughnessRank + resilience;
  let dominant = Math.max (resilience, toughness)
  if (resilience > 0)
  {
    dominant = dominant + Math.ceil(resilience/2);
  }
  return dominant + 4;
}

export const calculateInitiative = (stats, skills) => {
  let speed = stats.find(stat => stat.key === keys.statNames.SPEED).value;
  let cunning = stats.find(stat => stat.key === keys.statNames.CUNNING).value;
  let noticeRank = potentialSkillRank(skills, keys.skillNames.NOTICE);
  let notice = noticeRank + cunning;
  return notice + speed;
}