import React from 'react';
import { Button, Row, Col, Label, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        axios({
            // Send POST request with registration information
            method: 'POST',
            url: 'http://localhost:5000/api/v1/users/register',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
            }
        })
            .then(response => {
                if (response.data.status === "success") {
                    // On success, display success message
                    console.log('Registration successful!')

                    // Save auth token and user details into local storage
                    localStorage.setItem('token', response.data['auth_token']);
                    localStorage.setItem('userId', response.data.user['id']);
                    localStorage.setItem('firstName', response.data.user['first_name']);
                } else {
                    // On response but email validation failure, display error toast
                    console.log('Uh oh! We already have an account with that email.')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <>
                <h1>Register</h1>
                <AvForm onValidSubmit={this.handleSubmit} id="register">
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
                    <AvField name="email" label="Email: " type="email" required />

                    <AvField name="password" label="Password: " type="text" minLength={10} />
                    <AvField name="confirmPassword" label="Confirm password: " type="text" validate={{ minLength: { value: 10 } }} />

                    <Button color="primary" form="register" type="submit">Register</Button>
                </AvForm>
            </>
        )
    }
}