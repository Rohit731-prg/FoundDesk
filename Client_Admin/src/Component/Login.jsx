import React, { useState } from 'react'
import { Toaster } from "sonner";
import { login } from "../store/AdminSlice";

function Login() {
    
    const [adminDetails, setAdminDetails] = useState({
        email: "",
        password: ""
    });

    const loginFunction = async (e) => {
        e.preventDefault();
        await login(adminDetails)
    }
  return (
    <div>
        <main>
            <form onSubmit={loginFunction}>
                <input 
                placeholder='Enter Email'
                value={adminDetails?.email}
                onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value})}
                type="email" required />
                <input
                value={adminDetails?.password}
                onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value})}
                type="password" required />

                <button type='submit'>
                    SUBMIT
                </button>
            </form>
        </main>

        <Toaster />
    </div>
  )
}

export default Login