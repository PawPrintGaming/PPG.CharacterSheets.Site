import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'reactstrap';
import SummaryDataPair from './SummaryDataPair';
export class CharacterSummary extends Component {
  render() {
    const {
      characterName,
      characterClass, characterLevel, characterBackground, playerName,
      characterRace, characterAlignment, experience
    } = this.props;
    return (
      <Row className={"characterSummary DnD"}>
        <SummaryDataPair name={"Character Name"} value={characterName} colSize={5} />
        <Col>
          <Row>
            <SummaryDataPair name={"Class"} value={characterClass} colSize={2} /> {/* TODO Support for multiclassing */}
            <SummaryDataPair name={"Level"} value={characterLevel} colSize={1} />
            <SummaryDataPair name={"Background"} value={characterBackground} colSize={4} />
            <SummaryDataPair name={"PlayerName"} value={playerName} colSize={3} />
          </Row>
          <Row>
            <SummaryDataPair name={"Race"} value={characterRace} colSize={3} />
            <SummaryDataPair name={"Alignment"} value={characterAlignment} colSize={4} />
            <SummaryDataPair name={"Experience"} value={experience} colSize={3} />
          </Row>
        </Col>
      </Row>
    )
  }
}

CharacterSummary.propTypes = {
  characterName: PropTypes.string.isRequired,
  characterClass: PropTypes.string.isRequired,
  characterLevel: PropTypes.string.isRequired,
  characterBackground: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  characterRace: PropTypes.string.isRequired,
  characterAlignment: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired
}

export default CharacterSummary