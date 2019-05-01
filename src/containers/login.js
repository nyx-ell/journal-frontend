import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Redirect } from 'react-router-dom';
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginStatus: false,
        }
    }

    reset = () => {
        if (this.state.loginStatus) {
            this.setState({
                email: '',
                password: '',
                loginStatus: false,
            })
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleRedirect = () => {
        if (this.state.loginStatus) {
            console.log('redirect called')
            return <Redirect to="/journals/" push />
        }
    }

    handleSubmit = () => {
        axios({
            // Send POST request with login information
            method: 'POST',
            url: 'http://localhost:5000/api/v1/sessions/',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then((response) => {
                if (response.data.status === "success") {
                    this.setState({
                        loginStatus: true,
                    })

                    // On success, display success message
                    console.log('Log in successful!')

                    // Save auth token and user details into local storage
                    localStorage.setItem('token', response.data['auth_token']);
                    localStorage.setItem('userId', response.data.user['id']);
                    localStorage.setItem('firstName', response.data.user['first_name']);

                    // Reset form
                    this.props.toggleLoginModal()

                } else {
                    // On response but email validation failure, display error message
                    console.log('Uh oh! Your email and password does not match.')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { loginModal, toggleLoginModal, toggleSignupModal } = this.props
        return (
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader>Log in to your Journal</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.handleSubmit} id="login">
                        <AvField name="email" label="Email: " value={this.state.email} onChange={this.handleInput} id="email" type="email" validate={{
                            required: { value: true, errorMessage: 'Please enter a valid email' }
                        }} />
                        <AvField name="password" label="Password: " value={this.state.password} onChange={this.handleInput} id="password" type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 20 characters' },
                            maxLength: { value: 20, errorMessage: 'Your password must be between 6 and 20 characters' }
                        }} />
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggleSignupModal}>Sign up here if you don't have an account</Button>
                    <Button outline color="secondary" form="login" type="submit" onClick={this.handleRedirect.bind(this)}>Log in</Button>
                </ModalFooter>
            </Modal>

        )
    }
}

export default Login