import React, { useState } from "react";
import { Form, FormGroup, Container, Button, Input } from "reactstrap";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({ user: { username: username, password: password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
            let checkToken = data.sessionToken;
            if (checkToken === undefined) {
                alert("Invalid Login");
                return
            } else {
                alert("You are logged in.")
            }
            props.setId(data.user.id);
            props.getUsername(data.user.username)
        });
    }

    function usernameOnChange(event) {
        console.log(event.target.value);
        setUsername(event.target.value);
    }


    function usernameOnChange(event) {
        console.log(event.target.value);
        setUsername(event.target.value);
    }

    function passwordOnChange(event) {
        setPassword(event.target.value);
    }
    return (
        <Container className="auth-container">
            <h3 className="header2">Login</h3>
            <h6 className="sent1">Login to use the I8That App.</h6>
            <Form className="input1" onSubmit={handleSubmit}>
                <FormGroup>
                    <Input
                        className="input2"
                        type="text"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => usernameOnChange(e)}
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        className="input2"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => passwordOnChange(e)}
                    />
                </FormGroup>
                <Button className="btnsubmit" type="submit">
                    Login
        </Button>
            </Form>
        </Container>
    );
};

export default Login;
