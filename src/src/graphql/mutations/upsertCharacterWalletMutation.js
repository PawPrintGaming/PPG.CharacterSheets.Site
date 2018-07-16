import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation upsertCharacterWalletMutation($id: ID!, $update: StringInputMap!) {
    upsertCharacterWallet(id: $id, update: $update) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default mutation