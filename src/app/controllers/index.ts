import fs from 'fs';
import path from 'path';
import express from 'express';

export default (app: express.Application) => {
  fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.ts')
    .forEach(file => require(path.resolve(__dirname, file))(app));
};
