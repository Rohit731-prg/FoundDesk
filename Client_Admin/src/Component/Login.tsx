import Lottie from "lottie-react"
import loginJson from "../assets/Login.json";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoLockClosedSharp } from "react-icons/io5";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

function Login() {
  // const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const [lock, setLock] = useState(false);
  return (
    <div className="flex flex-row min-h-screen">
      <section className="w-1/2 p-20">
        <Lottie animationData={loginJson} loop={true} />
      </section>
      <section>
        <p>Welcome Back</p>
        <p>Please Login To Continue</p>

        <form className="">
          <label htmlFor="email">Email</label>
          <div>
            <p><MdEmail /></p>
            <input
            value={loginDetails.email}
            onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })}
            placeholder="Enter "
            type="text" />
          </div>

          <label htmlFor="email">Password</label>
          <div>
            <div>
              <p><IoLockClosedSharp /></p>
              <input type={lock ? "password" : "text"} />
            </div>
            <button type="button" onClick={() => setLock(!lock)}>
                {lock ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login