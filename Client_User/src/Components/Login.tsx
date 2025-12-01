import { useState, type ChangeEvent, type FormEvent } from "react";
import { IoIosArrowBack } from "react-icons/io"
import type { loginInterface } from "../Utils/interfaces";
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import Lottie from "lottie-react";
import login from "../assets/Login.json";
import useUserStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useUserStore();
  const [userDetails, setUserDetails] = useState<loginInterface>({
    email: "",
    password: ""
  });

  const handleChange = (key: keyof loginInterface) => (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [key]: e.target.value });
  };

  const loginInfo = [
    { id: 1, name: "Email", type: "email", placeholder: "Enter your email", required: true, symbol: MdEmail, value: userDetails.email, onChange: handleChange("email") },
    { id: 2, name: "password", type: "password", placeholder: "Enter your password", required: true, symbol: FaIdCard, value: userDetails.password, onChange: handleChange("password") },
  ];

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await loginUser(userDetails);
    console.log("result");
    if (result) {
      localStorage.setItem('auth', 'true');
      navigate('/home');
    }
  }

  return (
    <div className="h-screen bg-slate-200 p-10">
      <button
        className="p-2 shadow-xl rounded-full bg-gray-200"
      >
        <IoIosArrowBack />
      </button>

      <header className="text-center">
        <h1 className="text-2xl font-semibold">Log in</h1>
        <p className="text-md text-gray-600">Log in to your account</p>
      </header>

      <div>
        <Lottie animationData={login} />
      </div>

      <main>
        <form className="mt-20" onSubmit={handelSubmit}>
          {loginInfo.map((item) => (
            <div className="flex flex-row gap-2 py-3 w-full bg-white mb-5 px-5 items-center rounded-full" key={item.id}>
              <label htmlFor="" className="text-gray-400"><item.symbol /></label>
              <input
              className="border-none outline-none "
              placeholder={item?.placeholder}
              value={item?.value}
              onChange={item?.onChange}
              type={item.type} />
            </div>
          ))}

          <button
          className="bg-blue-500 rounded-full py-3 w-full text-white font-semibold"
          type="submit"
          >
            SUBMIT
          </button>
        </form>

        <footer>
          <p className="text-center my-3">-------------------- OR ------------------</p>
          <p className="text-center">Don't have an account? <span><span onClick={() => navigate("/signup")} className="text-blue-500">Sign up</span></span></p>
        </footer>
      </main>
      <Toaster/>
    </div>
  )
}

export default Login