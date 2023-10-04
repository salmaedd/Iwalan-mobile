import { BRAND_TABLE } from '../utils/database';

import Brand from '../models/Brand';

/**
 * Get brand from SQLite database
 * @param {string[]} columns
 * @param {string} conditions
 * @param {string} SQLOptions
 * @returns {JSON[]}
 */
export async function getProducts(columns = [], conditions = '', SQLOptions = '') {
  const table = PRODUCT_TABLE;
  conditions = conditions
    .split(' ')
    .map((value) => {
      if (ProductSlide.getColumnNames().includes(value)) return `${table}_` + value;
      return value;
    })
    .join(' ');
  const result = await select(table, columns, conditions, SQLOptions);
  let rows = [];
  if (result.isSuccessful) {
    rows = result.rows.map((row) => Product.parseValues(row));
    return rows;
  } else return [];
}

/**
 * Get brands from SQLite database
 * @param {string[]} columns
 * @param {string} conditions
 * @param {string} SQLOptions
 * @returns {JSON[]}
 */
export async function getBrands(columns = [], conditions = '', SQLOptions = '') {
  const table = BRAND_TABLE;
  conditions = conditions
    .split(' ')
    .map((value) => {
      if (Brand.getColumnNames().includes(value)) return `${table}_` + value;
      return value;
    })
    .join(' ');
  const result = await select(table, columns, conditions, SQLOptions);
  let rows = [];
  if (result.isSuccessful) {
    rows = result.rows.map((row) => Brand.parseValues(row));
    return rows;
  } else return [];
  // return get(table,Gift,columns,conditions,SQLOptions);
}
