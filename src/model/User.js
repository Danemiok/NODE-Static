import db from "../config/db.js";
import BaseModel from "./BaseModel.js";

class User extends BaseModel {
  constructor() {
    super("users", db);
  }

  async create(name, email, password) {
    const [result] = await this.db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );

    return {
      id: result.insertId,
      name,
      email,
      password,
    };
  }

  async update(id, name, email, password) {
    const [result] = await this.db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id]
    );

    return result.affectedRows > 0;
  }

  async findByEmail(email) {
    const [rows] = await this.db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    return rows[0];
  }

  async count() {
    const [rows] = await this.db.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    return rows[0]?.total || 0;
  }
}

export default new User();
