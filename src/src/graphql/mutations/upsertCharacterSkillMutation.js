import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation upsertCharacterSkillMutation($id: ID!, $skill: SkillInput!) {
    upsertCharacterSkill(id: $id, skill: $skill) {
      id
      characterName
      ruleSet
      stats {key, value}
      metaData {key, value}
      skills {name, rank, metaData {key, value {key, value {key, value}}}}
      wallets {key, value}
    }
  }
`

export default mutation