import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Navigationbar extends React.Component {

    state = {
        logout_button: false,
        register_button: true,
        signInBtn: false,
    }

    componentDidMount(){
        const { usr, x } = this.props; 
        // console.log(usr);
        if(usr != null){
            this.setState({
                signInBtn: false,
                register_button: false,
                logout_button: true
            });
        }else{
            this.setState({
                signInBtn: false,
                register_button: true,
                logout_button: false
            });
        }
        if(x){
            this.setState({
                signInBtn: false,
                register_button: false,
                logout_button: true
            });
        }

    }

    eventClickOnNavbar = (x)=>{
        const { regForm, usrStatus, usr } = this.props; 
        if(x==='signup'){
            document.getElementById('signupBtn').style.display = 'none';   
            this.setState({
                signInBtn: true,
                register_button: false,
                logout_button: false
            });

            regForm();
        }
        else if(x==='logout'){
            usrStatus();
        }
        else if(x==='login'){
            usrStatus('x');
        }
    }

    render() {
        const {usr} = this.props;
        const {logout_button, register_button, signInBtn} = this.state;

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Quiz App</Navbar.Brand>
               {
                  !usr &&  <Button variant="outline-info" id="signupBtn" className="ml-auto" onClick={() => this.eventClickOnNavbar('signup')}>Sign Up</Button>
               }
               {
                   usr && <Button variant="outline-info" className="ml-auto" onClick={() => this.eventClickOnNavbar('logout')}>Logout</Button>
               }
               {
                  signInBtn && <Button variant="outline-info" className="ml-auto" onClick={() => this.eventClickOnNavbar('login')}>Login</Button>
               }
            </Navbar>
        )
    }
}
export default Navigationbar;