import React from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import shoppingLogo from './../../img/shoppingLogo.svg';

import './../../assets/css/NavBar.css';

const NavBootStrap = () => {
    return (
        <div>
            <Navbar className="fixed-top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <NavLink className="brand " to="/">
                            <input type="image" alt="logo" src={shoppingLogo} height="25px" />
                            <span>Mi TiendAPP</span>
                        </NavLink>
                    </Navbar.Brand>
                    <NavDropdown title="Categorías" className="me-auto">
                        <div className="d-flex flex-column px-1">
                            <NavLink className="nav_link" to="/category/1">Accesorios</NavLink>
                            <NavLink className="nav_link" to="/category/2">Calzado</NavLink>
                            <NavLink className="nav_link" to="/category/3">Vestir</NavLink>
                        </div>
                    </NavDropdown>
                </Container >
            </Navbar >
        </div >
    );
};

export default NavBootStrap;
