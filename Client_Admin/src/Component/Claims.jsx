import { useDispatch } from "react-redux"
import Sidebar from "./Sidebar"
import { useEffect } from "react";
import { getAllClaims } from "../store/ClaimThunk";

function Claims() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllClaims());
    }, []);
    return (
        <div className="flex flex-row">
            <Sidebar />

            <main className="w-full p-10">
                <h1>Controll and manage claims here</h1>

                <section>

                </section>
                <section></section>
            </main>
        </div>
    )
}

export default Claims