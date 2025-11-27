import { Navigate } from "react-router-dom";

const is_authenticated = () => {
    return localStorage.getItem('auth') == 'true'
};

function ProtectedRoute({ children }: any) {
    if (!is_authenticated()) {
        return <Navigate to="/" replace />;
    };

    return children;
}

export default ProtectedRoute