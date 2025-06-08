-- Creación de la tabla Países
CREATE TABLE paises (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Creación de la tabla Tramos Fiscales
CREATE TABLE tramos_fiscales (
    id SERIAL PRIMARY KEY,
    pais_id INTEGER NOT NULL,
    tramo_min NUMERIC(10,2) NOT NULL,
    tramo_max NUMERIC(10,2),
    tasa_impositiva NUMERIC(5,2) NOT NULL,
    FOREIGN KEY (pais_id) REFERENCES paises(id)
);

-- Creación de la tabla de Activos
CREATE TABLE activos (
    id SERIAL PRIMARY KEY,
    coinmarketcap_id INTEGER NOT NULL UNIQUE,
    simbolo VARCHAR(10) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL
);

-- Creación de la tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pais_id INTEGER,
    FOREIGN KEY (pais_id) REFERENCES paises(id)
);

-- Creación de la tabla de Transacciones
CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    activo_id INTEGER NOT NULL,
    tipo_operacion VARCHAR(20) NOT NULL CHECK (tipo_operacion IN ('compra', 'venta')),

    -- Campos para compra
    cantidad_invertida NUMERIC(12,2),
    cantidad_comprada NUMERIC(12,6),
    precio_compra NUMERIC(12,6),

    -- Campos para venta
    cantidad_vendida NUMERIC(12,6),
    precio_venta NUMERIC(12,6),
    precio_promedio_compra NUMERIC(12,6),
    precio_promedio_venta NUMERIC(12,6),
    ratio_beneficio NUMERIC(5,2),

    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (activo_id) REFERENCES activos(id)
);
