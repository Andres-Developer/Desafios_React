import React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import shoppingLogo from './../../img/shoppingLogo.svg';

const NavBootStrap = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand><NavLink className="brand " to="/">
                        <input type="image" alt="logo" src={shoppingLogo} height="25px" />
                        <span>Mi TiendAPP</span>
                    </NavLink></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Categorías" id="collasible-nav-dropdown">
                                <NavDropdown.Item > <NavLink className="nav_link" to="/category/1">Accesorios</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink className="nav_link" to="/category/2">Zapatos</NavLink></NavDropdown.Item>
                                <NavDropdown.Item ><NavLink className="nav_link" to="/category/3">Ropa</NavLink></NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBootStrap;
