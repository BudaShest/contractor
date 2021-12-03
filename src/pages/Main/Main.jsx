import React from 'react';
import {Container, Row, Col} from "react-materialize";
import style from './Main.module.css';

const Main = () => {
    console.log(style.scissorsImg);
    return (
        <main>
            <Container>
                <Row>
                    <Col s={6}>
                        <h1>Великий сокращатель</h1>
                        <p>Начните сокращать ссылки вместе с Великий сокращатель уже сейчас!</p>
                    </Col>
                    <Col s={6}>
                        <img className={style.scissorsImg} src="https://www.clipartmax.com/png/full/111-1110040_scissor-clipart-craft-open-scissors-clipart.png" alt=""/>
                    </Col>
                </Row>
            </Container>
        </main>
    );
};

export default Main;