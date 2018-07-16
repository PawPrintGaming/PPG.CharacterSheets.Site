import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterStatMutation($id: ID!, $update: IntInputMap!) {
    updateCharacterStat(id: $id, update: $update) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default mutation