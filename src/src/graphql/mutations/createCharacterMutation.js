import {graphql} from 'react-relay';

const mutation = graphql`
  mutation createCharacterMutation($character: CreateCharacter!) {
    createCharacter(createCharacter: $character) {
      id
    }
  }
`

export default mutation