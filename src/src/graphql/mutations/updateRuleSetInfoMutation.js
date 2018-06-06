import {graphql} from 'react-relay';

const mutation = graphql`
  mutation updateRuleSetInfoMutation($ruleSetInfo: UpdateRuleSetInfo!) {
    updateRuleSetInfo(updateRuleSetInfo: $ruleSetInfo) {
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