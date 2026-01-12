import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import {
  getAllProducts,
  deleteProduct,
  updateProductStatus,
} from "../store/ProductThunk";
import { FaFilePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { CiSearch } from "react-icons/ci";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const fetchData = async () => {
    dispatch(getAllProducts());
  };

  const deleteData = async (id) => {
    console.log("delete id", id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      console.log("delete id", id);
      dispatch(deleteProduct(id));
    }
  };

  const updateProduct = async (product) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Product",
      html: `
      <input id="swal-title" class="swal2-input" placeholder="Title" value="${
        product.title
      }" />
      
      <textarea id="swal-description" class="swal2-textarea" placeholder="Description">
${product.description}
      </textarea>

      <input id="swal-location" class="swal2-input" placeholder="Location" value="${
        product.location
      }" />

      <select id="swal-status" class="swal2-select">
        <option value="open" ${
          product.status === "open" ? "selected" : ""
        }>Open</option>
        <option value="closed" ${
          product.status === "closed" ? "selected" : ""
        }>Closed</option>
      </select>
    `,
      showCancelButton: true,
      confirmButtonText: "Update",
      focusConfirm: false,

      preConfirm: () => {
        return {
          id: product._id,
          title: document.getElementById("swal-title").value,
          description: document.getElementById("swal-description").value,
          location: document.getElementById("swal-location").value,
          status: document.getElementById("swal-status").value,
        };
      },
    });

    if (formValues) {
      dispatch(updateProductStatus(formValues));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">View all products</h1>
        <aside className="flex flex-row gap-4">
          <div className="flex gap-3 px-5 py-2 bg-pink-50 rounded-full border-2 items-center mb-4 w-1/4">
            <CiSearch />
            <input
              placeholder="Search Product by name"
              className="bg-pink-50 outline-none w-full"
              type="text"
            />
          </div>
          <div className="py-2 px-5 bg-pink-50 rounded-full border-2 items-center mb-4 w-1/4">
            <select>
              <option value="">All Categories</option>
            </select>
          </div>
          <div className="py-2 px-5 bg-pink-50 rounded-full border-2 items-center mb-4 w-1/4">
            <select>
              <option value="">Filter by Status</option>
            </select>
          </div>
        </aside>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="table-content">Image</th>
                <th className="table-content">Title</th>
                <th className="table-content">Description</th>
                <th className="table-content">Category</th>
                <th className="table-content">Location</th>
                <th className="table-content">Status</th>
                <th className="table-content">Publish Date</th>
                <th className="table-content text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {products?.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900">
                    {item.title}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {item.description}
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.location}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                ${
                  item.status === "claimed"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">{item.createdAt.split("T")[0]}</td>

                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="btn bg-blue-500"
                      onClick={() => updateProduct(item)}
                    >
                      <FaFilePen />
                    </button>

                    <button
                      className="btn bg-red-500"
                      onClick={() => deleteData(item._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Toaster />
    </div>
  );
}

export default Products;
