import * as keys from '../metaDataKeys';

export const toggleProficiencyTransform = (skill, skillName = '') => {
  if(!skill) {
    return {
      name: skillName,
      metaData: [
        {
          key: keys.metaData.PROPERTIES,
          value: [
            {
              key: keys.metaData.PROFICIENCY,
              value: [
                {
                  key: keys.metaData.ISPROFICIENT,
                  value: 'true'
                }
              ]
            }
          ]
        }
      ]
    }
  }
  const propertiesIndex = skill.metaData.findIndex(data => data.key === keys.metaData.PROPERTIES);
  const proficienyIndex = skill.metaData.find(data => data.key === keys.metaData.PROPERTIES).value.findIndex(proficiency => proficiency.key === keys.metaData.PROFICIENCY);
  const isProficientIndex = skill.metaData.find(data => data.key === keys.metaData.PROPERTIES).value.find(proficiency => proficiency.key === keys.metaData.PROFICIENCY).value.findIndex(isProficient => isProficient.key === keys.metaData.ISPROFICIENT);
  return {
    ...skill,
    metaData: [
      ...skill.metaData.slice(0, propertiesIndex),
      {
        ...skill.metaData[propertiesIndex],
        value: [
          ...skill.metaData[propertiesIndex].value.slice(0, proficienyIndex),
          {
            ...skill.metaData[propertiesIndex].value[proficienyIndex],
            value: [
              ...skill.metaData[propertiesIndex].value[proficienyIndex].value.slice(0, isProficientIndex),
              {
                ...skill.metaData[propertiesIndex].value[proficienyIndex].value[isProficientIndex],
                value: `${!(skill.metaData[propertiesIndex].value[proficienyIndex].value[isProficientIndex].value === 'true')}`
              },
              ...skill.metaData[propertiesIndex].value[proficienyIndex].value.slice(isProficientIndex+1)
            ]
          },
          ...skill.metaData[propertiesIndex].value.slice(proficienyIndex+1),
        ]

      },
      ...skill.metaData.slice(propertiesIndex+1)
    ]
  };
}