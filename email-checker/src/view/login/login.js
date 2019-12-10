import React from 'react';
import styled from 'styled-components';

import { Authenticate } from './login.service';
import { Add } from '../../store/store';

const Title = styled.h1`
    text-align: center;
`

const MainDiv = styled.div`
    position: absolute;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
`;

const Username = styled.input.attrs(props => ({
    type: 'text',
    maxLength: '25',
    placeholder: 'Username'
}))`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Password = styled.input.attrs(props => ({
    type: 'password',
    maxLength: '25',
    placeholder: 'Password'
}))`
    display: block;
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const SubmitButton = styled.button`
    display: block;
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

class Login extends React.Component {

    constructor(props) {
        super(props);
        // initialize state
        this.state = {};  
        // refs
        this.usernameRef = React.createRef();          
        this.passwordRef = React.createRef();
        // bind
        this.login = this.login.bind(this);
    }

    render() {
        return (   
            <MainDiv>   
                <Title>Email Checker</Title>      
                <Username ref={this.usernameRef} />
                <Password ref={this.passwordRef} />
                <SubmitButton onClick={this.login}>Login</SubmitButton>
            </MainDiv>
        );
    }

    login() {        
        Authenticate(this.usernameRef.current.value, this.passwordRef.current.value).then(data => {
            if(data.key !== undefined && data.key.length > 0) {
                Add('key', data.key);
                window.location.pathname = '/list';
            } else {
                alert('Username or Password is invalid, try again');                
            }
        });
    }

}

export default Login;