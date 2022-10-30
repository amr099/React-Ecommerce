import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { CartContext } from "../Context/CartContext";
import { Button, Form, Card, Placeholder } from "react-bootstrap";

export default function Home() {
    const [products, setProducts] = useState();
    useEffect(() => {
        axios
            .get("https://dummyjson.com/products")
            .then((response) => {
                setQ(response.data.products);
                setProducts(response.data.products);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const { cart, setCart } = useContext(CartContext);
    const addToCart = (product) => {
        setCart([
            {
                id: product.id,
                title: product.title,
                description: product.description,
                image: product.thumbnail,
                price: product.price,
            },
            ...cart,
        ]);
    };

    const [q, setQ] = useState();
    const search = (e) => {
        e.preventDefault();
        let param = e.target[0].value;
        setQ(products.filter((product) => product.title.includes(param)));
    };

    const selectCategory = (cat) => {
        setQ(products.filter((product) => product.category.match(cat)));
    };

    const [sortBy, setSortBy] = useState("");
    const order = (a, b) => {
        if (sortBy === "asc") return a.price - b.price;
        else if (sortBy === "dec") return b.price - a.price;
        else return;
    };

    return (
        <>
            <Form onSubmit={search}>
                <Form.Group className='d-flex flex-row my-4 mx-auto w-25 '>
                    <Form.Control />
                    <Button variant='primary' type='submit' className='mx-1'>
                        Search
                    </Button>
                </Form.Group>
            </Form>
            <Form.Group className='w-25 m-4'>
                <label htmlFor='select'>Sort products</label>
                <Form.Select
                    id='select'
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <optgroup label='by price'>
                        <option value='asc'>Asc</option>
                        <option value='dec'>Dec</option>
                    </optgroup>
                </Form.Select>
            </Form.Group>
            <div>
                <ul className='d-flex flex-row flex-wrap justify-content-around mb-4'>
                    <li onClick={() => selectCategory("smartphones")}>
                        Smartphones
                    </li>
                    <li onClick={() => selectCategory("laptops")}>Laptops</li>
                    <li onClick={() => selectCategory("fragrances")}>
                        Fragrances
                    </li>
                    <li onClick={() => selectCategory("skincare")}>Skincare</li>
                    <li onClick={() => selectCategory("groceries")}>
                        Groceries
                    </li>
                    <li onClick={() => selectCategory("home-decoration")}>
                        Home Decoration
                    </li>
                </ul>
            </div>
            <div className='d-flex flex-wrap justify-content-around p-4 base-bg '>
                {products ? (
                    <>
                        {q.sort(order).map((product) => (
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
                                        onClick={() => addToCart(product)}
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
                        {Array.from(Array(30).keys()).map((i) => (
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
