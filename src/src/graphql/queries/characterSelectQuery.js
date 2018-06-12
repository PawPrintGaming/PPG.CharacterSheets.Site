import {graphql} from 'relay-runtime';

const query = graphql`
  query characterSelectQuery($id: ID!) {
    character(id: $id) {
      id,
      characterName,
      ruleSet,
      experience,
      stats {key, value},
      metaData {key, value}
    }
  }
`

export default query