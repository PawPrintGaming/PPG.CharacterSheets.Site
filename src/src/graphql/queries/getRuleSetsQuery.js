import {graphql} from 'relay-runtime';

const query = graphql`
  query  getRuleSetsQuery {
    ruleSets
  }
`

export default query