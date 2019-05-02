import React from 'react';
import axios from 'axios';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';

class NewJournal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            user_file: null,
            submitStatus: false,
        };
    }

    reset = () => {
        if (this.state.submitStatus) {
            this.setState({
                title: '',
                content: '',
                user_file: null,
                submitStatus: false,
            })
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleUpload = (event) => {
        this.setState({
            user_file: event.target.files[0]
        });
    }

    submitUpload = (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('user_file', this.state.user_file[0]);
        console.log('user file is', this.state.user_file);
    }

    handleSubmit = () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/journals/new',
            data: {
                user_id: localStorage.getItem('userId'),
                title: this.state.title,
                content: this.state.content,
                user_file: this.state.user_file
            }
        })
            .then((response) => {
                if (response.data.status === "success") {
                    this.setState({
                        submitStatus: true,
                    })

                    // On success, display success message
                    console.log('Log in successful!')

                    // Reset form
                    this.reset()
                } else {
                    // On response but email validation failure, display error message
                    console.log('Uh oh! Your journal entry could not be created')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <>
                <AvForm onValidSubmit={this.handleSubmit} id="journal">
                    <AvField name="title" label="Title: " value={this.state.title} onChange={this.handleInput} id="title" type="text" validate={{
                        required: { value: true, errorMessage: 'Please enter a title' },
                        maxLength: { value: 255, errorMessage: 'Your title cannot exceed 255 characters' }
                    }} />

                    <textarea rows="4" cols="50" maxlength="50" placeholder="Enter text here" value={this.state.content} onChange={this.handleInput} id="content"></textarea><br />
                    <form enctype="multipart/form-data" >
                        <label for="user_file">Upload or change profile picture</label> <br />
                        <input type="file" id="user_file" onChange={this.handleUpload} />
                        <button type="submit" onClick={this.submitUpload}>Upload</button><br />
                    </form>

                    <Button color="primary" form="journal" type="submit">Submit</Button>
                </AvForm>
            </>
        );
    }
}

export default NewJournal