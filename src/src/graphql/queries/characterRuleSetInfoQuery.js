import {graphql} from 'react-relay'

const query = graphql`
  query characterRuleSetInfoQuery($ruleSet: RuleSet!) {
    characterRuleSetInfo(ruleSet: $ruleSet) {
      ruleSet
      statSets {
        key
        value
      }
      skillInfoSets {
        key
        value {
          name
          statKeys
        }
      }
      dataLists {
        key
        value
      }
    }
  }
`

export default query