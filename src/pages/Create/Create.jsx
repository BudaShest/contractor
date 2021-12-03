import React,{useRef, useState} from 'react';
import {Button, Col, Container, Icon, Row, TextInput, Select} from "react-materialize";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Create = () => {
    const urlInputRef = useRef();
    const shortnameInputRef = useRef();
    const [selectValue, setSelectValue] = useState(0);
    const [serverMsg, setMsg] = useState("");
    const navigate = useNavigate();

    const token = useSelector(state => {
        let userInfo = state.auth.authorizedUser;
        if (!userInfo){
            setTimeout(()=>{
                navigate('/auth');
            },0)
            return "";
        }
        return userInfo.token;
    });

    const createLink = ()=>{
        const url = urlInputRef.current.value;
        const shortname = shortnameInputRef.current.value;



        const linkObj = {
            "orig_url":url,
            "text_url":shortname,
            "right_id":selectValue,
        }

        axios.post('http://127.0.0.1:5000/create',JSON.stringify(linkObj), {headers:{"Authorization": `Bearer ${token}`}})
            .then(res=> {
                console.log(res);
                setMsg(res.data.msg);

            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <main>
            <Container>
                <form action="">
                    <h5>Создание ссылки</h5>
                    <Row>
                        <TextInput
                            ref={urlInputRef}
                            icon={<Icon>link</Icon>} id="TextInput-100" label="URL:" s={12}
                        />
                        <TextInput
                            ref={shortnameInputRef}
                            icon={<Icon>badge</Icon>} id="TextInput-101" label="Текствовый псевдоним:" s={12}
                        />
                        <Select
                            onChange={(e)=>setSelectValue(e.target.value)}
                            s={12}
                            icon={<Icon>cloud</Icon>}
                            id="Select-15"
                            multiple={false}
                            options={{
                                classes: '',
                                dropdownOptions: {
                                    alignment: 'left',
                                    autoTrigger: true,
                                    closeOnClick: true,
                                    constrainWidth: true,
                                    coverTrigger: true,
                                    hover: false,
                                    inDuration: 150,
                                    outDuration: 250
                                }
                            }}
                            value=""
                        >
                            <option
                                disabled
                                value=""
                            >
                                Тип ссылки
                            </option>
                            <option value="1">
                                Публичная
                            </option>
                            <option value="2">
                                Приватная
                            </option>
                            <option value="3">
                                Частная
                            </option>
                        </Select>
                        <Row>
                            <Col s={6}>
                                <Button onClick={createLink} large node="a" style={{marginRight: '5px'}} waves="light">ОК</Button>
                            </Col>
                            <Col s={6}>
                                <Button large node="a" style={{marginRight: '5px'}} waves="light">Clear</Button>
                            </Col>
                        </Row>
                        <span></span>
                    </Row>
                </form>
            </Container>
        </main>
    );
};

export default Create;