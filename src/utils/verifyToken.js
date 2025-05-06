import { jwtDecode } from "jwt-decode"; // Correct the import statement

// Utility function to decode the token
export const verifyToken = (token) => {
    try {
        // Cast the decoded token as CustomJwtPayload
        return jwtDecode < CustomJwtPayload > token;
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};
