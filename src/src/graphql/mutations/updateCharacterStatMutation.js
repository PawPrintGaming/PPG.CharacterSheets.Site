import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterStatMutation($id: ID!, $update: InputMap!) {
    updateCharacterStat(id: $id, update: $update) {
      id
      characterName
      ruleSet
      experience
      stats {
        key
        value
      }
      metaData {
        key
        value
      }
    }
  }
`

export default mutation