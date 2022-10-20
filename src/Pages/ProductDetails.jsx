import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { BsArrowLeft } from "react-icons/bs";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";

export default function ProductDetails() {
    const { cart, setCart } = useContext(CartContext);
    const { id } = useParams();
    const [product, setProduct] = useState();
    const navigate = useNavigate(null);

    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        Axios.get(`https://dummyjson.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);
    return (
        <>
            {product ? (
                <Row className='full-view m-4'>
                    <Col xl={1}>
                        <BsArrowLeft
                            className='icon'
                            size={"2.5rem"}
                            onClick={() => navigate(-1)}
                        />
                    </Col>
                    <Col xl={5}>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item className='slide'>
                                <img
                                    className='d-block w-100 slide'
                                    src={product.thumbnail}
                                    alt='First slide'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100 slide'
                                    src={
                                        product.images[2]
                                            ? product.images[2]
                                            : product.thumbnail
                                    }
                                    alt='Second slide'
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className='d-block w-100 slide'
                                    src={
                                        product.images[3]
                                            ? product.images[3]
                                            : product.thumbnail
                                    }
                                    alt='Third slide'
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col>
                        <h2 className='mb-4'>{product.title}</h2>
                        <h3>
                            <mark>${product.price}</mark>
                        </h3>
                        <p>{product.description}</p>
                        <Button
                            variant={"success"}
                            className='mt-4'
                            onClick={() =>
                                setCart([
                                    {
                                        id: product.id,
                                        title: product.title,
                                        description: product.description,
                                        image: product.image,
                                        price: product.price,
                                    },
                                    ...cart,
                                ])
                            }
                        >
                            Add to cart
                        </Button>
                    </Col>
                </Row>
            ) : (
                <Spinner animation='grow' />
            )}
        </>
    );
}
