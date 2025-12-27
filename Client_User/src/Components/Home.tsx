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
    <div className="p-5 ">
      <Navbar />

      <main>
        <p className="text-lg font-medium">Welcaome Back {user?.name}</p>
        {claims ? (
          claims == undefined ? (
            <div>
              <p>Server is not working now</p>
            </div>
          ) : (
            <div>
              {claims.map((claim) => (
                <div>
                  <p>{claim.claim_date}</p>
                  <img src={claim.item.image} alt="" />
                </div>
              ))}
            </div>
          )
        ) : (
          <div>
            <p>No Claims are made by you</p>
            <p>Check if you lost something !</p>
            <button>
              <p>
                Check <FaLongArrowAltRight />
              </p>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
