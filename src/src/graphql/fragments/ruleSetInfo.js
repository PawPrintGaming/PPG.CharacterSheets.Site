import {graphql} from 'relay-runtime';

const fragment = graphql`
  fragment ruleSetInfo on RuleSetInfo {
    id,
    name,
    ruleSet,
    coverImageUrl
  }
`

export default fragment