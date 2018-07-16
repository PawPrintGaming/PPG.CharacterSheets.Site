import {graphql} from 'relay-runtime';

const query = graphql`
  query characterSelectQuery($id: ID!) {
    character(id: $id) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default query