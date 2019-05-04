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
            file: null,
            url: null,
        };
        this.handleInput = this.handleInput.bind(this)
        this.handleFile = this.handleFile.bind(this)
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleFile = (event) => {
        this.setState({
            file: event.target.files[0],
            url: URL.createObjectURL(event.target.files[0]),
        })
    }

    handleSubmit = (event) => {
        const { title, content, file } = this.state
        const fd = new FormData()
        fd.set('user_id', localStorage.getItem('userId'))
        fd.set('title', title)
        fd.set('content', content)
        fd.append('file', file, file.name)

        const token = localStorage.getItem('token')
        axios.post('http://localhost:5000/api/v1/journals/new', fd, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                console.log(response)
                if (response.data.status === "success") {
                    if (response.data.redirect) {
                        window.location.href = response.data.redirect;
                    }
                    // On success, display success message
                    console.log('Journal created!')
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
        const { title, content, file } = this.state
        return (
            <>
                <AvForm onValidSubmit={this.handleSubmit} id="journal" encType="multipart/form-data">
                    <AvField placeholder="Title" name="title" value={title} onChange={this.handleInput} id="title" type="text" validate={{
                        required: { value: true, errorMessage: 'Please give your journal a title' },
                        maxLength: { value: 255, errorMessage: 'Your title cannot exceed 255 characters' }
                    }} />
                    <textarea placeholder="Write away..." name="content" value={content} onChange={this.handleInput} id="content" type="text" className="form-control"></textarea><br />
                    <div className="input-group col-sm-6">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="file" onChange={this.handleFile} />
                            <label className="custom-file-label" for="file">{(file) ? file.name : "Choose an image"}</label>
                        </div>
                    </div>
                    <br />
                    <img src={this.state.url} alt="" className="img-thumbnail" />
                    <br /><br />
                    <Button light color="secondary" form="journal" type="submit" className="float-right">Create new journal entry</Button>
                </AvForm>
            </>
        );
    }
}

export default NewJournal