import React, { useState } from 'react';
import { Form, FormGroup, Container, Button, Input } from 'reactstrap';

const Signup = (props) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/user/create", {
            method: 'POST',
            body: JSON.stringify({ user: { username: email, password: password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
            let checkToken = data.sessionToken;
            if (checkToken === undefined) {
                alert("Email already in use.");
                return
            } else {
                alert("You have successfully signed up!")
            }
            console.log(data.user.username);
            console.log(data);
            props.setId(data.user.id)
            props.getUsername(data.user.username)
        })
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
            <h3 className="header2">Signup</h3>
            <h6 className="sent1">Register to use the I8That App.</h6>
            <Form className="input1" onSubmit={handleSubmit}>
                <FormGroup>
                    <Input className="input2"
                        type="text"
                        placeholder="Username"
                        pattern="^(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-zA-Z]).*$"
                        title="Username should be 4 or more characters and include number or special character"
                        required
                        value={username}
                        onChange={(e) => usernameOnChange(e)} />
                </FormGroup>
                <FormGroup>
                    <Input className="input2"
                        type="password"
                        placeholder="Password"
                        pattern="^(?=^.{4,}$).*$"
                        title="Password should be 5 or more characters"
                        required
                        value={password}
                        name="password"
                        onChange={(e) => passwordOnChange(e)} />
                </FormGroup>
                <Button className="btnsubmit" type="submit">Signup</Button>
            </Form>
        </Container>
    )
}

export default Signup;


