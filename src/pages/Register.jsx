import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

// global context and useNavigate later

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: false,
    user: null,
    token: null,
    userLocation: ''
};
// if possible prefer local state
// global state

export default function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState);
    const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } = useAppContext();

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, password, isMember } = values;

        if (!name || !password) {
            displayAlert()
            return
        }
        const currentUser = { username: name, password }
        if (isMember) {
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }
    };

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    }, [user, navigate]);

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? 'Login' : 'Register'}</h3>

                {showAlert && <Alert />}

                <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />

                <button type='submit' className='btn btn-block' disabled={isLoading}>
                    submit
                </button>
                <p>
                    {values.isMember ? 'Not a member yet?' : 'Already a member?'}

                    <button type='button' onClick={toggleMember} className='member-btn'>
                        {values.isMember ? 'Register' : 'Login'}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}
