import {graphql} from 'react-relay';

const mutation = graphql`
  mutation deleteCharacterMutation($id: Int!) {
    deleteCharacter(id: $id)
  }
`

export default mutation