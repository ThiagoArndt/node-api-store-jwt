import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class orders extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    num_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    qtde_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cod_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'cod_produto'
      }
    }
  }, {
    sequelize,
    tableName: 'orders',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "num_pedido" },
        ]
      },
      {
        name: "cod_produto_idx",
        using: "BTREE",
        fields: [
          { name: "cod_produto" },
        ]
      },
    ]
  });
  }
}
