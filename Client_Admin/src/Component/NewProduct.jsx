import { useState } from "react";
import { itemCategory } from "../Utils/Elements";
import Sidebar from "./Sidebar";

function NewProduct() {
  const [imageURL, setImageUrl] = useState(null);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

        <div className="mt-10">
          <section className="flex bg-gray-200 p-5 rounded-md shadow-xl flex-col pr-20 w-1/2">
            <label htmlFor="title" className="mb-1 text-xl font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full bg-white py-2 px-5 rounded-md outline-none"
              placeholder="Enter Product Name"
            />

            <label
              htmlFor="description"
              className="mt-5 mb-1 text-xl font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter Product Description"
              rows={4}
              className="bg-white outline-none rounded-md p-3"
            ></textarea>

            <label htmlFor="category" className="mt-5 mb-1 text-xl font-medium">
              Category
            </label>
            <select
              id="category"
              className="p-2 rounded-md outline-none bg-white w-1/2"
            >
              <option value="">Select Category</option>
              {itemCategory.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <label htmlFor="location" className="mt-5 mb-1 text-xl font-medium">
              Location Found
            </label>
            <textarea
              id="location"
              placeholder="Enter the location where the product found"
              className="bg-white outline-none rounded-md p-3"
            ></textarea>

            <label
              htmlFor="image"
              className="
                flex flex-col items-center justify-center mt-5
                w-full cursor-pointer rounded-2xl border-2 border-dashed
                border-gray-300 bg-gray-50 hover:bg-gray-100 transition
                p-6 text-center
              "
            >
              {imageURL ? (
                <img
                  src={imageURL}
                  alt="Uploaded preview"
                  className="rounded-xl shadow-md object-cover max-h-60"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6.1a5.002 5.002 0 01-.9 9.9H7z"
                      />
                    </svg>
                  </div>

                  <p className="font-semibold text-gray-700 text-lg">
                    Upload Image
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to select a file
                  </p>
                </div>
              )}
            </label>
            <input type="file" id="image" className="hidden" />
          </section>
          <section></section>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
