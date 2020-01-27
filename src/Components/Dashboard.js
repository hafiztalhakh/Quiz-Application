import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import firebase from '../Config/Firebase';
import '../App.css';


class Dashboard extends React.Component {

    state = {
        showQuizPanel: false,
        CoursesArr: [],
        Joined_Courses: [],
    }

    componentDidMount() {

        // const { userID } = this.props;
        const { Joined_Courses } = this.state;

        const fbRef = firebase.database().ref().child("Users").child(firebase.auth().currentUser.uid);
        fbRef.on('value', val => {
            this.setState({
                Joined_Courses: val.val().Courses_List.Joined_Courses,
                CoursesArr: val.val().Courses,
                showQuizPanel: false,
            })
        });
    }

    joinCourse = (course) => {
        const { userID } = this.props;
        const { Joined_Courses } = this.state;
        if (Joined_Courses[0] === 'You may not joined for any course') {
            Joined_Courses[0] = course;
        }
        else {
            Joined_Courses.push(course);
        }

        const dbRef = firebase.database().ref().child("Users").child(userID).child("Courses_List");
        dbRef.set({
            Joined_Courses
        }).then(() => {
            // swal('yo');
        }).catch((error) => {
            var errorMessage = error.message;
            swal(`Error: ${errorMessage}`);
        });

        if (course === 'HTML') {
            document.getElementById("HTML").disabled = true;
        }
        else if (course === 'CSS') {
            document.getElementById("CSS").disabled = true;
        }
        else if (course === 'JavaScript') {
            document.getElementById("JavaScript").disabled = true;
        }
    }

    quizInitiator = (course) => {
        const { QuizPanelFunc } = this.props;
        this.setState({
            showQuizPanel: true,
        });
        QuizPanelFunc(course);
    }

    render() {

        const { usrEmail } = this.props;
        const { CoursesArr, Joined_Courses } = this.state;
        let var1 = true;
        if (Joined_Courses[0] === 'You may not joined for any course')
            var1 = true;
        else
            var1 = false;
        let var2 = false;

        return (
            <React.Fragment>
                <Container fluid>
                    <Row>
                        <Col sm={4}>
                            <Card border="dark">
                                <Card.Header className="panel-heading" as="h5">Logged in User</Card.Header>
                                <Card.Body>
                                    <Card.Title>Welcome: {usrEmail} </Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={5}>
                            <Card border="dark">
                                <Card.Header className="panel-heading" as="h5">Joined Courses</Card.Header>
                                {
                                    var1 ?
                                        <Card.Body>
                                            <Row>
                                                <Col sm={10}><Card.Title className="inline-item">You may not joined for any course</Card.Title></Col>
                                            </Row>
                                        </Card.Body>
                                        :
                                        <div>
                                            {
                                                Joined_Courses.map((val, index) => {
                                                    return (
                                                        <Card.Body key={index}>
                                                            <Row>
                                                                <Col sm={10}><Card.Title className="inline-item">{val}</Card.Title></Col>
                                                                <Col sm={2}> <Button onClick={() => this.quizInitiator(val)} className="join-btn" variant="dark">Open</Button></Col>
                                                            </Row>
                                                        </Card.Body>
                                                    )
                                                })
                                            }
                                        </div>

                                }
                            </Card>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={10}>
                            <Card border="dark">
                                <Card.Header className="panel-heading" as="h5">Recomended Courses</Card.Header>
                                {
                                    CoursesArr.map((val, index) => {
                                        if (Joined_Courses.includes(val))
                                            var2 = true
                                        else
                                            var2 = false
                                        return (
                                            <Card.Body key={index}>
                                                <Row>
                                                    <Col sm={10}><Card.Title className="inline-item">{val}</Card.Title></Col>
                                                    <Col sm={2}> {var2 ? <Button className="join-btn" disabled variant="dark">Join</Button> : <Button onClick={() => this.joinCourse(val)} id={val} className="join-btn" variant="dark">Join</Button>}</Col>
                                                </Row>
                                            </Card.Body>
                                        )
                                    })
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br></br>
            </React.Fragment>
        );
    }
}
export default Dashboard;