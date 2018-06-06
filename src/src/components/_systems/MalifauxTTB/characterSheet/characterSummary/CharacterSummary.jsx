import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import SummaryDataPair from './SummaryDataPair';
import './CharacterSummary.css';

export class CharacterSummary extends Component {
  render() {
    const {fatedName, currentPursuit, station, playerName, guildScrip, destinyStepsFulfilled, experience} = this.props;
    return (
      <Col className={"characterSummary Malifaux"}>
        <Row>
          <Col sm="6">
            <Row>
              <SummaryDataPair name={"Fated Name"} value={fatedName} colSize={12} />
            </Row>
            <Row>
              <SummaryDataPair name={"Current Pursuit"} value={currentPursuit} colSize={6} />
              <SummaryDataPair name={"Station"} value={station} colSize={6} />
            </Row>
          </Col>
          <Col sm="6">
            <Row>
              <SummaryDataPair name={"Player Name"} value={playerName} colSize={6} />
              <SummaryDataPair name={"GuildScrip"} value={`\u00A7${guildScrip}`} colSize={6} />
            </Row>
            <Row>
              <SummaryDataPair name={"Destiny Steps Fulfilled"} value={destinyStepsFulfilled} colSize={6} />
              <SummaryDataPair name={"Exp."} value={experience} colSize={6} />
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

CharacterSummary.propTypes = {
  fatedName: PropTypes.string.isRequired,
  currentPursuit: PropTypes.string.isRequired,
  station: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  guildScrip: PropTypes.number.isRequired,
  destinyStepsFulfilled: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired
}

export default CharacterSummary