const PhysicalKeys = ['Might', 'Grace', 'Speed', 'Resilience'];
const MentalKeys = ['Intellect', 'Charm', 'Cunning', 'Tenancity'];

export const groupStats = (stats) => {
  return {
    physical: stats.filter(stat => PhysicalKeys.includes(stat.key)),
    mental: stats.filter(stat => MentalKeys.includes(stat.key))
  }
}