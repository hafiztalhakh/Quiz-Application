import React from 'react';
import firebase from '../Config/Firebase';
import swal from 'sweetalert';
import { Form, Button } from 'react-bootstrap';


class RegisterationForm extends React.Component {

    state = {
        name: undefined,
        userName: null,
        password: '',
        password2: '',
        // showMenu
    }

    registerAccount = () => {
        const { userName, password, password2, name, } = this.state;
        const { loginTrue } = this.props;
        if (password === password2) {
            firebase.auth().createUserWithEmailAndPassword(userName, password).then(() => {
                swal("You are Registered Successfully");
                const userID = firebase.auth().currentUser.uid;
                const dbRef = firebase.database().ref().child("Users").child(userID);
                dbRef.set({
                    Full_Name: name,
                    Email: userName,

                    Courses: ['HTML', 'CSS', 'JavaScript',
                    ],
                    Courses_List: {
                        Joined_Courses: [
                            'You may not joined for any course'
                        ],
                    },
                    Quiz_List: {
                        HTML: {
                            Quiz: ['Quiz1', 'Quiz2', 'Quiz3'],
                            Quiz1: {
                                Title: 'Quiz1',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                },
                            },
                            Quiz2: {
                                Title: 'Quiz2',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            },
                            Quiz3: {
                                Title: 'Quiz3',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            }
                        },
                        CSS: {
                            Quiz: ['Quiz1', 'Quiz2', 'Quiz3'],
                            Quiz1: {
                                Title: 'Quiz1',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            },
                            Quiz2: {
                                Title: 'Quiz2',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            },
                            Quiz3: {
                                Title: 'Quiz3',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            }
                        },
                        JavaScript: {
                            Quiz: ['Quiz1', 'Quiz2', 'Quiz3'],
                            Quiz1: {
                                Title: 'Quiz1',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            },
                            Quiz2: {
                                Title: 'Quiz2',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            },
                            Quiz3: {
                                Title: 'Quiz3',
                                Status: 'Not-Attempted',
                                Duration: 30,
                                Total_Questions: 3,
                                Passing_Marks: 50,
                                Questions: [
                                    {
                                        Title: "What is JavaScript",
                                        Options: ["Natural Language", "Scripting Language", "FrameWork", "None of these"],
                                        Correct: 2
                                    },
                                    {
                                        Title: "HTML Stands for",
                                        Options: ["Hyper text markup language", "Language", "FrameWork", "None of these"],
                                        Correct: 1
                                    },
                                    {
                                        Title: "Inside which HTML element do we put the JavaScript?",
                                        Options: ["<script>", "JS", "Scripting", "Javascritp"],
                                        Correct: 1
                                    }
                                ],
                                Result: {
                                    score: 0,
                                    correct_ques: 0,

                                }
                            }
                        }
                    }
                });

                loginTrue();

            }).catch(error => {
                var errorMessage = error.message;
                // console./log(errorMessage);
                swal('something went wrong');
            });
        }
        else {
            swal(`Password does not match`);
        }
    }

    handle = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="form-heading">
                    <h1>Create Account</h1>
                </div>
                <br />
                <Form>
                    <Form.Group controlId="formBasicName">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control
                            type="text"
                            placeholder="Enter Your Full Name "
                            onChange={this.handle}
                            name="name"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        {/* <Form.Label>Email address</Form.Label> */}
                        <Form.Control
                            type="email"
                            placeholder="Enter email address"
                            onChange={this.handle}
                            name="userName"

                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            onChange={this.handle}
                            name="password"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword2">
                        {/* <Form.Label>Password</Form.Label> */}
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            onChange={this.handle}
                            name="password2"
                        />
                    </Form.Group>
                </Form>
                <Button variant="dark" type="submit" className="form-button" onClick={this.registerAccount}>Register</Button>
            </React.Fragment>
        );
    }
}
export default RegisterationForm;