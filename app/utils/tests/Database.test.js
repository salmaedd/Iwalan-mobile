/**
 * Test database
 */
/*
import Database from '../database';

describe('Database', () => {
    const databaseName = "test.db";
    const databaseVersion = "1.0";
    const databaseDisplayname = "Test";
    let DB = new Database(databaseName, databaseVersion, databaseDisplayname);

    it('should not throw if DB created correctly', () => {
        expect(() => DB.getConnection()).not.toThrow();
    });
    it('should not throw if table was created correctly', () => {
        expect(() => DB.createTable("users",[{ name:"id", type: "INTEGER", options:"PRIMARY KEY NOT NULL" }])).not.toThrow();
    });
    it('should not throw if insert is working correctly ', () => {
        expect(() => DB.insert("users",["id"], [1])).not.toThrow();
    });
    it('should not throw if DB selects all columns ', () => {
        expect(() => DB.select("users")).not.toThrow();
    });
    it('should not throw if DB selects specified columns ', () => {
        expect(() => DB.select("users",['id'])).not.toThrow();
    });
    it('should not throw if DB selects with condition', () => {
        expect(() => DB.select("users",[],"WHERE id > 0")).not.toThrow();
    });
});
*/