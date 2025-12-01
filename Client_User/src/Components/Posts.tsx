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
      <main className="p-5 flex flex-wrap gap-5 justify-center mt-4">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              onClick={() => selectItem(item)}
              key={item._id}
              className="bg-white w-full sm:w-[45%] lg:w-[30%] rounded-xl shadow hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold text-indigo-800">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Lost at: {item?.createdAt.split("T")[0]}
                  </p>
                </div>

                <p className="mt-2 text-gray-700">
                  {item.description.length < 80
                    ? item.description
                    : `${item.description.slice(0, 80)}...`}
                </p>
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
