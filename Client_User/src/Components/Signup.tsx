import { PiStudentFill } from "react-icons/pi";
import { IoIosArrowBack } from "react-icons/io";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { signUpInterface } from "../Utils/interfaces";
import { MdEmail } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";
import useUserStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";


function Signup() {
  const navigate = useNavigate();
  const { signUp } = useUserStore();
  const [UserDetails, setUserDetails] = useState<signUpInterface>({
    name: "",
    email: "",
    collage_id: "",
    password: "",
    confirm_password: "",
    role: "student",
    auth: false,
    image: null
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = (key: keyof signUpInterface) => (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...UserDetails, [key]: e.target.value });
  }
  const signUpInfo = [
    { id: 1, name: "Name", type: "text", placeholder: "Enter your name", required: true, symbol: PiStudentFill, value: UserDetails.name, onChange: handleChange("name") },
    { id: 2, name: "Email", type: "email", placeholder: "Enter your email", required: true, symbol: MdEmail, value: UserDetails.email, onChange: handleChange("email") },
    { id: 3, name: "collage id", type: "text", placeholder: "Enter your collage id", required: true, symbol: FaIdCard, value: UserDetails.collage_id, onChange: handleChange("collage_id") },
    { id: 4, name: "password", type: "password", placeholder: "Enter your password", required: true, symbol: FaIdCard, value: UserDetails.password, onChange: handleChange("password") },
    { id: 5, name: "confirm password", type: "password", placeholder: "Confirm your password", required: true, symbol: FaIdCard, value: UserDetails.confirm_password, onChange: handleChange("confirm_password") },
  ];

  const updateImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        setUserDetails({ ...UserDetails, image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  const handelSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signUp(UserDetails);
    if (result) navigate('/');
  }
  return (
    <div className="h-screen bg-slate-200 p-10">
      <button
        className="p-2 shadow-xl rounded-full bg-gray-200"
      >
        <IoIosArrowBack />
      </button>
      <header className="text-center">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-md text-gray-600">Create an new account to <br /> get started</p>
      </header>

      <main>
        <form className="mt-10" onSubmit={handelSubmit}>
          {signUpInfo.map((item) => (
            <div key={item.id}
              className="flex flex-row gap-2 p-3 items-center bg-white mb-3 rounded-full">
              <label htmlFor=""><item.symbol /></label>
              <input
                className="border-none outline-none"
                value={item.value}
                onChange={item.onChange}
                placeholder={item.placeholder}
                type={item.type} />
            </div>
          ))}
          <div>
            <label htmlFor="image">
              {UserDetails.image ? (
                <img src={imageUrl as string} alt="" />
              ) : (
                <div className="flex flex-col items-center justify-center my-2 border border-dashed rounded-xl py-5">
                  <p>Upload your image</p>
                  <p className="text-gray-600">File should be less than 1MB</p>
                </div>
              )}
            </label>
            <input type="file" required id="image" className="hidden" onChange={(e) => updateImage(e)} />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 rounded-full text-white my-3">
            SUBMIT
          </button>
        </form>
      </main>

      <footer className="flex items-center justify-center mt-5 flex-col">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row">
            {Array(20).fill(0).map((_, index) => (
              <p key={index}>-</p>
            ))}
          </div>
            <p>X</p>
          <div className="flex flex-row">
            {Array(20).fill(0).map((_, index) => (
              <p key={index}>-</p>
            ))}
          </div>
        </div>
        
        <div>
          <p className="">Alredy have an account ? <span onClick={() => navigate("/")} className="text-green-400">Login</span></p>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}

export default Signup