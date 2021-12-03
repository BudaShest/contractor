import React, {useRef, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {loginAction} from "../../store/loginReducer";
import {Button, Col, Container, Icon, Row, TextInput} from 'react-materialize';
import axios from "axios";
import jwt from 'jsonwebtoken';

const Auth = () => {
    const [serverMsg, setMsg] = useState("");
    const loginInputRef = useRef();
    const passwordInputRef = useRef();
    const params = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();



    const logIn = ()=>{
        const login = loginInputRef.current.value;
        const password = passwordInputRef.current.value;

        axios.post('http://127.0.0.1:5000/login',JSON.stringify({login, password}))
            .then(res=> {
                setMsg("Успешно авторизован!  Подождите секундочку)");
                const token = res.data.token;
                const authObj = jwt.verify(token,"qazwsxedc").sub;
                dispatch(loginAction({...authObj,token}));
                const shortUrl = params['short_url'];
                if (shortUrl){
                    // navigate('http://127.0.0.1:5000/'+shortUrl);
                    // window.location.href = 'http://127.0.0.1:5000/'+shortUrl;
                    console.log(shortUrl);
                    axios.get('http://127.0.0.1:5000/'+shortUrl, {cors:'no-cors',headers: {'Authorization': `Bearer ${token}`,'Access-Control-Allow-Origin':"*"}})
                        .then(res=> {
                            console.log(res);
                            setTimeout(()=>{
                                window.location.href = res.data;
                            })
                        })
                        .catch(err=>console.log(err))


                }else{
                    setTimeout(()=>{
                        navigate('/my-links');
                    },2000)
                }


            })
            .catch(err=>{
                setMsg('Ошибка авторизации!')
            })
    }


    return (
        <main>
            <Container>
                <form action="">
                    <h5>Авторизация</h5>
                    <Row>
                        <TextInput
                            ref={loginInputRef}
                            icon={<Icon>login</Icon>}
                            id="TextInput-5"
                            label="Логин:"
                            s={12}
                        />
                        <TextInput
                            ref={passwordInputRef}
                            icon={<Icon>password</Icon>}
                            id="TextInput-6"
                            label="Пароль:"
                            password
                            s={12}
                        />
                        <Row>
                            <Col s={6}>
                                <Button
                                    onClick={logIn}
                                    large
                                    node="a"
                                    style={{
                                        marginRight: '5px'
                                    }}
                                    waves="light"
                                >
                                    ОК
                                </Button>
                            </Col>
                            <Col s={6}>
                                <Button
                                    large
                                    node="a"
                                    style={{
                                        marginRight: '5px'
                                    }}
                                    waves="light"
                                >
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                        <span>{serverMsg}</span>
                    </Row>
                </form>
            </Container>
        </main>
    );
};

export default Auth;