import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation updateCharacterMetaDataMutation($id: ID!, $update: StringInputMap!) {
    updateCharacterMetaData(id: $id, update: $update) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default mutation