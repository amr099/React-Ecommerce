import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Stack, Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "./../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function Checkout() {
    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate("");
    let total = 0;
    cart.forEach((item) => {
        total += item.price;
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm("");
    console.log(errors);
    const showOrderInfo = (data) => {
        console.log(data);
    };
    return (
        <>
            <Container>
                <BsArrowLeft
                    className='icon'
                    size={"2.5rem"}
                    onClick={() => navigate(-1)}
                />
                <h2 className='text-info m-4'>
                    Total Price : $<mark>{total}</mark>
                </h2>
            </Container>
            <Container className='mt-4 full-view d-flex justify-content-center'>
                {user ? (
                    <>
                        <Form onSubmit={handleSubmit(showOrderInfo)}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    {...register("firstname", {
                                        required: "This field is required.",
                                    })}
                                    type='text'
                                    placeholder='Full Name'
                                />
                                <Form.Text className='text-warning'>
                                    {errors?.firstname?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    {...register("email", {
                                        required: "This field is required.",
                                    })}
                                    type='email'
                                    placeholder='Enter email'
                                />
                                <Form.Text className='text-warning'>
                                    {errors?.email?.message}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    {...register("password", {
                                        required: "This field is required.",
                                    })}
                                    type='password'
                                    placeholder='Password'
                                />
                                <Form.Text className='text-warning'>
                                    {errors?.password?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    {...register("number", {
                                        required: "This field is required.",
                                        minLength: "11",
                                        maxLength: "11",
                                    })}
                                    type='text'
                                    placeholder='Phone Number'
                                />
                                <Form.Text className='text-warning'>
                                    {errors?.number?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    {...register("address", {
                                        required: "This field is required.",
                                    })}
                                    type='text'
                                    placeholder='Address'
                                />
                                <Form.Text className='text-warning'>
                                    {errors?.address?.message}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Check
                                    type='checkbox'
                                    label='Cash on Delivery'
                                />
                            </Form.Group>
                            <Button
                                variant='success'
                                className='mt-4'
                                type='submit'
                            >
                                Place Order
                            </Button>
                        </Form>
                    </>
                ) : (
                    <h1 className='info'>
                        You Have to Login First.{" "}
                        <Link to='/' className='link'>
                            Back to Home
                        </Link>
                    </h1>
                )}
            </Container>
        </>
    );
}
