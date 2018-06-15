import {graphql} from 'relay-runtime'

const mutation = graphql`
  mutation updateCharacterPropertyMutation($id: ID!, $update: InputMap!)
  {
    updateCharacterProperty(id: $id, update: $update) {
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