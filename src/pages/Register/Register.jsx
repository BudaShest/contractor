import React,{useRef, useState} from 'react';
import {Container, Row, TextInput, Icon,Col, Button} from 'react-materialize';
import axios from "axios";


const Register = () => {
    const [serverMsg, setMsg] = useState("");
    const loginInputRef = useRef();
    const passwordInputRef = useRef();

    const register = ()=>{
        const login = loginInputRef.current.value;
        const password = passwordInputRef.current.value;
        axios.post('http://127.0.0.1:5000/register',JSON.stringify({login, password}))
            .then(res=> {
                setMsg(res.data.msg);

            })
            .catch(err=>{
                setMsg('Ошибка регистрации!')
            })
    }


    return (
        <main>
            <Container>
                <form action="">
                    <h5>Регистрация</h5>
                    <Row>
                        <TextInput
                            ref={loginInputRef}
                            icon={<Icon>login</Icon>}
                            id="TextInput-1"
                            label="Логин:"
                            s={12}
                        />
                        <TextInput
                            ref={passwordInputRef}
                            icon={<Icon>password</Icon>}
                            id="TextInput-2"
                            label="Пароль:"
                            password
                            s={12}
                        />
                        <TextInput
                            icon={<Icon>password</Icon>}
                            id="TextInput-3"
                            label="Повторите пароль:"
                            password
                            s={12}
                        />
                        <Row>
                            <Col s={6}>
                                <Button
                                    large
                                    node="a"
                                    style={{
                                        marginRight: '5px'
                                    }}
                                    waves="light"
                                    onClick={register}
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

export default Register;