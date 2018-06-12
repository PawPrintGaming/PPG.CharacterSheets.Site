import {graphql} from 'react-relay';

const mutation = graphql`
  mutation createRuleSetInfoMutation($ruleSetInfo: CreateRuleSetInfo!) {
    createRuleSetInfo(createRuleSetInfo: $ruleSetInfo) {
      id
      name
      ruleSet
      imageUrl
      description
      createCharacterPath
      viewCharacterPath
    }
  }
`

export default mutation