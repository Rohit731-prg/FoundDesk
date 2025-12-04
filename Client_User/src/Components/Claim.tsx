import useItemStore from "../Store/ItemStore";
import { useState, type ChangeEvent } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

function Claim() {
    const navigate = useNavigate();
    const { item } = useItemStore();
    const [imageDetails, setImageDetails] = useState<null | File>(null);

    const formateImage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();


    }
  return (
    <div className="p-5">
      <button onClick={() => navigate("/product")}>
        <FaLongArrowAltLeft />
      </button>

      <p className="mt-3 text-xl font-medium">Upload any proof image for claimimg the product..</p>

      <form action="">
            <p className="mt-2 font-medium">You are claiming for {item?.title}</p>
            <label htmlFor="image">
                {imageDetails ? (
                    <div></div>
                ): (
                    <div className="w-full flex flex-col items-center justify-center gap-3 border border-dashed border-black mt-20 p-5 rounded-xl">
                        <p>Upload Image</p>
                        <p>Image should be PNG/JPG</p>
                    </div>
                )}
            </label>
            <input
            id="image"
            onChange={(e) => formateImage(e)}
            accept="image/*"
            className="hidden"
            type="file" />

            <button
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-full mt-10"
            >
                CLAIM CONFIRM
            </button>
      </form>
    </div>
  );
}

export default Claim;
