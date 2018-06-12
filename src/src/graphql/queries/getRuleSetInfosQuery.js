import {graphql} from 'relay-runtime';

const query = graphql`
  query  getRuleSetInfosQuery {
    ruleSetInfos {
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

export default query