import React, { useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Card, ListGroup } from "react-bootstrap";

const clientId =
    "864851472070-qn600mhq25bv6cotbaoffvi943964ldp.apps.googleusercontent.com";

export default function GoogleAuth() {
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    });
    return (
        <>
            {!user ? (
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Sign in with Google'
                    onSuccess={(res) => setUser(res.profileObj)}
                    onFailure={(error) => console.log(error)}
                    cookiePolicy={"single_host_origin"}
                    // onClick={() => setUser(true)}
                    isSignedIn={true}
                />
            ) : (
                <>
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant='top' src={user.imageUrl} />
                        <Card.Body>
                            <Card.Title>Name: {user.name}</Card.Title>
                        </Card.Body>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item>
                                E-Mail: {user.email}
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body className='center'>
                            <GoogleLogout
                                clientId={clientId}
                                buttonText='Sign Out'
                                onLogoutSuccess={() => setUser(null)}
                            />
                        </Card.Body>
                    </Card>
                </>
            )}
        </>
    );
}
