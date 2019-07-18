import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import firebase from '../Config/Firebase';
import QuestionsScreen from '../Components/QuestionsScreen';
import '../App.css';
var FontAwesome = require('react-fontawesome');



class QuizPanel extends React.Component {

    state = {
        showQuizNavbar: true,
        showQuizDetails: false,
        showQuizVerifyKey: false,
        showResult: false,
        renderQuestions: false,
        Quiz_List: [],
        Quiz_Data: {},
        showResult_withQuizDetails: false,
        btn: false,
    }

    componentDidMount() {
        const { userID, course } = this.props;
        // const { } = this.state;
        const fbRef = firebase.database().ref().child("Users").child(userID).child('Quiz_List').child(course);
        fbRef.on('value', val => {
            console.log(val.val());
            this.setState({
                Quiz_List: val.val().Quiz,
                // Attempted: val.val().Status,
            })
        });

    }

    back = () => {
        const { backFunc } = this.props;
        backFunc();
    }

    renderQuizDetails = (quiz) => {
        const { userID, course } = this.props;
        const fbRef = firebase.database().ref().child("Users").child(userID).child('Quiz_List').child(course).child(quiz);
        fbRef.on('value', val => {
            // console.log(val.val());
            this.setState({
                showQuizDetails: true,
                showQuizVerifyKey: false,
                showResult_withQuizDetails: false,
                showResult: false,
                Quiz_Data: val.val(),
            });
            if (val.val().Status === 'Attempted') {
                this.setState({
                    showResult_withQuizDetails: true,
                    showQuizDetails: false,
                    btn: true,
                })
            }
        });

    }

    renderQuizKeyComponent = () => {
        this.setState({
            showQuizNavbar: false,
            showQuizDetails: false,
            showQuizVerifyKey: true,
            showResult: false,
            renderQuestions: false
        });
    }

    renderQuestion = () => {
        this.setState({
            showQuizNavbar: false,
            showQuizDetails: false,
            showQuizVerifyKey: false,
            showResult: false,
            renderQuestions: true
        });
    }

    renderResult = (correct, quiz) => {

        const { Quiz_Data } = this.state;
        const { userID, course } = this.props;

        let total_ques = Quiz_Data.Total_Questions;
        let marks = (correct / total_ques) * 100;
        firebase.database().ref().child("Users").child(userID).child('Quiz_List').child(course).child(quiz).child('Status').set('Attempted');
        firebase.database().ref().child("Users").child(userID).child('Quiz_List').child(course).child(quiz).child('Result').set({
            score: marks,
            correct_ques: correct,
        });
        this.setState({
            showQuizNavbar: false,
            showQuizDetails: false,
            showQuizVerifyKey: false,
            showResult: true,
            renderQuestions: false,
        });
    }

    render() {

        const { showQuizNavbar, showQuizDetails, showQuizVerifyKey, showResult, renderQuestions, Quiz_Data, Quiz_List, showResult_withQuizDetails, btn } = this.state;
        const { course } = this.props;

        return (
            <React.Fragment>
                {
                    showQuizNavbar && <Container fluid className="myDiv">
                        <Row>
                            <Col>
                                <div className="back-button">
                                    <FontAwesome
                                        className='fas fa-arrow-circle-left yo'
                                        name=''
                                        size='3x'
                                        title="Click to go Back"
                                        onClick={this.back}
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <QuizNavBar showQuizDetails={this.renderQuizDetails} Quiz_List={Quiz_List} course={course} />
                            </Col>
                            <Col md={1}></Col>
                            <Col md={8}>
                                <h3>Welcome to HTML Quiz</h3><br />
                                {
                                    showQuizDetails &&
                                    <Row>
                                        <Col>
                                            <QuizDetails Quiz_Data={Quiz_Data} course={course} showQuizKey={this.renderQuizKeyComponent} />
                                        </Col>
                                    </Row>
                                }
                                {
                                    showResult_withQuizDetails &&
                                    <React.Fragment>
                                        <Row>
                                            <Col>
                                                <QuizDetails Quiz_Data={Quiz_Data} btn={btn} course={course} showQuizKey={this.renderQuizKeyComponent} />
                                            </Col>
                                        </Row>
                                        <br/>
                                        <Row>
                                            <Col md={6}>
                                                <ResultComponent Quiz_Data={Quiz_Data} Course={course} />
                                            </Col>
                                        </Row>
                                        <br/>
                                    </React.Fragment>
                                }
                            </Col>
                        </Row>
                    </Container>
                }
                {
                    showQuizVerifyKey && <QuizKeyComponent back={this.back} course={course} renderQuestion={this.renderQuestion} />
                }
                {
                    renderQuestions && <QuestionsScreen Quiz_Data={Quiz_Data} renderResult={this.renderResult} />
                }
                {
                    showResult && <Container>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={6}>
                                <ResultComponent Quiz_Data={Quiz_Data} Course={course} />
                            </Col>
                        </Row>
                    </Container>
                }
            </React.Fragment>
        );

    }
}

