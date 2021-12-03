//Форма логина TODO Depricated
//const loginForm = document.forms.loginForm;
//var authToken = ""

//if (loginForm){
//    loginForm.addEventListener('submit', function (e){
//        e.preventDefault();
//        const login = loginForm.login.value;
//        const password = loginForm.password.value;
//
        // const body = JSON.stringify({login, password});
        // let fData = new FormData()
        // fData.set("login", login);
        // fData.set("password",password)
        // console.log(JSON.stringify({login,password}))
        // console.log(body)
//        fetch('http://127.0.0.1:5000/login',{dataType:"JSON",body:JSON.stringify({login,password}), method:"post", mode:"no-cors", headers:{"Content-Type":"application/json"}})
//            .then(res=>res.json())
//            .then(data=>{
//                if (data.token){
//                    authToken = data.token;
//                }else{
//                    console.log('Ошибка авторизации!')
//                }
//            })
//            .catch(error=>console.log(error))
//
//        if (authToken){
//            fetch('http://127.0.0.1:5000/main', {mode:"no-cors", redirect:"follow", headers:{"Content-Type":"application/json", "Authorization":`Bearer ${authToken}`}})
//                .then(response => {
//                    response.headers['Authorization'] = `Bearer ${authToken}`
//                    window.location.href = response.url;
//                })
//                .catch(function(err) {
//                    console.info(err + " url: " + url);
//                });
//        }
//    });
//}

//Форма регистрации


//const registerForm = document.forms.registerForm;
//
//if(registerForm){
//    registerForm.addEventListener('submit', function(e){
//        e.preventDefault();
//        const login = registerForm.login.value;
//        const password = registerForm.password.value;
//        const confirmPassword = registerForm.confirmPassword.value;
//
//        fetch('http://127.0.0.1:5000/register',{body:JSON.stringify({login, password}), method: "post", mode:"no-cors", headers:{"Content-Type":"application/json"}})
//            .then(res=>res.json())
//            .then(data=>console.log(data))
//            .catch(error=>console.log(error))
//    })
//}
//

