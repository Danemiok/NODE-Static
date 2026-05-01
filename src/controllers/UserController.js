import BaseController from "./BaseController.js";
import User from "../model/User.js";

// ==================== CONTROLLER ====================
export default class UserController extends BaseController {
    async getUsers(req, res) {
        try {
            const users = await User.findAll();

            return this.success(res, users, "Users retrieved successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getAllUsers(req, res) {
        return this.getUsers(req, res);
    }

    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const result = await User.create(name, email, password);

            return this.created(res, result, "User created successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);

            if (!user) {
                return this.notFound(res, "User not found");
            }

            return this.success(res, user, "User retrieved successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.query;

            if (!email) {
                return this.badRequest(res, "Email is required");
            }

            const user = await User.findByEmail(email);

            if (!user) {
                return this.notFound(res, "User not found");
            }

            return this.success(res, user, "User retrieved successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async getUserCount(req, res) {
        try {
            const total = await User.count();

            return this.success(res, { total }, "User count retrieved successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;
            const updated = await User.update(id, name, email, password);

            if (!updated) {
                return this.notFound(res, "User not found or not updated");
            }

            return this.success(res, null, "User updated successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await User.delete(id);

            if (!deleted) {
                return this.notFound(res, "User not found");
            }

            return this.success(res, null, "User deleted successfully");
        } catch (error) {
            return this.handleError(res, error);
        }
    }
}
