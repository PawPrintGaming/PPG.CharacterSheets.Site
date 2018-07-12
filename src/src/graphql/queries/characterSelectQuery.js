import {graphql} from 'relay-runtime';

const query = graphql`
  query characterSelectQuery($id: ID!) {
    character(id: $id) {
      id
      characterName
      ruleSet
      stats {key, value}
      metaData {key, value}
      skills {name, rank, metaData {key, value {key, value {key, value}}}}
      wallets {key, value}
    }
  }
`

export default query