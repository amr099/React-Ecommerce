import React, { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import { BsPerson } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";

export default function User() {
    const [show, setShow] = useState(false);

    return (
        <>
            <BsPerson
                size={"2.5rem"}
                className='mx-4 icon'
                onClick={() => setShow(true)}
            />

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Body className='d-flex justify-content-center'>
                    <GoogleAuth />
                </Modal.Body>
            </Modal>
        </>
    );
}
