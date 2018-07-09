export const updateTriggerDescriptionTransform = (skill, triggerKey, newDescription) => {
  const triggersIndex = skill.metaData.findIndex(data => data.key === 'triggers');
  const triggerIndex = skill.metaData.find(data => data.key === 'triggers').value.findIndex(trigger => trigger.key === triggerKey);
  const descriptionIndex = skill.metaData.find(data => data.key === 'triggers').value.find(trigger => trigger.key === triggerKey).value.findIndex(prop => prop.key === 'description');
  return {
    ...skill,
    metaData: [
      ...skill.metaData.slice(0, triggersIndex),
      {
        ...skill.metaData[triggersIndex],
        value: [
          ...skill.metaData[triggersIndex].value.slice(0, triggerIndex),
          {
            ...skill.metaData[triggersIndex].value[triggerIndex],
            value: [
              ...skill.metaData[triggersIndex].value[triggerIndex].value.slice(0, descriptionIndex),
              {
                ...skill.metaData[triggersIndex].value[triggerIndex].value[descriptionIndex],
                value: newDescription
              },
              ...skill.metaData[triggersIndex].value[triggerIndex].value.slice(descriptionIndex+1)
            ]
          },
          ...skill.metaData[triggersIndex].value.slice(triggerIndex+1)
        ]
      },
      ...skill.metaData.slice(triggersIndex+1)
    ]
  };
}

export const deleteTriggerTransform = (skill, triggerKey) => {
  const triggersIndex = skill.metaData.findIndex(data => data.key === 'triggers');
  const triggerIndex = skill.metaData.find(data => data.key === 'triggers').value.findIndex(trigger => trigger.key === triggerKey);
  return {
    ...skill,
    metaData: [
      ...skill.metaData.slice(0, triggersIndex),
      {
        ...skill.metaData[triggersIndex],
        value: [
          ...skill.metaData[triggersIndex].value.slice(0, triggerIndex),
          ...skill.metaData[triggersIndex].value.slice(triggerIndex+1)
        ]
      },
      ...skill.metaData.slice(triggersIndex+1)
    ]
  };
}

export const addTriggerTransform = (skill, formValues) => {
  const triggersIndex = skill.metaData.findIndex(data => data.key === 'triggers');
  return {
    ...skill,
    metaData: [
      ...skill.metaData.slice(0, triggersIndex),
      {
        ...skill.metaData[triggersIndex],
        value: [
          ...skill.metaData[triggersIndex].value,
          {key: formValues.name, value: [{key: "suit", value: formValues.suit}, {key: "description", value: formValues.description}]}
        ]
      },
      ...skill.metaData.slice(triggersIndex+1)
    ]
  }
}

export const updateSkillRankTransform = (skill, rank) => {
  return {
    ...skill,
    rank: rank
  }
}