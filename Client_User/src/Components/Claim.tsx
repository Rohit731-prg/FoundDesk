import useClaimStore from "../Store/ClaimStore";
import useItemStore from "../Store/ItemStore";
import { useState, type ChangeEvent } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { RequestClaimInterface } from "../Utils/interfaces";
import { Toaster } from "sonner";

function Claim() {
  const navigate = useNavigate();
  const { item } = useItemStore();
  const { requestClaim } = useClaimStore();

  const [claimDetails, setClaimDetails] = useState<RequestClaimInterface>({
    item_id: item?._id as string,
    proof: null,
  });

  // Handle form submit
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await requestClaim(claimDetails);
    if (result) {
      console.log(result)
    }
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <button
        onClick={() => navigate("/product")}
        className="flex items-center gap-2 text-gray-600 hover:text-black"
      >
        <FaLongArrowAltLeft />
        Back
      </button>

      <p className="mt-4 text-xl font-medium">
        Upload any proof image for claiming the product
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <p className="font-medium mb-4">
          You are claiming for{" "}
          <span className="text-blue-500">{item?.title}</span>
        </p>

        <label htmlFor="image">
          {claimDetails.proof ? (
            <div className="border rounded-xl p-4 text-center">
              <img src={URL.createObjectURL(claimDetails.proof)} alt="" />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-2 border border-dashed border-gray-400 p-10 rounded-xl cursor-pointer hover:bg-gray-50">
              <p className="font-medium">Upload Image</p>
              <p className="text-sm text-gray-500">PNG / JPG only</p>
            </div>
          )}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;

            setClaimDetails((prev) => ({
              ...prev,
              proof: file,
            }));
          }}
          className="hidden"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-full mt-8 hover:bg-blue-600 transition"
        >
          CLAIM CONFIRM
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default Claim;
