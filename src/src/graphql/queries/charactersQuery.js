import {graphql} from 'relay-runtime';

const query = graphql`
  query charactersQuery {
    characters {
      id
      characterName
      ruleSet
    }
  }
`;

export default query
