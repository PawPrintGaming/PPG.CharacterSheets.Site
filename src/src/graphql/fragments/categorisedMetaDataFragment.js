import {graphql} from 'react-relay'

import {graphql} from 'react-relay';

const fragment = graphql`
  fragment categorisedMetaDataFragment on CategorisedMetaDataMap @relay(plural: true) {
    key
    value {
      key
      value {
        key
        value
      }
    }
  }
`

export default fragment