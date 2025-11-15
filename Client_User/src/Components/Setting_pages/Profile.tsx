import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../Store/UserStore";

function Profile() {
    const { user } = useUserStore();
    const navigate = useNavigate();
    const profileData = [
        { id: 1, name: "Name", value: user?.name as string },
        { id: 2, name: "Email", value: user?.email as string },
        { id: 3, name: "Collage Id", value: user?.collage_id as string },
    ];

    if (!user) return <p>Loading...!</p>

    return (
        <div className="p-5">
            <button onClick={() => navigate('/setting')}>
                <FaLongArrowAltLeft />
            </button>
            <main className="flex flex-col items-center">
                <p className="text-lg font-medium">User Profile</p>
                <img src={user.image as string} alt="" className="w-50 h-50 mt-5 rounded-full shadow-xl " />

                <section className="w-full px-10 mt-10">
                    {profileData.map((profile) => (
                        <div key={profile.id} className="mb-2">
                            <p className="text-md font-medium text-gray-400">{profile?.name}</p>
                            <div className="py-3 px-3 border-2 border-gray-400 rounded-full mt-1">
                                <p>{profile?.value}</p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Profile