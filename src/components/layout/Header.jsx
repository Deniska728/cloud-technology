import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';

const Header = () => {
    return (
        <Nav>
            <NavItem>
                <NavLink className="nav-link" activeClassName="active" to="/users">
                    Users
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className="nav-link" activeClassName="active" to="/bugs">
                    Bugs
                </NavLink>
            </NavItem>
        </Nav>
    );
};

export default Header;
