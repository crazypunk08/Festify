//Middleware to verify whether the user is Admin or not
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/admin.models.js";

const verifyadmin = asyncHandler(async (req, res, next) => {
    const { username } = req.user; // Assuming req.user contains the logged-in user's info

    // Check if the username exists in the Admin collection
    const admin = await Admin.findOne({ username });

    if (!admin) {
        throw new ApiError(403, "Access denied: User is not an admin");
    }

    next(); // Proceed to the next middleware or route handler
});

export { verifyadmin };
