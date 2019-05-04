import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = () => {
        axios({
            method: 'POST',
            url: 'https://journal-nyx.herokuapp.com/api/v1/sessions/',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then((response) => {
            if (response.data.status === "success") {
                // Redirect to user's journals page
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                }

                // On success, display success message
                console.log('Log in successful!')

                // Save auth token and user details into local storage
                localStorage.setItem('token', response.data['auth_token']);
                localStorage.setItem('userId', response.data.user['id']);
                localStorage.setItem('firstName', response.data.user['first_name']);
            } else {
                console.log('Uh oh! Your email and password does not match.')
            }
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const { loginModal, toggleLoginModal, toggleSignupModal } = this.props
        const { email, password } = this.state
        return (
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader>Log in to your Journal</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.handleSubmit} id="login">
                        <AvField name="email" label="Email: " value={email} onChange={this.handleInput} id="email" type="email" autoComplete="email" validate={{
                            required: { value: true, errorMessage: 'Please enter a valid email' }
                        }} />
                        <AvField name="password" label="Password: " value={password} onChange={this.handleInput} id="password" type="password" autoComplete="password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password' }
                        }} />
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggleSignupModal}>Sign up here if you don't have an account</Button>
                    <Button outline color="secondary" form="login" type="submit">Log in</Button>
                </ModalFooter>
            </Modal>

        )
    }
}

export default Login