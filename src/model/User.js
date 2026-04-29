import db from "../config/db.js";

// ==================== CLASS ====================
export class User {
    // Constructor - OOP
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // ==================== STATIC METHODS ====================
    // Static method: Get all users
    static async findAll() {
        const [results] = await db.query('SELECT * FROM users');
        return results;
    }

    // Static method: Find user by ID
    static async findById(id) {
        const [results] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return results[0];
    }

    // Static method: Create new user
    static async create(user) {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [user.name, user.email, user.password]
        );

        // Destructuring object
        const { name, email, password } = user;
        return { id: result.insertId, name, email, password };
    }

    // Static method: Update user
    static async update(id, user) {
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
            [user.name, user.email, user.password, id]
        );
        return result.affectedRows > 0;
    }

    // Static method: Delete user
    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
