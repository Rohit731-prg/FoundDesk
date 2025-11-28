import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PasswordChange() {
    const navigate = useNavigate();
  return (
    <div className="p-5">
        <button onClick={() => navigate('/setting')}>
            <FaLongArrowAltLeft />
        </button>
        <main className="flex flex-col items-center">
            <p className="text-lg font-medium">User Profile</p>

            <form className="mt-20 flex flex-col w-full px-5">
                <label htmlFor="old_password" className="text-xl font-semibold mb-3">Old Password</label>
                <input 
                type="password" 
                id="old_password" 
                placeholder="Enter the password"
                className="w-full bg-gray-300 rounded-xl px-5 py-3" />

                <label htmlFor="new_password" className="text-xl font-semibold mb-3 mt-5">New Password</label>
                <input 
                type="password"
                placeholder="Enter the new password"
                className="w-full bg-gray-300 rounded-xl px-5 py-3" 
                id="new_password" />

                <button
                className="mt-10 w-full py-3 bg-blue-400 font-semibold text-white rounded-full"
                type="submit"
                >
                    SUBMIT
                </button>
            </form>
        </main>
    </div>
  )
}

export default PasswordChange