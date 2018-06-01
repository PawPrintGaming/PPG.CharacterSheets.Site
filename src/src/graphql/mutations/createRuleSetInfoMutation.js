import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation createRuleSetInfoMutation($info: CreateRuleSetInfo!) {
    createRuleSetInfo(createRuleSetInfo: $info) {
      ...ruleSetInfo
    }
  }
`

export default mutation