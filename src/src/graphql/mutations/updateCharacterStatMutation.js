import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterStatMutation($id: ID!, $update: IntInputMap!) {
    updateCharacterStat(id: $id, update: $update) {
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