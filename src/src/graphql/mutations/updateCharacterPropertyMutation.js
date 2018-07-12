import {graphql} from 'relay-runtime'

const mutation = graphql`
  mutation updateCharacterPropertyMutation($id: ID!, $update: StringInputMap!)
  {
    updateCharacterProperty(id: $id, update: $update) {
      id
      characterName
      ruleSet
      experience
      stats {key, value}
      metaData {key, value}
      skills {name, rank, metaData {key, value {key, value {key, value}}}}
      wallets {key, value}
    }
  }
`

export default mutation