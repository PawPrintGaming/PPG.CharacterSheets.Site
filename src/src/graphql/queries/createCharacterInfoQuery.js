import {graphql} from 'react-relay'

const query = graphql`
  query createCharacterInfoQuery($ruleSet: RuleSet!) {
    createCharacterInfo(ruleSet: $ruleSet) {
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