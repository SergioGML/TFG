-- Creación de la tabla de Gestión Fiscal
CREATE TABLE gestion_fiscal (
    id SERIAL PRIMARY KEY,
    pais VARCHAR(100) NOT NULL UNIQUE,
    tasa_impositiva NUMERIC(4,2) NOT NULL,  -- Ejemplo: 15.00 para 15% Máximo 2 enteros y 2 decimales
);

-- Creación de la tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gestion_fiscal_id INTEGER,  -- Relaciona el usuario con la gestión fiscal de su país
    FOREIGN KEY (gestion_fiscal_id) REFERENCES gestion_fiscal(id)
);

-- Creación de la tabla de Activos
CREATE TABLE activos (
    id SERIAL PRIMARY KEY,  -- ID interno de la base de datos
    coinmarketcap_id INTEGER NOT NULL UNIQUE, -- ID de la API de CoinMarketCap
    simbolo VARCHAR(10) NOT NULL UNIQUE,  
    nombre VARCHAR(100) NOT NULL,
);

-- Creación de la tabla de Transacciones
CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,          -- Referencia al usuario que realizó la operación
    activo_id INTEGER NOT NULL,        -- Referencia al activo en cuestión
    tipo_operacion VARCHAR(20) NOT NULL, -- 'compra' o 'venta'
    
    -- Campos para operación de compra:
    cantidad_invertida NUMERIC(12,2),       -- Cantidad de dinero invertido en la compra
    cantidad_comprada NUMERIC(12,6),     -- Número de criptomonedas compradas
    precio_compra NUMERIC(12,6),         -- Precio de compra por unidad

    -- Campos para operación de venta:   
    cantidad_vendida NUMERIC(12,6),      -- Número de criptomonedas vendidas
    precio_venta NUMERIC(12,6),          -- Precio de venta por unidad
    precio_promedio_compra NUMERIC(12,6),  -- Precio promedio de compra (útil para comparar)
	precio_promedio_venta NUMERIC(12,6), -- Precio promedio de venta (útil para revisar ventas VS compras)
    ratio_beneficio NUMERIC(5,2),        -- Porcentaje de beneficio o pérdida

	fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (activo_id) REFERENCES activos(id)
);

-- Creación de la tabla de Alertas
CREATE TABLE alertas (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,           -- Referencia al usuario que configura la alerta
    activo_id INTEGER NOT NULL,         -- Referencia al activo de la alerta
    tipo_alerta VARCHAR(50) NOT NULL,     -- Ejemplo: 'porcentaje' o 'valor_absoluto'
    umbral NUMERIC(12,2) NOT NULL,        -- Valor del umbral configurado
    tipo_variacion VARCHAR(20) NOT NULL,  -- 'incremento' o 'decremento'
    activo_alerta BOOLEAN DEFAULT true,   -- Indica si la alerta está activa o no
    FOREIGN KEY (user_id) REFERENCES usuarios(id),
    FOREIGN KEY (activo_id) REFERENCES activos(id)
);
