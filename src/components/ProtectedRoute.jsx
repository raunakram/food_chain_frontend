import { Navigate } from "react-router-dom";



const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    const current_user_role = localStorage.getItem("user_type")
    const hasRequiredRole = roles.some((role) => current_user_role == role);
    if (!current_user_role) {
        return <Navigate to="/login/" />;
    }

    if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};


export default ProtectedRoute