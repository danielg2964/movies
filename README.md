# Proyecto Node.js

Proyecto en NodeJs haciendo uso una arquitectura limpia y clara para su correcta lectura y entendimiento.

## Características

- Estructura modular y clara
- Uso de `node --env-file` para configuración
- Uso del framework de `Fastify` para mayor velocidad
- Uso de las últimas caracterisitcas de `NodeJs LTS`
- Uso nativo de `Typescript` gracias a `node --experimental-strip-types`
- Uso de la suite de testing nativa de `Node` `node:test` y `node:assert/strict`

## Requisitos

- [Node.js](https://nodejs.org/) v22.6.0 o superior
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalación

```bash
git clone https://github.com/usuario/proyecto-nodejs.git
cd proyecto-nodejs
npm install
```

## Pruebas
```bash
node --run test
```

## Prepración
¡Recuerda tener tu archivo `.env` listo!
```bash
npx drizzle-kit push
```

## Ejecución
```bash
node --run start
```
