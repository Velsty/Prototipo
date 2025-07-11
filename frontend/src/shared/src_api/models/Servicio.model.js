// src/models/Servicio.model.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Servicio = sequelize.define(
    'Servicio',
    {
      idServicio: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_servicio'
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        field: 'nombre'
      },
      descripcion: {
        type: DataTypes.TEXT,
        field: 'descripcion'
      },
      imagen: {
        type: DataTypes.TEXT,
        field: 'imagen'
      },
      precio: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: 'precio'
      },
      duracionEstimadaMin: { 
        type: DataTypes.INTEGER,
        field: 'duracion_estimada_min'
      },
      estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
        field: 'estado'
      },
      idCategoriaServicio: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_categoria_servicio',
        references: {
          model: 'categoria_servicio',
          key: 'id_categoria_servicio'
        },
        onDelete: 'RESTRICT'
      },
      idEspecialidad: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'id_especialidad',
        references: {
          model: 'especialidad',
          key: 'id_especialidad'
        },
        onDelete: 'RESTRICT'
      }
    },
    {
      tableName: 'servicio',
      timestamps: false
    }
  );

  Servicio.associate = (models) => {
    // Un Servicio pertenece a una CategoriaServicio.
    Servicio.belongsTo(models.CategoriaServicio, {
      foreignKey: 'idCategoriaServicio',
      as: 'categoria'
    });

    // Un Servicio puede requerir una Especialidad.
    Servicio.belongsTo(models.Especialidad, {
      foreignKey: 'idEspecialidad',
      as: 'especialidad'
    });

    // Un Servicio puede estar incluido en muchas Citas.
    Servicio.belongsToMany(models.Cita, {
      through: 'servicio_x_cita',
      foreignKey: 'id_servicio',   
      otherKey: 'id_cita',       
      as: 'citas'
    });

    // Un Servicio puede ser parte de muchas Ventas.
    Servicio.belongsToMany(models.Venta, {
      through: 'venta_x_servicio',
      foreignKey: 'id_servicio',  
      otherKey: 'id_venta',       
      as: 'ventas'
    });
  };

  return Servicio;
};