import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { CartContext } from "../Context/CartContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

export default function Products() {
    const [products, setProducts] = useState();
    const { cart, setCart } = useContext(CartContext);
    const numOfProduct = Array.from(Array(30).keys());

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((response) => {
                setProducts(response.data.products);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <>
            <div className='d-flex flex-wrap justify-content-around p-4 base-bg '>
                {products ? (
                    <>
                        {products?.map((product) => (
                            <Card
                                style={{ width: "18rem" }}
                                className='m-4'
                                key={product.id}
                            >
                                <Card.Img
                                    variant='top'
                                    src={product.thumbnail}
                                    height='300px'
                                />
                                <Card.Body>
                                    <Card.Title>
                                        <h3>{product.title}</h3>
                                    </Card.Title>
                                    <Card.Subtitle className='my-4'>
                                        <mark>${product.price}</mark>
                                    </Card.Subtitle>
                                    <Card.Text>{product.description}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button
                                        className='mx-4'
                                        variant='success'
                                        onClick={() => {
                                            setCart([
                                                {
                                                    id: product.id,
                                                    title: product.title,
                                                    description:
                                                        product.description,
                                                    image: product.image,
                                                    price: product.price,
                                                },
                                                ...cart,
                                            ]);
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button variant={"outline-primary"}>
                                        <Link
                                            className='link'
                                            to={"product/" + product.id}
                                            element={<ProductDetails />}
                                        >
                                            View
                                        </Link>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))}
                    </>
                ) : (
                    <>
                        {numOfProduct.map((i) => (
                            <Card
                                style={{ width: "18rem" }}
                                className='m-4'
                                key={i}
                            >
                                <Card.Img
                                    variant='top'
                                    src='https://thumbs.dreamstime.com/b/no-thumbnail-image-placeholder-forums-blogs-websites-148010362.jpg'
                                    height='300px'
                                />
                                <Card.Body>
                                    <Placeholder
                                        as={Card.Title}
                                        animation='glow'
                                    >
                                        <Placeholder xs={6} />
                                    </Placeholder>
                                    <Placeholder
                                        as={Card.Text}
                                        animation='glow'
                                    >
                                        <Placeholder xs={7} />{" "}
                                        <Placeholder xs={4} />{" "}
                                        <Placeholder xs={4} />{" "}
                                        <Placeholder xs={6} />{" "}
                                        <Placeholder xs={8} />
                                    </Placeholder>
                                    <Placeholder.Button
                                        variant='primary'
                                        xs={6}
                                    />
                                </Card.Body>
                            </Card>
                        ))}
                    </>
                )}
            </div>
        </>
    );
}
