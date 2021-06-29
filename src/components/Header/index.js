import React from 'react'
import {Container, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(){
    return (
        <Container fluid className="d-flex justify-content-center bg-dark py-3">
            <Link to="/">
                <Image src="https://bemoldigital.com.br/images/logos/bemol-digital-inline-colorful.svg" width={175}/>
            </Link>
        </Container>
    )
}

export default Header;