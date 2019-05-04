import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
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
            url: 'https://journal-nyx.herokuapp.com/api/v1/users/new',
            'headers': {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
        }).then(response => {
            if (response.data.status === "success") {
                // Redirect to user's journals page
                if (response.data.redirect) {
                    window.location.href = response.data.redirect;
                }

                // On success, display success message
                console.log('Registration was successful')

                // Save auth token and user details into local storage
                localStorage.setItem('token', response.data['auth_token']);
                localStorage.setItem('userId', response.data.user['id']);
                localStorage.setItem('firstName', response.data.user['first_name']);
            } else {
                console.log('An account has already been registered with that email')
            }
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { signupModal, toggleLoginModal, toggleSignupModal } = this.props
        const { firstName, lastName, email, password, confirmPassword } = this.state
        return (
            <Modal isOpen={signupModal} toggle={toggleSignupModal}>
                <ModalHeader >Sign up for your Journal</ModalHeader>
                <ModalBody>
                    <AvForm onValidSubmit={this.handleSubmit} id="signup">
                        <AvField name="firstName" label="First name: " value={firstName} onChange={this.handleInput} id="firstName" type="text" autoComplete="first-name" validate={{
                            required: { value: true, errorMessage: 'Please enter your first name' },
                            pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                            minLength: { value: 3, errorMessage: 'Your name must be between 3 and 30 characters' },
                            maxLength: { value: 30, errorMessage: 'Your name must be between 3 and 30 characters' }
                        }} />
                        <AvField name="lastName" label="Last name: " value={lastName} onChange={this.handleInput} id="lastName" type="text" autoComplete="last-name" validate={{
                            required: { value: true, errorMessage: 'Please enter your last name' },
                            pattern: { value: '^[A-Za-z]+$', errorMessage: 'Your name must be composed only with letters' },
                            minLength: { value: 3, errorMessage: 'Your name must be between 3 and 30 characters' },
                            maxLength: { value: 30, errorMessage: 'Your name must be between 3 and 30 characters' }
                        }} />
                        <AvField name="email" label="Email: " value={email} onChange={this.handleInput} id="email" type="email" autoComplete="new-emil" validate={{
                            required: { value: true, errorMessage: 'Please enter a valid email' }
                        }} />
                        <AvField name="password" label="Password: " value={password} onChange={this.handleInput} id="password" type="password" autoComplete="new-password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password' },
                            minLength: { value: 6, errorMessage: 'Your password must be between 6 and 20 characters' },
                            maxLength: { value: 20, errorMessage: 'Your password must be between 6 and 20 characters' }
                        }} />
                        <AvField name="confirmPassword" label="Confirm password: " value={confirmPassword} onChange={this.handleInput} id="confirmPassword" type="password" autoComplete="confirm-password" validate={{
                            required: { value: true, errorMessage: 'Please enter your password again' },
                            match: { value: 'password', errorMessage: 'Your passwords do not match' }
                        }} />
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggleLoginModal}>Log in here if you already have an account</Button>
                    <Button outline color="secondary" form="signup" type="submit">Sign up</Button>
                </ModalFooter>
            </Modal>
        )
    }
}