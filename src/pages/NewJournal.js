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
        const { title, content } = this.state
        return (
            <>
                <AvForm onValidSubmit={this.handleSubmit} id="journal">
                    <AvField placeholder="Title" name="title" value={title} onChange={this.handleInput} id="title" type="text" validate={{
                        required: { value: true, errorMessage: 'Please give your journal a title' },
                        maxLength: { value: 255, errorMessage: 'Your title cannot exceed 255 characters' }
                    }} />

                    <textarea placeholder="Write away..." name="content" value={content} onChange={this.handleInput} id="content" type="text" className="form-control"></textarea><br />

                    <form id="upload-form" encType="multipart/form-data" >
                        <div class="input-group col-sm-6">
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" id="user_file"
                                    aria-describedby="inputGroupFileAddon01" onChange={this.handleUpload} />
                                <label class="custom-file-label" for="user_file">Choose an image</label>
                            </div>
                            <Button outline color="secondary" type="submit" onClick={this.submitUpload} id="upload-button">Upload</Button><br />
                        </div>
                    </form>
                    <br /><br />
                    <Button light color="secondary" form="journal" type="submit" className="float-right">Create new journal entry</Button>
                </AvForm>
            </>
        );
    }
}

export default NewJournal