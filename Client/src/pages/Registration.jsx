import './LogIn.css';
import NavBar from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import axios from 'axios';

const Registration = () => {
    const [emailWarning, setEmailWarning] = useState('example@email.com');
    const [phoneWarning, setPhoneWarning] = useState('999999999');
    const [passwordWarning, setPasswordWarning] = useState('example@2025');
    const [confirmPasswordWarning, setConfirmPasswordWarning] = useState('');

    const regData = useRef({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const checkPassword = (password, confirmPassword) => {
        if (password === confirmPassword) {
            setPasswordWarning('example@2025');
            setConfirmPasswordWarning('');
            return true;
        }
        setConfirmPasswordWarning('Password does not match');
        return false;
    };

    const checkEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        const response = re.test(email);
        if (response) {
            setEmailWarning('example@email.com');
            return true;
        }
        setEmailWarning('Invalid email format');
        return false;
    };

    const checkPhone = (phone) => {
        const re = /^\d{10}$/;
        const ph = re.test(phone);
        if (ph) {
            setPhoneWarning('999999999');
            return true;
        }
        setPhoneWarning('Phone number should be 10 digits');
        return false;
    };

    const resetForm = () => {
        // Reset form data and warnings
        regData.current = {
            name: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
        setEmailWarning('example@email.com');
        setPhoneWarning('999999999');
        setPasswordWarning('example@2025');
        setConfirmPasswordWarning('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let isValid = true;

        // Check each field individually
        const isPasswordValid = checkPassword(regData.current.password, regData.current.confirmPassword);
        const isEmailValid = checkEmail(regData.current.email);
        const isPhoneValid = checkPhone(regData.current.phone);

        // If any validation fails, set isValid to false
        if (!isPasswordValid || !isEmailValid || !isPhoneValid) {
            isValid = false;
        }

        if (isValid) {
            axios.post('http://localhost:8080/api/users/signup', {
                name: regData.current.name,
                email: regData.current.email,
                password: regData.current.password,
                phone: regData.current.phone
            })
                .then((response) => {
                    console.log(response);
                    resetForm(); // Reset form after successful submission
                })
                .catch((error) => {
                    console.log(error);
                    alert('Error while submitting form');
                });
        } else {
            alert('Invalid Data');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        regData.current[name] = value;
    };

    return (
        <> 
            <div className="login-container">
                <form action="" className='login-form'>
                    <div className="form-group">
                        <span>Name</span>
                        <input
                            name='name'
                            type="text"
                            placeholder='Vikas' 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <span> {phoneWarning || "Phone NO"}</span>
                        <input
                            name='phone'
                            type="number"
                            placeholder="9999999999"                         
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <span>{emailWarning || "Email"}</span>
                        <input
                            name='email'
                            type="text"
                            placeholder="example@email.com" 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <span>{passwordWarning || "Password" } </span>
                        <input
                            name='password'
                            type="password"
                            placeholder= "Example@2025" 
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <span>
                            {confirmPasswordWarning || "Confirm Password"}
                        </span>
                        <input
                            name='confirmPassword'
                            type="password"
                            placeholder='example@2025' 
                            onChange={handleInputChange}
                        />
                    </div>

                    <button onClick={(e) => handleSubmit(e)}>Register</button>
                    <div className="form-group">
                        <span>Already have an account? <Link to="/Login">Log In</Link></span>
                    </div>
                </form>
            </div> 
        </>
    );
};

export default Registration;
