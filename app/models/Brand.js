export default class Brand {
    /**
     * Creates Brand object
     * @param {JSON} json 
     */
    constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.active = json.active;
        this.images = json.images;
        this.createdAt = json.createdAt;
        this.updatedAt = json.updatedAt;
    }
    /**
     * @returns {array}
     */
    getValues() {
        return [
            this.id,
            JSON.stringify(this.name),
            this.active,
            JSON.stringify(this.images),
            this.createdAt,
            this.updatedAt
        ];
    }
    /**
     * @summary Returns Brand's database columns
     * @description Format : { name, type, options}
     * @returns {JSON[]}
     */
    static getColumns() {
        return [
            { name : 'id' , type: "INTEGER", options : "PRIMARY KEY NOT NULL" },
            { name : 'name' , type: "TEXT", options : "" },
            { name : 'active' , type: "INTEGER", options : "" },
            { name : 'images' , type: "TEXT", options : "" },
            { name : 'createdAt' , type: "TEXT", options : "" },
            { name : 'updatedAt' , type: "TEXT", options : "" }
        ];
    }
    /**
     * @summary Returns Brand's database column names
     * @returns {string[]}
     */
    static getColumnNames() {
        return this.getColumns().map((column) => column.name);
    }
    /**
     * Returns the list of foreign keys in associated database table
     * @returns {Json[]} - format : [{ key : '' , table: '', distantKey : '' },...]
     */
    static getForeignKeys() {
        return [
        ];
    }
    /**
     * Parses specific fields
     * @param {JSON} values 
     * @returns {JSON} 
     */
    static parseValues(values) {
        let parsed = values;
        if(values.images)
            parsed.images = JSON.parse(values.images);
        if(values.name )
            parsed.name = JSON.parse(values.name);
        return parsed;
    }
}