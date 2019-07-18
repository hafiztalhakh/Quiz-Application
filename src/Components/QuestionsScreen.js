import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
// import swal from 'sweetalert';
// import firebase from '../Config/Firebase';
import '../App.css';

class RenderQuestions extends React.Component {

    state = {
        next: 0,
        selectedOption: 0,
        correctCount: 0,
    }

    selectedOptionHandler = (e, opt) => {
        this.setState({
            selectedOption: opt
        });
    }

    checkResult = () => {

        const { correctCount, selectedOption, next } = this.state;
        const { Quiz_Data } = this.props;

        // console.log(selectedOption);
        // console.log(Quiz_Data.Questions[next].Correct);
        if (selectedOption === Quiz_Data.Questions[next].Correct) {
            this.setState({
                correctCount: correctCount + 1
            });
        }
    }

    nextHandler = (e) => {

        this.checkResult();
        const { next } = this.state;
        this.setState({
            next: next + 1,
            selectedOption: 0
        })
    }

    submitQuiz = (quiz) => {
        const { renderResult } = this.props;
        const { correctCount } = this.state;

        renderResult(correctCount, quiz);
    }

    render() {

        const { Quiz_Data } = this.props;
        const { next, selectedOption } = this.state;
        const Questions_Arr = Quiz_Data.Questions[next].Options;
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col md={4}></Col>
                        <Col md={4}></Col>
                        <Col md={4}>
                            <RenderTimer time={Quiz_Data.Duration} title={Quiz_Data.Title} submitQuiz={this.submitQuiz} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={6}>
                            <br />
                            <Card border='dark' className="panel-card">
                                <Card.Header as="h5" className="panel-heading">Question {next + 1} of {Quiz_Data.Title}</Card.Header>
                                <Card.Body>
                                    <Card.Title> {Quiz_Data.Questions[next].Title} </Card.Title>
                                    {
                                        Questions_Arr.map((val, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <Form.Check
                                                        type="radio"
                                                        name="radio"
                                                        // aria-label="radio {index + 1}"
                                                        label={val}
                                                        value={index + 1}
                                                        onChange={(e) => this.selectedOptionHandler(e, index + 1)}
                                                    />
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    <br />
                                    {selectedOption ? Quiz_Data.Questions.length === next + 1 ? <Button onClick={() => this.submitQuiz(Quiz_Data.Title)} className="join-btn" variant='dark'>Submit</Button>
                                        :
                                        <Button onClick={() => this.nextHandler()} className="join-btn" variant='dark'>Next</Button> : null}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment >
        )
    }
}

class RenderTimer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            time: {},
            seconds:0,
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
    }


    componentDidMount() {

        const { time } = this.props;
        
        let timeCheck = this.secondsToTime(this.state.seconds);
        this.setState({
            time: timeCheck,
            seconds: time,
        });
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer() {    

        const { seconds } = this.state;
        const { submitQuiz, title } = this.props;

        if (this.timer == 0 && seconds > 0) {
            this.timer = setInterval(()=> {

                const { seconds } = this.state;
                let sec = seconds - 1;
                if (sec < 10) {
                    this.setState({
                        time: this.secondsToTime(sec),
                        seconds: "0" + sec,
                    })
                }else{
                    this.setState({
                        time: this.secondsToTime(sec),
                        seconds: sec,
                    });
                }
                // Check if we're at zero.
                if (sec == 0) {
                    clearInterval(this.timer);
                    submitQuiz(title);
                }
            }, 1000);
        }
    }

    render() {

        const { time, seconds } = this.state;
        this.startTimer();
        console.log('test');
        return (
            <div style={{ float: "left" }}>
                <span>
                    <b>
                        {time.m} : {time.s}
                    </b>
                </span>
            </div>
        );
    }
}


export default RenderQuestions;