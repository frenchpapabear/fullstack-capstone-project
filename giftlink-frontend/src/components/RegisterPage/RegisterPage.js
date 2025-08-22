import React, { useState } from 'react';
import {urlConfig} from '../../config';
import { useAppContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './RegisterPage.css';

function RegisterPage() {

    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAppContext();

    //insert code here to create useState hook variables for firstName, lastName, email, password
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // insert code here to create handleRegister function and include console.log
    const handleRegister = async () => {
        try {
            //Step 1: Implement API call
            const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
                
                method: 'POST',//Task 6: Set method
                headers: {
                    'content-type': 'application/json',
                },//Task 7: Set headers
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })//Task 8: Set body to send user details
            });
            //Step 2: Access data, login, set the AuthContext and set user details
            const json = await response.json();
            if (json.authtoken) {
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', firstName);
                sessionStorage.setItem('email', json.email);
                //insert code for setting logged in state
                setIsLoggedIn(true);
                //insert code for navigating to MainPAge
                navigate('/app')
            }

            if (json.error) {
                setShowerr(json.error);
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    }

         return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-6">
                        <div className="register-card p-4 border rounded">
                            <h2 className="text-center mb-4 font-weight-bold">Register</h2>
                            

                    {/* insert code here to create input elements for all the variables - firstName, lastName, email, password */}
                    <div className="mb-4">
                        <label htmlFor="firstName" className="form label"> First Name</label><br/>
                        <input
                        id="firstName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="form label"> Last Name</label><br/>
                        <input
                        id="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Enter your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form label"> eMail</label><br/>
                        <input
                        id="email"
                        type="text"
                        className="form-control"
                        placeholder="Enter your eMail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="text-danger">{showerr}</div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form label"> Password</label><br/>
                        <input
                        id="password"
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* insert code here to create a button that performs the `handleRegister` function on click */}
                    <button className="btn btn-primary w-100 mb-3" onClick={handleRegister}>Register</button>
                        <p className="mt-4 text-center">
                            Already a member? <a href="/app/login" className="text-primary">Login</a>
                        </p>

                         </div>
                    </div>
                </div>
            </div>

         )//end of return
}

export default RegisterPage;