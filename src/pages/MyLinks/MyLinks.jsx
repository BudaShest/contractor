import React,{useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Container, Row,Col,Card,Icon} from "react-materialize";
import style from './MyLinks.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const rights = ["","Публчиная", "Приватная", "Частная"];

const MyLinks = () => {
    const [myLinks, setLinks] = useState([]);
    const navigate = useNavigate();
    const token = useSelector(state =>{
        let userInfo = state.auth.authorizedUser;
        if (!userInfo){
            setTimeout(()=>{
                navigate('/auth');
            },0)
            return "";
        }
        return userInfo.token;
    });


    useEffect(() => {


        axios.get('http://127.0.0.1:5000/my-links', {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => setLinks(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteLink = (shortLink)=>{
        axios.get("http://localhost:5000/my-links/delete/" + shortLink, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res=>{
                console.log(res);
                setLinks(myLinks.filter(myLink=>myLink[0] != shortLink))
            })
            .catch(err=>console.log(err))
    }

    function setBadgeActive(e){
        document.querySelectorAll('.filter-badge').forEach(item=>item.classList.remove(style.filterBadgeActive))
        e.currentTarget.classList.toggle(style.filterBadgeActive);
    }


    return (
        <main>
            <Container className={style.linksContainer}>
                <div className={`f_row ${style.filterRow}`}>
                    <div onClick={setBadgeActive} className={`filter-badge hoverable ${style.filterBadge}`}>Все</div>
                    <div onClick={setBadgeActive} className={`filter-badge hoverable ${style.filterBadge}`}>Публичные</div>
                    <div onClick={setBadgeActive} className={`filter-badge hoverable ${style.filterBadge}`}>Частные</div>
                    <div onClick={setBadgeActive} className={`filter-badge hoverable ${style.filterBadge}`}>Приватные</div>
                </div>
                <Row>
                    {
                        myLinks.map(myLink => {
                            return (
                                <Col
                                    s={12}
                                >
                                    <Card
                                        actions={[
                                            <a key="1" target="_blank" href={myLink[1]}>Протестировать</a>,
                                            <a key="2" href="#" onClick={()=>deleteLink(myLink[0])}>Удалить</a>
                                        ]}
                                        className="blue-grey darken-1"
                                        closeIcon={<Icon>close</Icon>}
                                        revealIcon={<Icon>more_vert</Icon>}
                                        textClassName="white-text"
                                        title={myLink[2]}
                                    >
                                        <table>
                                            <tbody>
                                            <tr>
                                                <th>Оригинальное url:</th>
                                                <td>{myLink[1]}</td>
                                            </tr>
                                            <tr>
                                                <th>Короткое url:</th>
                                                <td>{myLink[0]}</td>
                                            </tr>
                                            <tr>
                                                <th>Права доступа:</th>
                                                <td>{rights[myLink[3]]}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </main>
    );
};

export default MyLinks;