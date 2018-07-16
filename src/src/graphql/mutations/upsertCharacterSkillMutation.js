import {graphql} from 'relay-runtime';

const mutation = graphql`
  mutation upsertCharacterSkillMutation($id: ID!, $skill: SkillInput!) {
    upsertCharacterSkill(id: $id, skill: $skill) {
      ...characterSummaryFragment @relay(mask: false)
    }
  }
`

export default mutation