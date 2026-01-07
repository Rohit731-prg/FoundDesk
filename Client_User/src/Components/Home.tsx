import useClaimStore from "../Store/ClaimStore";
import useUserStore from "../Store/UserStore";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function Home() {
  const { user } = useUserStore();
  const { claims, getAllClaim } = useClaimStore();

  useEffect(() => {
    getAllClaim();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <Navbar />

      <main className="max-w-5xl mx-auto mt-6 space-y-8">
        {/* Welcome */}
        <div>
          <p className="text-lg font-semibold text-gray-800">
            Welcome back, {user?.name.split(" ")[0]}
          </p>
          <p className="text-sm text-gray-500">
            Manage your lost & found activity in one place
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-base font-medium text-gray-800">
              Did you lose something?
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Explore reported items and submit a claim if it belongs to you.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              Explore Lost & Found Items
            </button>
          </div>

          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-base font-medium text-gray-800">
              Have a question or need help?
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Ask a question to get help from the community or admins.
            </p>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
              Ask a Question
            </button>
          </div>
        </div>

        {/* Claims Section */}
        <section className="bg-white border rounded-xl p-6 shadow-sm">
          {claims === undefined ? (
            <div className="text-center">
              <p className="text-sm text-red-500 font-medium">
                Server is currently unavailable
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Please try again later
              </p>
            </div>
          ) : claims && claims.length > 0 ? (
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Your Claims
              </p>

              <div className="space-y-4">
                {claims.map((claim) => (
                  <div
                    key={claim._id}
                    className="flex flex-col md:flex-row gap-4 border rounded-lg p-4"
                  >
                    <img
                      src={claim.item.image}
                      alt={claim.item.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg border"
                    />

                    <div className="flex-1">
                      <p className="text-base font-medium text-gray-800">
                        {claim.item.title}
                      </p>

                      <p className="text-sm text-gray-600 mt-2 flex items-center">
                        Status:
                        <span className="ml-2 px-3 py-1 text-xs font-semibold bg-gray-900 text-white rounded-full">
                          {claim.status}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-base font-medium text-gray-800">
                No claims found
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Haven’t claimed anything yet? Start by checking lost items.
              </p>

              <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-black transition">
                Check Lost Items <FaLongArrowAltRight />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Home;
