import React, { useState, useContext } from "react";
import { CartContext } from "./../Context/CartContext";
import { AuthContext } from "./../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsCartDash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { Button, Card } from "react-bootstrap";

export default function Cart() {
    const { user } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const removeFromCart = (title) => {
        setCart(cart.filter((item) => item.title !== title));
    };
    return (
        <>
            <BsCartDash
                className='icon'
                size={"2.5rem"}
                onClick={() => setShow(true)}
            />

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h2>My Cart</h2>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {cart.length !== 0 ? (
                        <>
                            {cart?.map((item) => (
                                <Card className='my-4' key={item.id}>
                                    <Card.Header as='h5'>
                                        {item.title}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <mark>${item.price}</mark>
                                        </Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button
                                            variant='danger'
                                            onClick={() =>
                                                removeFromCart(item.title)
                                            }
                                        >
                                            Remove from Cart
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <h4>Your Cart is Empty.</h4>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {user ? (
                        <Button
                            onClick={() => {
                                navigate("checkout");
                                setShow(false);
                            }}
                        >
                            Checkout
                        </Button>
                    ) : (
                        <p className='text-info'>
                            You have to LogIn before checking out
                        </p>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