class QuizNavBar extends React.Component {

    render() {
        const { showQuizDetails, Quiz_List, course } = this.props;

        return (
            <React.Fragment>
                <Card border="dark" className="quizNavBar">
                    <Card.Header className="panel-heading" as="h5">Quiz Title: {course}</Card.Header>
                    <Card.Body className="quiz-navs">
                        {
                            Quiz_List.map((val, index) => {
                                return (
                                    <ListGroup border="dark" key={index}>
                                        <ListGroupItem><Card.Link href="#" onClick={() => { showQuizDetails(val) }}>{val}</Card.Link></ListGroupItem>
                                    </ListGroup>
                                )
                            })
                        }
                    </Card.Body>
                </Card>
            </React.Fragment >
        )
    }
}

class QuizDetails extends React.Component {

    render() {
        const { showQuizKey, Quiz_Data, course, btn } = this.props;
        // console.log(Quiz_Data);
        
        return (
            <React.Fragment>
                {
                    <div className="quiz-info-display">
                        <p><b>Quiz Title: {course} {Quiz_Data.Title}</b></p>
                        <p><b>Passing Score: {Quiz_Data.Passing_Marks}% </b></p>
                        <p><b>Quiz Duration: {Quiz_Data.Duration} Minutes </b></p>
                        <p><b>Total Questions: {Quiz_Data.Total_Questions} </b></p>
                    </div>
                }
                <br />
                { btn ? <Button className="myBtnQuiz1" variant="dark" disabled onClick={showQuizKey}>Continue</Button> : <Button className="myBtnQuiz1" variant="dark" onClick={showQuizKey}>Continue</Button>}
            </React.Fragment>

        );
    }
}

class QuizKeyComponent extends React.Component {

    state = {
        key: undefined,
    }

    checkKey = () => {
        const { renderQuestion } = this.props;
        const { key } = this.state;
        if (key === '12345') {
            renderQuestion();
        } else {
            swal('Key is Invalid');
        }
    }

    handle = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { back, course } = this.props;

        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <div className="productkey-div">
                                <h5>Quiz Title: {course} Quiz 1</h5>
                                <br />
                                <Form>
                                    <Form.Control type="password" name="key" onChange={this.handle} placeholder="Enter Product Key" />
                                </Form>
                                <Row>
                                    <Col md={6}>
                                        <Button className="prdctBtn" variant="dark" onClick={this.checkKey}>Next</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button className="prdctBtn" variant="dark" onClick={back}>Back</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>

        );
    }
}


class ResultComponent extends React.Component {
    render() {

        const { Quiz_Data, Course } = this.props;

        let remarks = null;
        if (Quiz_Data.Result.score >= Quiz_Data.Passing_Marks) {
            remarks = 'Passed';
        } else {
            remarks = 'Failed';
        }

        return (
            <React.Fragment>
                <Card border="dark" className="panel-card">
                    <Card.Header as="h5" className="panel-heading">Result</Card.Header>
                    <Card.Body>
                        <Card.Title>Quiz Title: {Course} {Quiz_Data.Title}</Card.Title>
                        <Card.Title>Correct Questions: {Quiz_Data.Result.correct_ques} out of {Quiz_Data.Total_Questions}</Card.Title>
                        <Card.Title>Marks: {Quiz_Data.Result.score}%</Card.Title>
                        <Card.Title>Remarks: {remarks}</Card.Title>
                    </Card.Body>
                </Card>
            </React.Fragment >
        );
    }
}

export default QuizPanel;