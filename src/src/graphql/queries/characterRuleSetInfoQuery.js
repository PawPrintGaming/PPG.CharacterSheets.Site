import {graphql} from 'react-relay'

const query = graphql`
  query characterRuleSetInfoQuery($ruleSet: RuleSet!) {
    characterRuleSetInfo(ruleSet: $ruleSet) {
      ruleSet
      statSets {
        key
        value
      },
      dataLists {
        key
        value
      }
    }
  }
`

export default query