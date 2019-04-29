import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            signupStatus: false,
        }
    }

    reset = () => {
        if (this.state.signupStatus) {
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                signupStatus: false,
            })
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = () => {
        axios({
            // Send POST request with registration information
            method: 'POST',
            url: 'http://localhost:5000/api/v1/users/new',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    this.setState({
                        signupStatus: true,
                    })

                    // On success, display success message
                    console.log('Registration successful!')

                    // Save auth token and user details into local storage
                    localStorage.setItem('token', response.data['auth_token']);
                    localStorage.setItem('userId', response.data.user['id']);
                    localStorage.setItem('firstName', response.data.user['first_name']);

                    // Reset form
                    this.reset()
                } else {
                    // On response but email validation failure, display error message
                    console.log('Uh oh! We already have an account with that email.')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { signupModal, toggleLoginModal, toggleSignupModal } = this.props
        return (
            <Modal isOpen={signupModal} toggle={toggleSignupModal}>
                <ModalHeader >Sign up for your Journal</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.handleSubmit} id="signup">
                        <AvField name="firstName" label="First name: " value={this.state.firstName} onChange={this.handleInput} id="firstName" type="text" validate={{
                            required: { value: true, errorMessage: 'Please enter your first name' },
                            pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                            minLength: { value: 3, errorMessage: 'Your name must be between 3 and 30 characters' },
                            maxLength: { value: 30, errorMessage: 'Your name must be between 3 and 30 characters' }
                        }} />
                        <AvField name="lastName" label="Last name: " value={this.state.lastName} onChange={this.handleInput} id="lastName" type="text" validate={{
                            required: { value: true, errorMessage: 'Please enter your last name' },
                            pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                            minLength: { value: 3, errorMessage: 'Your name must be between 3 and 30 characters' },
                            maxLength: { value: 30, errorMessage: 'Your name must be between 3 and 30 characters' }
                        }} />
                        <AvField name="email" label="Email: " value={this.state.email} onChange={this.handleInput} id="email" type="email" validate={{
                            required: { value: true, errorMessage: 'Please enter a valid email' }
                        }} />
                        <AvField name="password" label="Password: " value={this.state.password} onChange={this.handleInput} id="password" type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 20 characters' },
                            maxLength: { value: 20, errorMessage: 'Your password must be between 6 and 20 characters' }
                        }} />
                        <AvField name="confirmPassword" label="Confirm password: " value={this.state.confirmPassword} onChange={this.handleInput} id="confirmPassword" type="password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password again' },
                            match: { value: 'password', errorMessage: 'Your passwords do not match' }
                        }} />
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" form="signup" type="submit">Sign up</Button>
                    <Button color="light" onClick={toggleLoginModal}>Log in here if you already have an account</Button>
                </ModalFooter>
            </Modal>
        )
    }
}