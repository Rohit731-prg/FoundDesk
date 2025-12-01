import useUserStore from "../../Store/UserStore";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

function PasswordChange() {
    const { updatePassword } = useUserStore();
    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: ''
    })

    const updatePasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updatePassword(passwords.oldPassword, passwords.newPassword);
    }
  return (
    <div className="p-5">
        <button onClick={() => navigate('/setting')}>
            <FaLongArrowAltLeft />
        </button>
        <main className="flex flex-col items-center">
            <p className="text-lg font-medium">Change Password</p>

            <form className="mt-20 flex flex-col w-full px-5" onSubmit={updatePasswordHandler}>
                <label htmlFor="old_password" className="text-xl font-semibold mb-3">Old Password</label>
                <input 
                value={passwords?.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                type="password" 
                id="old_password" 
                placeholder="Enter the password"
                className="w-full py-3 px-3 border-2 border-gray-400 rounded-full mt-1" />

                <label htmlFor="new_password" className="text-xl font-semibold mb-3 mt-5">New Password</label>
                <input 
                type="password"
                value={passwords?.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                placeholder="Enter the new password"
                className="w-full py-3 px-3 border-2 border-gray-400 rounded-full mt-1" 
                id="new_password" />

                <button
                className="mt-10 w-full py-3 bg-blue-500 font-semibold text-white rounded-full"
                type="submit"
                >
                    SUBMIT
                </button>
            </form>
        </main>
        <Toaster />
    </div>
  )
}

export default PasswordChange