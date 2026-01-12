import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { deleteClaim, getAllClaims, updateClaimStatus } from "../store/ClaimThunk";
import { setClaim } from "../store/ClaimSlice";
import { CiSearch } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

function Claims() {
  const admin = useSelector((state) => state.admin.admin);
  const claims = useSelector((state) => state.claim.claims);
  const claim = useSelector((state) => state.claim.claim);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const filterClaims = claims
    ? claims.filter((claim) =>
        claim.item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handelDelete = async (claimId) => {
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
      await dispatch(deleteClaim(claimId));
    }
  };

  const handelUpdate = async (status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    });
    if (result.isConfirmed) {
      await dispatch(updateClaimStatus({ id: claim._id, status }));
    }
  }
  useEffect(() => {
    dispatch(getAllClaims(admin._id));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar />

      <main className="w-full p-10 flex flex-row gap-5">
        <section className="w-2/5">
          <h1>Explore Claims here</h1>
          <div className="flex flex-row gap-3 my-5 bg-pink-50 items-center border-2 rounded-full  px-2 py-2 text-black ">
            <CiSearch className="text-black font-medium" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full"
              placeholder="Search Itemn name"
              type="text"
            />
          </div>
          {claims ? (
            <div className="flex flex-col gap-3">
              {filterClaims.map((claim) => (
                <aside
                  key={claim._id}
                  className="p-1 rounded-sm border border-gray-300 flex flex-row justify-between items-center"
                >
                  <div
                    onClick={() => dispatch(setClaim(claim))}
                    className="flex flex-row gap-2"
                  >
                    <img
                      src={claim.item.image}
                      alt=""
                      className="w-20 h-20 rounded-sm"
                    />
                    <div>
                      <p className="text-black font-medium text-xl">
                        {claim.item.title}
                      </p>
                      <p className="text-black font-medium">
                        <span className="text-gray-500">Claim By</span>{" "}
                        {claim.student.name}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handelDelete(claim._id)}
                    className="px-5 h-10 rounded-full mr-5 bg-red-200 text-red-600"
                  >
                    <MdDelete />
                  </button>
                </aside>
              ))}
            </div>
          ) : (
            <div>
              <h2>No claims found</h2>
            </div>
          )}
        </section>
        <section className="w-3/5">
          {claim ? (
            <div className="w-full p-6 border border-gray-300 rounded-xl bg-white shadow-sm flex flex-col gap-6">
              {/* STUDENT INFO */}
              <section>
                <h1 className="text-lg font-semibold text-gray-800 mb-3">
                  Claimant Details
                </h1>

                <div className="flex items-center gap-4">
                  <img
                    src={claim.student.image}
                    alt="Student"
                    className="w-24 h-24 rounded-lg object-cover border"
                  />

                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-900">
                      {claim.student.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {claim.student.email}
                    </p>
                  </div>
                </div>
              </section>

              <hr />

              {/* ITEM INFO */}
              <section>
                <h1 className="text-lg font-semibold text-gray-800 mb-3">
                  Item Information
                </h1>

                <div className="flex gap-4">
                  <img
                    src={claim.item.image}
                    alt="Item"
                    className="w-32 h-24 rounded-lg object-cover border"
                  />

                  <div className="space-y-1">
                    <p className="text-base font-medium text-gray-900">
                      {claim.item.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      {claim.item.description}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-700 mt-1">
                      <span>
                        <strong>Category:</strong> {claim.item.category}
                      </span>
                      <span>
                        <strong>Status:</strong> {claim.item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <hr />

              {/* CLAIM INFO */}
              <section>
                <h1 className="text-lg font-semibold text-gray-800 mb-3">
                  Claim Details
                </h1>

                <div className="flex flex-col gap-3">
                  <img
                    src={claim.proof}
                    alt="Proof"
                    className="w-full h-60 rounded-lg object-cover border"
                  />

                  <div className="flex justify-between text-sm text-gray-700">
                    <p>
                      <strong>Claim Date:</strong>{" "}
                      {claim.claim_date.split("T")[0]}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`capitalize font-medium ${
                          claim.status === "pending"
                            ? "text-yellow-600"
                            : claim.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {claim.status}
                      </span>
                    </p>
                  </div>

                  {/* ACTIONS */}
                  {claim.status === "pending" && (
                    <div className="mt-4">
                      <p className="font-medium text-gray-800 mb-2">
                        Admin Action
                      </p>

                      <div className="flex gap-4">
                        <button onClick={() => handelUpdate("approved")} className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition">
                          Approve Claim
                        </button>
                        <button onClick={() => handelUpdate("rejected")} className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition">
                          Reject Claim
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="w-full h-80 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-xl bg-gray-50 text-gray-600">
              <p className="text-base font-medium">No claim selected</p>
              <p className="text-sm mt-1">
                Select a claim from the list to view details
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Claims;
