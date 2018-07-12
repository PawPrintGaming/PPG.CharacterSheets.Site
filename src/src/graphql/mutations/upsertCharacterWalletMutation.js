import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation upsertCharacterWalletMutation($id: ID!, $update: StringInputMap!) {
    upsertCharacterWallet(id: $id, update: $update) {
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