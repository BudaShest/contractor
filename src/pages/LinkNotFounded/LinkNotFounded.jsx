import React from 'react';
import {Container} from "react-materialize";
import style from './LinkNotFounded.module.css';

const LinkNotFounded = () => {
    return (
        <main>
            <div className={`f_row ${style.notFoundContainer}`}>
                <div className={`f_col ${style.notFoundBlock}`}>
                    <h2>404</h2>
                    <h3>Not founded</h3>
                </div>
            </div>
        </main>
    );
};

export default LinkNotFounded;