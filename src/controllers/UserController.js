import { User } from "../model/User.js";

// ==================== CONTROLLER - CREATE METHOD ====================
// CREATE USER
export const createUser = async (req, res) => {
    try {
        // Destructuring object from request body
        const { name, email, password } = req.body;

        // Create instance using OOP constructor
        const newUser = new User(name, email, password);

        // Await 
        const result = await User.create(newUser);

        // Destructuring result
        const { id } = result;

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { id, name, email },
        });
    } catch (error) {
        // Try/Catch error handling
        res.status(500).json({
            success: false,
            message: error?.message || String(error),
        });
    }
};

// GET ALL USERS
export const getUsers = async (req, res) => {
    try {
        // Async/Await - Call static method
        const users = await User.findAll();

        // Array destructuring example
        const [firstUser, ...restUsers] = users;

        res.json({
            success: true,
            total: users.length,
            firstUser: firstUser || null,
            data: users,
        });
    } catch (error) {
        // Try/Catch error handling
        res.status(500).json({
            success: false,
            message: error?.message || String(error),
        });
    }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
    try {
        // Destructuring params
        const { id } = req.params;

        // Async/Await - Call static method
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        // Try/Catch error handling
        res.status(500).json({
            success: false,
            message: error?.message || String(error),
        });
    }
};

// UPDATE USER
export const updateUser = async (req, res) => {
    try {
        // Destructuring params and body
        const { id } = req.params;
        const { name, email, password } = req.body;

        // Create instance
        const user = new User(name, email, password);

        // Async/Await - Call static method
        const result = await User.update(id, user);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found or not updated",
            });
        }

        res.json({
            success: true,
            message: "User updated successfully",
        });
    } catch (error) {
        // Try/Catch error handling
        res.status(500).json({
            success: false,
            message: error?.message || String(error),
        });
    }
};

// DELETE USER
export const deleteUser = async (req, res) => {
    try {
        // Destructuring params
        const { id } = req.params;

        // Async/Await - Call static method
        const result = await User.delete(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        // Try/Catch error handling
        res.status(500).json({
            success: false,
            message: error?.message || String(error),
        });
    }
};
