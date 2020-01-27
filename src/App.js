import React from 'react';
import './App.css';
import firebase from './Config/Firebase';
import Navbar from './Components/Navbar';
import LoginForm from './Components/Login';
import RegisterationForm from './Components/Register';
import QuizPanel from './Components/QuizPanel';
import Dashboard from './Components/Dashboard';
import swal from 'sweetalert';
import { Container, Row, Col } from 'react-bootstrap';


class App extends React.Component {

  state = {
    usrEmail: null,
    usr: null,
    showLogin: true,
    showRegisterationForm: false,
    showQuizComponent: false,
    showDashboard: false,
    showQuizPanel: false,
    Course: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      let uId = 'null';
      let uEmail = 'null';
      if (user) {
        uId = firebase.auth().currentUser.uid;
        uEmail = firebase.auth().currentUser.email;
        // console.log(uEmail);
        this.setState({
          usrEmail: uEmail,
          usr: uId,
          showQuizPanel: false,
        });

        this.loginTrue();

      } else {
        this.setState({
          showLogin: true,
          showQuizPanel: false,
        })
      }
    });
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      var user = result.user;
      console.log(user);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }


  loginTrue = () => {
    this.setState({
      showLogin: false,
      showDashboard: true,
      showRegisterationForm: false,
      showQuizPanel: false,
    });
  }

  logOutTrue = (x) => {
    if (x === 'x') {
      this.setState({
        showLogin: true,
        showDashboard: false,
        showRegisterationForm: false,
        showQuizPanel: false,
        usr: null
      });
    }
    else {
      this.setState({
        showLogin: true,
        showDashboard: false,
        showQuizPanel: false,
        usr: null
      });
      firebase.auth().signOut()
        .then(function () {
          swal('User logged out');
        })
        .catch(function (error) {
          swal('Something went wrong');
        });
    }
  }

  showRegisterationForm = () => {
    this.setState({
      showRegisterationForm: true,
      showLogin: false,
      showQuizPanel: false
    });
  }

  showQuizPanel = (course) => {
    this.setState({
      showRegisterationForm: false,
      showLogin: false,
      showDashboard: false,
      showQuizPanel: true,
      Course: course,
    });
  }

  render() {

    const { usr, usrEmail, showRegisterationForm, showLogin, showDashboard, showQuizPanel, Course } = this.state;
    // console.log(usr);

    return (
      <React.Fragment>
        <Navbar usr={usr} regForm={this.showRegisterationForm} usrStatus={this.logOutTrue} />
        <Container className="form-container">
          <Row>
            <Col sm={4}></Col>
            <Col sm={4}>
              {
                showRegisterationForm && <RegisterationForm loginTrue={this.loginTrue} />
              }
              {
                showLogin && <LoginForm />
              }
            </Col>
          </Row>
        </Container>
        <Container fluid>
          {
            showDashboard && <Dashboard usrEmail={usrEmail} userID={usr} QuizPanelFunc={this.showQuizPanel} />
          }
          {
            showQuizPanel && <QuizPanel backFunc={this.loginTrue} userID={usr} course={Course} />
          }
        </Container>

      </React.Fragment>
    );
  }
}

export default App;
