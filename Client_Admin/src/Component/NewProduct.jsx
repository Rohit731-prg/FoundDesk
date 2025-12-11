import { useEffect, useState } from "react";
import { itemCategory } from "../Utils/Elements";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, postNewProduct } from "../store/ProductThunk.js";
import { Toaster } from "sonner";

function NewProduct() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    image: null,
  })
  
  const [imageURL, setImageUrl] = useState(null);
  const convertToStrng = (file) => {
    setProductDetails({ ...productDetails, image: file });
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const fetchProducts = async () => {
    dispatch(getAllProducts());
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewProduct(productDetails));
  }
  useEffect(() => {
    console.log("token value: ", localStorage.getItem("adminToken"));
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-row">
      <Sidebar />

      <div className="p-10 w-full">
        <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

        <div className="mt-10 flex flex-col lg:flex-row gap-10">

          {/* ADD PRODUCT FORM */}
          <section className="bg-gray-200 p-5 rounded-md shadow-xl w-full lg:w-1/2">
            <form className="flex flex-col" onSubmit={handelSubmit}>

              <label htmlFor="title" className="mb-1 text-xl font-medium">Title</label>
              <input
                id="title"
                value={productDetails?.title}
                onChange={(e) => setProductDetails({ ...productDetails, title: e.target.value })}
                type="text"
                className="w-full bg-white py-2 px-5 rounded-md outline-none"
                placeholder="Enter Product Name"
              />

              <label htmlFor="description" className="mt-5 mb-1 text-xl font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={productDetails?.description}
                onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
                placeholder="Enter Product Description"
                rows={4}
                className="bg-white outline-none rounded-md p-3"
              ></textarea>

              <label htmlFor="category" className="mt-5 mb-1 text-xl font-medium">
                Category
              </label>
              <select
                id="category"
                value={productDetails?.category}
                onChange={(e) => setProductDetails({ ...productDetails, category: e.target.value })}
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
                value={productDetails?.location}
                onChange={(e) => setProductDetails({ ...productDetails, location: e.target.value })}
                placeholder="Enter the location where the product found"
                className="bg-white outline-none rounded-md p-3"
              ></textarea>

              {/* IMAGE UPLOAD */}
              <label
                htmlFor="image"
                className="
            flex flex-col items-center justify-center mt-5
            w-full cursor-pointer rounded-2xl border-2 border-dashed
            border-gray-300 bg-gray-50 hover:bg-gray-100 transition
            text-center
          "
              >
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="Uploaded preview"
                    className="rounded-xl shadow-md object-cover max-h-60 w-full"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-600 p-6">
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

              <input
                type="file"
                id="image"
                onChange={(e) => convertToStrng(e.target.files[0])}
                className="hidden"
              />

              <button
                type="submit"
                className="w-full py-3 mt-5 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
              >
                SUBMIT
              </button>
            </form>
          </section>

          {/* PRODUCT LIST */}
          <section className="bg-gray-200 p-5 rounded-md shadow-xl w-full lg:w-1/2">
            <h1 className="text-2xl font-medium mb-6">List of Existing Products</h1>

            <div className="overflow-x-auto rounded-md shadow">
              <table className="w-full bg-white rounded-md">
                <thead className="bg-gray-100">
                  <tr className="text-left">
                    <th className="py-2 px-4">Image</th>
                    <th className="py-2 px-4">Title</th>
                    <th className="py-2 px-4">Category</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Created At</th>
                  </tr>
                </thead>

                <tbody>
                  {products && products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">
                          <img
                            src={product.image}
                            alt=""
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        </td>
                        <td className="py-2 px-4">{product.title}</td>
                        <td className="py-2 px-4">{product.category}</td>
                        <td className="py-2 px-4">{product.status}</td>
                        <td className="py-2 px-4">{product.createdAt}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-3 px-4 text-center text-gray-500" colSpan={5}>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default NewProduct;
