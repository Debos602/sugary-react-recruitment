import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, useCurrentToken } from "@/redux/feature/authSlice";
import { toast } from "sonner";
import { verifyToken } from "../utils/verifyToken";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);
    const location = useLocation(); // Capture current location to redirect users after login
    let user = null;

    if (token) {
        try {
            user = verifyToken(token);
        } catch (error) {
            // If token verification fails (e.g., expired or tampered token)
            toast.error("Session expired. Please log in again.");
            dispatch(logout());
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    // If there's no token, log out and navigate to login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user's role doesn't match any of the allowed roles, redirect to an unauthorized page
    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If everything is valid, render the children components
    return <>{children}</>;
};

export default ProtectedRoute;
