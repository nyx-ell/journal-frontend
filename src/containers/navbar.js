import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Login from "../containers/login.js";
import Signup from "../containers/signup.js";


class myNavbar extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            loginModal: false,
            signupModal: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal,
            signupModal: false,
        });
    }

    toggleSignupModal = () => {
        this.setState({
            signupModal: !this.state.signupModal,
            loginModal: false,
        });

    }

    handleLogout = () => {
        localStorage.clear()
        return <Redirect to="/" />
    }

    render() {
        const { loginModal, signupModal } = this.state
        return (
            <div>
                <Navbar className="navbar-expand-md navbar-nav navbar-light navbar-brand" id="navbar">
                    <NavbarBrand>JOURNAL</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-auto">
                            {
                                (localStorage.getItem('token') !== '') ?
                                    <>
                                        <NavItem>
                                            <NavLink onClick={this.toggleSignupModal}>Sign up</NavLink>
                                            <Signup signupModal={signupModal} toggleLoginModal={this.toggleLoginModal} toggleSignupModal={this.toggleSignupModal} />
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={this.toggleLoginModal}>Log In</NavLink>
                                            <Login loginModal={loginModal} toggleLoginModal={this.toggleLoginModal} toggleSignupModal={this.toggleSignupModal} />
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLink href="/journals/">Home</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink onClick={this.handleLogout} href="/">Log out</NavLink>
                                        </NavItem>
                                    </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default myNavbar