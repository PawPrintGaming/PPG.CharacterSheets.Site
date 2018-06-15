import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterMetaDataMutation($id: ID!, $update: InputMap!) {
    updateCharacterMetaData(id: $id, update: $update) {
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