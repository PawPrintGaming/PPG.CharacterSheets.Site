import {graphql} from 'react-relay';

const fragment = graphql`
  fragment characterSummaryFragment on CharacterSummary {
    id
    characterName
    ruleSet
    stats {key, value}
    metaData {key, value}
    skills {name, rank, metaData {...categorisedMetaDataFragment @relay(mask: false)}}
    wallets {key, value}
    classes {name, rank, description, metaData {key, value}}
    abilities {name, description, metaData {key, value}}
  }
`

export default fragment