# Proyecto Node.js para Kubo

Proyecto en Node.Js haciendo uso de una arquitectura limpia y clara para su correcta lectura y entendimiento.

## Características

- Estructura modular y clara
- Uso de `node --env-file` para configuración
- Uso del framework  `Fastify` para mayor velocidad
- Uso de las últimas caracterisitcas de `Node.js LTS`
- Uso nativo de `Typescript` gracias a `node --experimental-strip-types`
- Uso de la suite de testing nativa de `Node.js` `node:test` y `node:assert/strict`

## Requisitos

- [Node.js](https://nodejs.org/) v22.6.0 o superior
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalación

```bash
git clone https://github.com/danielg2964/movies
cd movies
npm install
```

## Pruebas
```bash
node --run test
```

## Preparación
¡Recuerda tener tu archivo `.env` listo!
```bash
npx drizzle-kit push
```

## Ejecución
```bash
node --run start
```
