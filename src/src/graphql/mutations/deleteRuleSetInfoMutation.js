import {graphql} from 'react-relay';

const mutation = graphql`
  mutation deleteRuleSetInfoMutation($id: ID!) {
    deleteRuleSetInfo(id: $id)
  }
`

export default mutation