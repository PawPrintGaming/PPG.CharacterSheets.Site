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