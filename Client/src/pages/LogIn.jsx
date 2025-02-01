import './LogIn.css';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess, loginFailure } from '../store/userSlice'; // Import actions

const LogIn = () => { 
    const formData = useRef({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { user, loading, error } = useSelector((state) => state.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch loginRequest before making the API call
        dispatch(loginRequest());

        try {
            const response = await axios.post(
                'http://localhost:8080/api/users/signin',
                {
                    email: formData.current.username,
                    password: formData.current.password,
                },
                {
                    withCredentials: true,
                }
            );

            // Dispatch loginSuccess with the user data if login is successful
            dispatch(loginSuccess(response.data.user));

            // Redirect to home or any other page after successful login
            navigate('/');
        } catch (error) {
            // Dispatch loginFailure if the login fails
            dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        formData.current[name] = value;
    };

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <span>User Name</span>
                        <input
                            name="username"
                            type="text"
                            placeholder="example@gmail.com"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <span>Password</span>
                        <input
                            name="password"
                            type="password"
                            placeholder="example@2025"
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>

                    {error && <div className="error">{error}</div>}

                    <div className="form-group">
                        <span>
                            Don't have an account? <Link to="/Registration">New User</Link>
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LogIn;
