import { useEffect } from "react";
import useItemStore from "../Store/ItemStore";
import Navbar from "./Navbar";
import { postCategory } from "../Utils/tables";
import type { itemIterface } from "../Utils/interfaces";
import { useNavigate } from "react-router-dom";
import loading from "../assets/loading.json";
import Lottie from "lottie-react";

function Posts() {
  const navigate = useNavigate();
  const { items, getAllItems, setItem, filterItems } = useItemStore();

  useEffect(() => {
    getAllItems();
  }, []);

  const selectItem = (item: itemIterface) => {
    setItem(item);
    navigate("/product");
  };

  const filterItem = async (category: string) => {
    filterItems(category);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      {/* Categories Scroll */}
      <div className="px-5 py-5">
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {postCategory.map((category) => (
              <button
                onClick={() => filterItem(category?.name)}
                key={category.id}
                className="px-4 py-2 rounded-full bg-white text-indigo-700 font-medium shadow hover:bg-indigo-50 whitespace-nowrap transition"
              >
                {category.name}
              </button>
            ))}
          </div>
      </div>
      {/* Posts Section */}
      <main className="p-5 flex flex-col gap-5 justify-center mt-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              onClick={() => selectItem(item)}
              key={item._id}
              className="w-full flex flex-row gap-3 py-3 border-b-2 border-gray-400"
            >
              <img src={item?.image} alt="" className="w-1/2 object-cover h-44 rounded-sm" />
              <div>
                <p className="text-xl font-medium">{item?.title}</p>
                <p className="text-md mb-2">{item?.description.length > 10 ? item?.description.slice(0, 30) + "..." : item?.description}</p>

                <p className="text-lg font-medium">Post on {item?.createdAt.split("T")[0]}</p>
                <p className="text-green-700">{item?.status}</p>

                <button 
                onClick={() => navigate("/post")}
                className="mt-2 bg-blue-600 text-white px-5 py-1 rounded-full">
                  CLAIM
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full min-h-screen flex items-center justify-center">
            <Lottie animationData={loading} loop={true} />
          </div>
        )}
      </main>
    </div>
  );
}

export default Posts;
