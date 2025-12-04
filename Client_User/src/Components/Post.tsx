import { useNavigate } from "react-router-dom";
import useItemStore from "../Store/ItemStore"
import { FaLongArrowAltLeft } from "react-icons/fa";

function Post() {
    const { item } = useItemStore();
    const navigate = useNavigate();
    return (
        <div className="p-5">
            <button 
            onClick={() => navigate("/products")}
            className="p-3 rounded-full shadow-2xl bg-gray-200">
                <FaLongArrowAltLeft />
            </button>
            {!item ? <p>Loading...</p> : 
            <main className="py-5">
                <img src={item.image} alt="" className="rounded-lg w-full" />
                <p className="mt-1 text-slate-300 bg-gray-600 py-2 rounded-full px-5 inline-block">{item?.category}</p>

                <p className="mt-5 text-xl font-bold">{item?.title}</p>
                <p className="text-gray-700 text-lg mt-2">{item?.description}</p>

                <p className="mt-3 text-lg">
                    <span className="font-medium underline mr-2">Location: </span>
                    {item?.location}
                </p>

                <p className="mt-3 text-lg">
                    <span className="font-medium underline mr-2">Found Date: </span>
                    {item?.createdAt.split("T")[0]}
                </p>

                <button
                onClick={() => navigate("/claim")}
                className="mt-10 py-3 w-full bg-blue-600 text-white font-semibold rounded-full"
                >
                    CLAIM
                </button>

                <div className="mt-10">
                    <p className="underline text-xl font-semibold">POSTED BY</p>
                    <div className="flex flex-row gap-3 mt-5">
                        <img src={item?.post_by?.image} alt="" className="w-20 h-20 object-cover rounded-full mt-3" />
                        <div className="mt-2">
                            <p className="text-lg font-semibold">{item?.post_by?.name}</p>
                            <p>Email Address: {item?.post_by?.email}</p>
                            <p>Phone Number: {item?.post_by?.phone}</p>
                        </div>
                    </div>
                </div>
            </main>}
        </div>
    )
}

export default Post
