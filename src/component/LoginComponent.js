import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUsers, setLoggedIn } from "../features/userSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'

const LoginComponent = () => {
    const users = useSelector(state => state.users.value);
    const navigate = useNavigate();
    const [loginResult, setLoginResult] = useState(0);
    const [loginMessage,setLoginMessage] = useState("");
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();
    useEffect(() => {
        getData();

    }, [])
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/getAllUsers')
            dispatch(addUsers(response.data))
        } catch (err) {
            console.log(err);
        }

    }
    const validateUsername = (val) => {
        if (val == "") {
            errors.username = "Username is required";
        } else {
            errors.username = "";
        }
    }
    const validatePassword = (val) => {
        if (val == '') {
            errors.password = "Password is required";
        }
        else {
            errors.password = "";
        }
    }
    const handleChange = (event) => {
        const n = event.target.name;
        const v = event.target.value;
        setInputs({ ...inputs, [n]: v })
        console.log(inputs)
        if (n == 'username') {
            validateUsername(v);
        } else {
            validatePassword(v);
        }
    }
    const handleSubmit = async () => {
        const inputUsername = inputs.username;
        const inputPassword = inputs.password;
        const getCorrectUser = users.filter((u) => u.username == inputUsername);
        console.log(getCorrectUser);
        console.log(inputUsername + " " + inputPassword)
        // if (getCorrectUser.length == 0) {
        //     if(inputs.username==""){
        //         setLoginResult(1)
        //     }else{
        //         setLoginResult(2);
        //     }
            
        // } else if (getCorrectUser.length > 0 && getCorrectUser[0].password != inputPassword) {
        //     if(inputs.password==""){
        //         setLoginResult(3);
        //     }else{
        //         setLoginResult(4);
        //     }
        // } else {
        //     setLoginResult(5);
        //     dispatch(setLoggedIn(getCorrectUser))
        //     navigate('/register')
        // }
        
        const res = await axios.post('http://localhost:8080/user/login',inputs);
        setLoginResult(res.data.result);
        setLoginMessage(res.data.message);
        
        console.log(res);
        console.log(loginMessage);
        console.log(loginResult);
        if(res.data.result==5){
            console.log("Logged in");
            localStorage.setItem("token",res.data.token);
            dispatch(setLoggedIn(res.data.user));
            navigate('/')
        }
    }
    const displayLoginResult = (res) => {
        switch (res) {
            // case 1: return (<div className="container" style={{ color: 'red', border: '1px solid grey',height:'100px' }}>
            //     <h4 style={{ position: 'absolute', left: '15%' }}>This username does not exist</h4>
            // </div>);

            // case 2: return (<div className="container" style={{ color: 'red', border: '1px solid grey',height:'100px' }}>
            //     <h4 style={{ position: 'absolute', left: '15%' }}>You have entered wrong password</h4>
            // </div>);
            case 1: return (
                <>{loginMessage}</>
            )
            case 2: return (
                <>This username does not exist</>
            )
            case 3: return(
                <>Password is required</>
            )
            case 4: return(
                <>The password is incorrect</>
            )
        }
    }
    return (
        // <div className="outer-container" style={{ backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/65e5dac327cf50fae0984ff2/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds')", backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: '100vh' }}>
        <div className="outer-container" style={{ backgroundImage: "url('https://virtualbackgrounds.site/wp-content/uploads/2021/02/womens-clothing-store.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: '100vh' }}>

            <div className="container inner-container" style={{ position: 'absolute', top: '25%', left: '20%', border: '1px solid gray', borderRadius: '5px', width: '50%', height: '60%', padding: 0 }}>
                <div className="container text-center" style={{ borderBottom: '1px solid black' }} >
                    <img src="./logo.png" height='25%' width='25%'/>
                </div>
                <div className="row" style={{ borderBottom: '1px solid black' }}>
                    <div className="col-md-6" style={{ borderRight: '1px solid black' }}>
                        {/* <img src="https://tse4.mm.bing.net/th/id/OIP.oSAp0O37n-Rrlxz6KzkwrwHaGh?rs=1&pid=ImgDetMain" alt="Shopping Image"/> */
                        }
                        {/* <img src="https://img.freepik.com/premium-vector/woman-character-buying-something-online-illustration-useable-both-ios-web_1019334-5.jpg" alt="Shopping Image" height='80%' width='100%'/> */}
                        <img src='./login.png' alt="Shopping Image" height='80%' width='100%' mt-4 />
                    </div>
                    <div className="col-md-6" style={{ borderLeft: '1px solid black' }}>
                        <div className="container loginContainer">
                            <input type="text" name="username" placeholder="Enter Email Id" className="form-control" onChange={handleChange} required tabIndex={0} style={{border:'1px solid #acabab'}}/>
                            <p style={{ color: 'red' }}>{errors.username}</p>
                            <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} required tabIndex={0} style={{border:'1px solid #acabab'}}/>
                            <p style={{ color: 'red' }}>{errors.password}</p>
                            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                            <div className="row p-2">
                                {(loginResult>0 && loginResult<5) &&
                                <div class="alert alert-danger" role="alert">
                                    {/* {displayLoginResult(loginResult)} */}
                                    {loginMessage}
                                    </div>
                                }     
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center mt-2">
                    <Link to="/register"><p>New User? Register Here</p></Link>
                </div>

            </div>
        </div>


    )
}
export default LoginComponent;