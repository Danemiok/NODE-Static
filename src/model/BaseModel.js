class BaseModel {
  constructor(tableName, db) {
    if (new.target === BaseModel) {
      throw new Error("BaseModel is abstract and cannot be instantiated directly");
    }

    this.tableName = tableName;
    this.db = db;
  }

  async findAll() {
    const [rows] = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await this.db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async delete(id) {
    const [result] = await this.db.query(
      `DELETE FROM ${this.tableName} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}

export default BaseModel;
