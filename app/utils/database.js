import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const BRAND_TABLE = 'BRAND_TABLE';

export const BRAND_PRODUCT_TABLE = 'BRAND_PRODUCT_TABLE';

/**
 * Executes a query and returns results array
 * @param {string} query
 * @param {array} params
 * @returns {array} results - format : { isSuccessful: false, insertId: null, rows: [] }
 */
export async function ExecuteQuery(query, params = []) {
  const DB = await SQLite.openDatabase('Iwalane', () => {}, error => /*console.log(error)*/ {});
  let query_result = { isSuccessful: false, insertId: null, rows: [] };
  try {
    await DB.transaction(async transaction => {
      await transaction.executeSql(
        query,
        params,
        (_, result) => {
          query_result.isSuccessful = true;
          for (let i = 0; i < result.rows.length; i++) {
            query_result.rows.push(result.rows.item(i));
          }
          query_result.insertId = result.insertId;
        },
        error => {
          // console.log(error);
        },
      );
    });
  } catch (error) {
    // console.log(error);
  }
  return query_result;
}
