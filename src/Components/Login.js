import React from 'react';
import '../App.css';
import firebase from '../Config/Firebase';
import swal from 'sweetalert';
import { Form, Button } from 'react-bootstrap';

class LoginForm extends React.Component {

    state = {
        userName: undefined,
        password: '',
    }

    login = () => {
        const { userName, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(userName, password)
            .then(() => {
                // myAlert("Welcme");
            })
            .catch(error => {
                var errorMessage = error.message;
                swal(`Error ${errorMessage}`);
            });
    }

    handle = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-heading">
                    <h1>Login</h1>
                </div>
                <br />
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="userName"
                            onChange={this.handle}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        onChange={this.handle}
                        />
                    </Form.Group>
                </Form>
                <Button variant="dark" type="submit" className="form-button" onClick={this.login}>Login</Button>
            </React.Fragment>
        );
    }
}
export default LoginForm;