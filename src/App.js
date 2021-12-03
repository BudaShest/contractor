import {useState, useEffect, Fragment} from "react";
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";
import {Navbar, Footer, Icon, NavItem, Button} from "react-materialize";
import {useSelector} from "react-redux";
import MainRouter from "./router/MainRouter";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";


function App() {
    const [isAuth, setAuth] = useState(false);
    const userInfo = useSelector(state=>state.auth.authorizedUser);

    useEffect(()=>{
        setAuth(!!userInfo);
        console.log(!!userInfo);
    },[userInfo])

  return (
    <Router>
      <header>
        <Navbar
            alignLinks="right"
            brand={<NavLink className="brand-logo" to="/main">GC</NavLink>}
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            style={{padding:"0 30px"}}
            options={{
              draggable: true,
              edge: 'left',
              inDuration: 250,
              outDuration: 200,
              preventScrolling: true
            }}
        >
            {
                isAuth?"":<NavLink to="/auth">Логин</NavLink>
            }
            {
                isAuth?"":<NavLink to="/register">Регистрация</NavLink>
            }
            {
                isAuth?<NavLink to="/create">Создать ссылку</NavLink>:""
            }
            {
                isAuth?<NavLink to="/my-links">Мои ссылки</NavLink>:""
            }
            {
                isAuth?<Button node="button" style={{marginRight: '5px'}} waves="light">Выйти</Button>:""
            }


        </Navbar>
      </header>
      <MainRouter/>
        <Footer
            copyrights="&copy 2021 Титов Александр"
            links={<ul><li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li><li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li></ul>}
        >
            <h5 className="white-text">
                Великий сокращатель
            </h5>
            <p className="grey-text text-lighten-4">
                Семь раз отрежте, можно и не отмерять.
            </p>
        </Footer>
    </Router>
  );
}

export default App;
