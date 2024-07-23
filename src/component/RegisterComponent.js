import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, addUsers } from "../features/userSlice";
import { useEffect, useState } from "react";
import '../styles/register.css'
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [user, setUser] = useState({ email: "", username: "", password: "", confirmPassword: "", name: { firstname: "", lastname: "" }, address: { street: "", number: "", zip: "" }, phone: "" });
    const [errors, setErrors] = useState({ email: "", username: "", password: "", confirmPassword: "", name: { firstname: "", lastname: "" }, address: { street: "", number: "", zip: "" }, phone: "" });
    const [submitted, setSubmitted] = useState(false);
    const [users, setUsers] = useState([]);
    //let users = useSelector(state => state.users.value);
    const [registerMessage, setRegisterMessage] = useState("");
    useEffect(() => {
        getAllUsers();
    }, [])
    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/getAllUsers')
            setUsers(response.data);
            dispatch(addUsers(response.data))
        } catch (err) {
            console.log(err)
        }
    }
    const submitForm = (event) => {
        event.preventDefault()
        // Object.keys(user).map((key)=>{
        //     if(key=='name'){
        //         Object.keys(user['name']).map((n)=>validateForm(n,user['name'].n))
        //     }else if(key=='address'){
        //         Object.keys(user['address']).map((a)=>validateForm(a,user['address'].a))
        //     }else{
        //         validateForm(key,user['key'])
        //     }
        // })
        // if(user['name'].firstname==''||user['name'].lastname==''||user['address'].number==''||user['address'].street==''||user['address'].zip==''||user['username']==''||user['password']==''||user['confirmPassword']==''||user['email']==''||user['phone']==''){

        // }
        validateForm('firstname', user['name'].firstname);
        validateForm('lastname', user['name'].lastname);
        validateForm('email', user['email']);
        validateForm('password', user['password']);
        validateForm('confirmPassword', user['confirmPassword']);
        validateForm('phone', user['phone']);
        validateForm('number', user['address'].number);
        validateForm('street', user['address'].street);
        validateForm('zip', user['address'].zip);
        console.log(users)
        try{
            const maxId = users.reduce((max, obj) => obj.id > max ? obj.id : max, users[0].id);
        console.log(maxId);
        user['id'] = maxId + 1;
        // setUser({...user,['id']:maxId+1})
        dispatch(addNewUser(user))
        console.log(users)
        postData()
        }catch(err){
            console.log(err);
            navigate('/errorPage')
        }
        
    }
    const validateForm = (key, val) => {
        switch (key) {
            case "firstname": if (val == "") {
                errors.name.firstname = "First Name is required"
            }
            else if (val.length > 20) {
                errors.name.firstname = "First name cannot exceed 20 characters"
            }
            else if (!/[A-Za-z]/.test(val)) {
                errors.name.firstname = "First name must contain only letters"
            } else {
                errors.name.firstname = "";
            }
                break;
            case "lastname": if (val == "") {
                errors.name.lastname = "Last Name is required"
            }
            else if (val.length > 20) {
                errors.name.lastname = "Last name cannot exceed 20 characters"
            }
            else if (!/[A-Za-z]/.test(val)) {
                errors.name.lastname = "Last name must contain only letters"
            } else {
                errors.name.lastname = "";
            }
                break;
            case "email": if (val == "") {
                errors.email = "Email Id is required";
            }
            else if (!val.match("[A-Za-z0-9.#$%^_]+@[a-z]+\.[a-z]{2,3}")) {
                errors.email = "Please enter a valid email id";
            } else {
                errors.email = ""
            }
                break;
            case "username": if (val == "") {
                errors.username = "Username is required";
            }
            else if (val.length < 6) {
                errors.username = "Username must be at least 6 characters long";
            } else {
                errors.username = "";
            }
                break;
            case "password": if (val == "") {
                errors.password = "Password is required"
            } else if (!(/[A-Z]/.test(val))) {
                errors.password = "Password must contain one Uppercase letter"
            } else if (!(/[a-z]/).test(val)) {
                errors.password = "Password must contain one Lowercase letter"
            } else if (!(/[0-9]/).test(val)) {
                errors.password = "Password must contain one Digit"
            } else if (!(/[!@#$%^&*_]/).test(val)) {
                errors.password = "Password must contain one Special Character"
            } else {
                errors.password = "";
            }
                break;
            case "confirmPassword": if (user.password != val) {
                errors.confirmPassword = "Passwords does not match"
            } else if (val == "") {
                errors.confirmPassword = "Please re enter to confirm your password"
            }
            else {
                errors.confirmPassword = ""
            }
                break;
            case "number": if (val == "") {
                errors.address.number = "House number is required";
            }
            else if (!(/[0-9]/).test(val)) {
                errors.address.number = "House number must contain only digits";
            } else {
                errors.address.number = "";
            }
                break;
            case "street": if (val == "") {
                errors.address.street = "Street name is required";
            } else {
                errors.address.street = "";
            }
                break;
            case "zip": if (val == "") {
                errors.address.zip = "Zip code is required";
            }
            else if (!val.match("^[0-9]+$")) {
                errors.address.zip = "Zip code must contain only digits";
            } else {
                errors.address.zip = ""
            }
                break;
            case "phone": if (val == "") {
                errors.phone = "Phone is required";
            }
            else if (!val.match("^[0-9]+$")) {
                errors.phone = "Phone must contain only digits";
            } else {
                errors.phone = ""
            }
        }
    }
    // let errors = {};
    const postData = async () => {
        try {
            const response = await axios.post('http://localhost:8080/user/register', user);
            console.log(response);
            if (response.status == 201) {
                setSubmitted(true);

            }
            else {
                setSubmitted(false);
            }
            setRegisterMessage(response.data.message);
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (event) => {
        let name = event.target.name;
        const val = event.target.value;
        if (name == 'firstname' || name == 'lastname') {
            setUser({ ...user, name: { ...user.name, [name]: val } })
            console.log(user);
        }
        else if (name.includes('address')) {
            name = name.substring(8);
            setUser({ ...user, address: { ...user.address, [name]: val } })
            console.log(user);
        } else {
            setUser({ ...user, [name]: val })
            console.log(user);
        }
        validateForm(name, val)
    }
    return (
        <div className="outer-container" style={{ backgroundImage: "url('https://imageio.forbes.com/specials-images/imageserve/65e5dac327cf50fae0984ff2/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds')", backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%', height: '100vh' }}>
            <div className="container inner-container" style={{ position: 'absolute', top: '0.5%', left: '25%', borderRadius: '5px', width: '50%', height: '99%', padding: 0 }}>
                <div className="container text-center" style={{ borderBottom: '1px solid black' }} >
                    <h1>Register</h1>
                </div>
                <div className="container register-container">
                    <form>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <input type="text" placeholder="First Name" className="form-control" name="firstname" onChange={handleChange} required />
                                {<p className="error-text">{errors.name.firstname}</p>}
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="Last Name" className="form-control" name="lastname" onChange={handleChange} required />
                                {<p className="error-text">{errors.name.lastname}</p>}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-12">
                                <input type="text" placeholder="Email" className="form-control" name="email" onChange={handleChange} required />
                                {<p className="error-text">{errors.email}</p>}
                            </div>
                        </div>
                        {/* <div className="row mt-1">
                        <div className="col-md-12">
                            <input type="text" placeholder="Username" className="form-control" name="username" onChange={handleChange} required/>
                            {<p className="error-text">{errors.username}</p>}
                        </div>
                    </div> */}
                        <div className="row mt-1">
                            <div className="col-md-12">
                                <input type="password" placeholder="Password" className="form-control" name="password" onChange={handleChange} required />
                                {<p className="error-text">{errors.password}</p>}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-12">
                                <input type="password" placeholder="Confirm Password" className="form-control" name="confirmPassword" onChange={handleChange} required />
                                {<p className="error-text">{errors.confirmPassword}</p>}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <h6><u>Address details</u></h6>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Street name" className="form-control" name="address_street" onChange={handleChange} required />
                                {<p className="error-text">{errors.address.street}</p>}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-6">
                                <input type="text" placeholder="House number" className="form-control" name="address_number" onChange={handleChange} required />
                                {<p className="error-text">{errors.address.number}</p>}
                            </div>
                            <div className="col-md-6">
                                <input type="text" placeholder="Zip Code" className="form-control" name="address_zip" onChange={handleChange} required />
                                {<p className="error-text">{errors.address.zip}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <h6><u>Contact details</u></h6>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <input type="text" placeholder="Phone number" className="form-control" name="phone" onChange={handleChange} required />
                                {<p className="error-text">{errors.phone}</p>}
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-md-12">
                                <button className="btn btn-success" onClick={submitForm}>Submit</button>
                            </div>
                        </div>
                    </form>
                    {submitted && <div className="row mt-1">
                        <div className="col-md-12">
                            {registerMessage=="Some fields has errors" ? (<>
                                <div class="alert alert-danger" role="alert">
                                {/* {displayLoginResult(loginResult)} */}
                                {registerMessage}
                            </div>
                            </>):(<>
                                <div class="alert alert-success" role="alert">
                                {/* {displayLoginResult(loginResult)} */}
                                {registerMessage}
                                <br />A confirmation email has been sent to your registered email Id. Please check inbox or spam.
                            </div>
                            <Link to='/login'><button className="btn btn-primary">Go to Login</button></Link>
                            </>)}
                            

                        </div>
                    </div>}

                </div>

            </div>
        </div>
    )
}

export default RegisterComponent