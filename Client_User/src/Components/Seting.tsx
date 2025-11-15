import useUserStore from "../Store/UserStore"
import { settingList } from "../Utils/tables";
import Navbar from "./Navbar"
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Seting() {
    const navigate = useNavigate();
    const { user, logoutUser } = useUserStore();

    const logout = async () => {
        const result = logoutUser();
        if (!result) return;
        localStorage.removeItem('auth');

    }
    return (
        <div className="p-5">
            <Navbar />

            <main className="mt-10">
                <p className="text-2xl font-semibold">SETTING</p>

                <section className="mt-5 flex flex-row gap-5 items-start border-b border-gray-400 py-5">
                    <img src={user?.image as string} alt="" className="w-20 h-20 rounded-full shadow-xl" />
                    <div className="mt-2">
                        <p className="text-xl font-medium">{user?.name as string}</p>
                        <p className="text-sm text-gray-400">{user?.email as string}</p>
                    </div>
                </section>

                { settingList.map((setting) => (
                    <section key={setting.id} className="py-7 border-b border-gray-300 flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-3">
                            <setting.symbol className="text-2xl text-gray-400" />
                            <p className="text-lg font-medium">{setting.name}</p>
                        </div>
                        <button
                            className="p-3 rounded-full shadow-xl"
                            onClick={() =>navigate(setting.link)}
                        >
                            <IoIosArrowForward />
                        </button>
                    </section>
                ))}

                <button
                    onClick={() => logout()}
                    className="my-10 w-full bg-red-400 py-3 rounded-full shadow-xl text-white font-semibold"
                >
                    LOG OUT
                </button>

                <footer className="w-full bg-gray-300 rounded-md py-10">
                    <p className="text-center">For more information, please call us on</p>
                    <p className="text-center underline mt-1 text-blue-600"><a href="tel:+4733378901">+47 333 78 XXX</a></p>
                </footer>
            </main>
        </div>
    )
}

export default Seting