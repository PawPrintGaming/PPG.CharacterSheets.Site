import React, {Component} from 'react';
import './Header.css';
import {withRouter} from 'react-router';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Col} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import newCharacterIcon from '@fortawesome/fontawesome-free-solid/faPlusSquare';
import manageRuleSetsIcon from '@fortawesome/fontawesome-free-solid/faListUl';
import characterSelectIcon from '@fortawesome/fontawesome-free-solid/faUserFriends';
export class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <header>
        <Col>
        <Navbar color={"dark"} dark expand={"sm"}>
          <NavbarBrand />
          <NavbarToggler onClick={this.toggle} className={"mr-2"}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/"><FontAwesomeIcon icon={characterSelectIcon} />{' '}Characters</NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/create/character"><FontAwesomeIcon icon={newCharacterIcon} />{' '}Create New Character</NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink href="/rulesets"><FontAwesomeIcon icon={manageRuleSetsIcon} />{' '}Manage RuleSets</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </Col>
      </header>
    );
  }
}

export default withRouter(Header);