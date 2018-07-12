import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import * as keys from '../../metaDataKeys';
import {getKeyFromMetaData} from '../../../../../metaDataUtils';
import InlineTextEditor from '../../../../inlineEditors/textEditors/InlineTextEditor';
import {updateCharacterWallet} from '../../../../characterSheet/updateCharacterSheetInvocations'

export class CharacterWallet extends Component {
renderWallets = (wallets, onUpdateWallet) => {
  let currencies = [];
  for(let key in keys.wallet)
  {
    currencies.push(
      <Row key={keys.wallet[key]} className={"wallet mx-0"}>
        <Col xs={3} className={"value"}>
          <InlineTextEditor text={getKeyFromMetaData(keys.wallet[key], wallets, 0)} change={({text}) => onUpdateWallet(keys.wallet[key], text)} param={key} inputType={"number"} />
        </Col>
        <Col xs={9} className={"title"}>{keys.wallet[key]}</Col>
      </Row>
    )
  }
  return currencies;
}

  render() {
    const {character, onUpdateWallet} = this.props;
    const {wallets} = character;
    return (
      <Row>
        <Col className={"characterWallets"}>
          {this.renderWallets(wallets, onUpdateWallet)}
        </Col>
      </Row>
    )
  }
}

CharacterWallet.propTypes = {
  character: PropTypes.object.isRequired,
  onUpdateWallet: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const {character} = props;
  return {
    onUpdateWallet: (key, value) => updateCharacterWallet(character.id, key, value)
  }
}

export default connect(mapStateToProps)(CharacterWallet)