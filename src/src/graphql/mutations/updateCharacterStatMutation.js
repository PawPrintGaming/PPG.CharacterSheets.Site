import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterStatMutation($id: ID!, $update: IntInputMap!) {
    updateCharacterStat(id: $id, update: $update) {
      id
      characterName
      ruleSet
      experience
      stats {key, value}
      metaData {key, value}
      skills {name, rank, metaData {key, value {key, value {key, value}}}}
    }
  }
`

export default mutation