import express from "express";
// Import/Export module - Controller methods
import { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from "../controllers/UserController.js";

const router = express.Router();

// MVC Routes
router.post("/users", createUser);      // Create
router.get("/users", getUsers);          // Read all
router.get("/users/:id", getUserById);   // Read one
router.put("/users/:id", updateUser);    // Update
router.delete("/users/:id", deleteUser);// Delete

export default router;