import error from "../assets/error.json";
import Lottie from "lottie-react";

function Error() {
    return (
        <div>
            <Lottie animationData={error} loop={true} />
            <div className="px-10 py-20">
                <p className="text-center">Error 404</p>
                <p className="text-center">Something went wrong</p>
                <p className="text-center"></p>

                <button
                    className="w-full py-2 text-white bg-green-800 shadow-2xl rounded-full "
                    onClick={() => window.history.back()}>
                    GO BACK
                </button>
            </div>
        </div>
    )
}

export default Error