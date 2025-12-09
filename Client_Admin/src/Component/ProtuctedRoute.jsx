import { Navigate } from "react-router-dom";

const is_authenticated = () => {
    return localStorage.getItem("adminToken") === "true";
}

function ProtuctedRoute({ children }) {
    if (!is_authenticated()) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtuctedRoute;