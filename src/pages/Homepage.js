import React from 'react';
import wallpaper from '../images/bg-1.jpg';
import { Container, Col, Row } from 'reactstrap';

export default class Homepage extends React.Component {
    render() {
        return (
            <Container className="m-0 p-0" id="home-container">
                <Col className="p-0">
                    <img src={wallpaper} alt="" id="home-bg" className="position-relative w-100 h-100" />
                    <p id="home-text" className="position-absolute">THE HOME WITHIN</p>
                </Col>
            </Container>
        )
    }
}