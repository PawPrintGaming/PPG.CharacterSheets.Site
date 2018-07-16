import {graphql} from 'relay-runtime'

const mutation = graphql`
  mutation updateCharacterPropertyMutation($id: ID!, $update: StringInputMap!)
  {
    updateCharacterProperty(id: $id, update: $update) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default mutation