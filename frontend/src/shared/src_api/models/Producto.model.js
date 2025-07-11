// RUTA: src/shared/src_api/models/Producto.model.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define(
    "Producto",
    {
      idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id_producto",
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombre",
      },
      descripcion: {
        type: DataTypes.TEXT,
        field: "descripcion",
      },
      existencia: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "existencia",
      },
      precio: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
        field: "precio",
      },
      stockMinimo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "stock_minimo",
      },
      stockMaximo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        field: "stock_maximo",
      },
      imagen: {
        type: DataTypes.TEXT,
        field: "imagen",
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        field: "estado",
      },
      tipoUso: {
        type: DataTypes.ENUM("Interno", "Venta Directa", "Otro"),
        allowNull: false,
        defaultValue: "Venta Directa",
        field: "tipo_uso",
      },
      vidaUtilDias: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "vida_util_dias",
      },
      categoriaProductoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_categoria_producto",
      },
    },
    {
      tableName: "producto",
      timestamps: false,
    }
  );

  Producto.associate = (models) => {
    // ✅ CORRECCIÓN CLAVE: Esta es la asociación que el error no encontraba.
    // Un Producto PERTENECE A una CategoriaProducto.
    Producto.belongsTo(models.CategoriaProducto, {
      foreignKey: "categoriaProductoId", // La FK en este modelo (Producto)
      as: "categoria", // El alias que usaremos en las consultas
    });

    // El resto de tus asociaciones se mantienen igual...
    Producto.belongsToMany(models.Compra, {
      through: "compra_x_producto",
      foreignKey: "id_producto",
      otherKey: "id_compra",
      as: "compras",
    });
    Producto.belongsToMany(models.Venta, {
      through: "producto_x_venta",
      foreignKey: "id_producto",
      otherKey: "id_venta",
      as: "ventas",
    });
    Producto.hasMany(models.Abastecimiento, {
      foreignKey: "idProducto",
      as: "abastecimientos",
    });
  };

  return Producto;
};