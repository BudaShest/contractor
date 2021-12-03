import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import Auth from '../pages/Auth/Auth';
import Create from "../pages/Create/Create";
import Main from '../pages/Main/Main';
import NotFound from '../pages/NotFound/NotFound';
import Register from '../pages/Register/Register';
import MyLinks from '../pages/MyLinks/MyLinks';
import LinkNotFounded from "../pages/LinkNotFounded/LinkNotFounded";

const MainRouter = () => {
    return (
        <div>
            <Routes>
                <Route path="/auth">
                    <Route index element={<Auth/>}/>
                    <Route path=":short_url" element={<Auth/>}/>
                </Route>
                <Route path="/create" element={<Create/>}/>
                <Route path="/" element={<Main/>}/>
                <Route path="/not-found" element={<NotFound/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/my-links" element={<MyLinks/>}/>
                <Route path="/error" element={<LinkNotFounded/>}/>
                <Route path="*" element={<LinkNotFounded/>}/>
            </Routes>
        </div>
    );
};

export default MainRouter;