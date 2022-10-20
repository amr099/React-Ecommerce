import React from "react";
import Cart from "./Cart";
import User from "./User";
import { Navbar, Container } from "react-bootstrap";

export default function Nav() {
    return (
        <Navbar className='sec-bg'>
            <Container>
                <Navbar.Brand href='/'>
                    <h1 className='icon'>React Shop</h1>
                </Navbar.Brand>
                <div>
                    <Cart />
                    <User />
                </div>
            </Container>
        </Navbar>
    );
}
