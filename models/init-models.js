import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _categories from  "./categories.js";
import _orders from  "./orders.js";
import _products from  "./products.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const categories = _categories.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  products.belongsTo(categories, { as: "id_categoria_category", foreignKey: "id_categoria"});
  categories.hasMany(products, { as: "products", foreignKey: "id_categoria"});
  orders.belongsTo(products, { as: "cod_produto_product", foreignKey: "cod_produto"});
  products.hasMany(orders, { as: "orders", foreignKey: "cod_produto"});

  return {
    categories,
    orders,
    products,
    users,
  };
}
