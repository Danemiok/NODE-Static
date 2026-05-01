import User from "../model/User.js";

const sendError = (res, error) => {
    return res.status(500).json({
        success: false,
        message: error?.message || String(error),
    });
};

// ==================== CONTROLLER ====================
export default class UserController {
    async getUsers(req, res) {
        try {
            const users = await User.findAll();

            return res.status(200).json({
                success: true,
                data: users,
                message: "Users retrieved successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async getAllUsers(req, res) {
        return this.getUsers(req, res);
    }

    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const result = await User.create(name, email, password);

            return res.status(201).json({
                success: true,
                data: result,
                message: "User created successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: user,
                message: "User retrieved successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.query;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required",
                });
            }

            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                data: user,
                message: "User retrieved successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async getUserCount(req, res) {
        try {
            const total = await User.count();

            return res.status(200).json({
                success: true,
                total,
                message: "User count retrieved successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const updated = await User.update(id, name, email, password);

            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "User not found or not updated",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            return sendError(res, error);
        }
    }
}
