/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const componentGenerator = require('./component/index.js');
const screenGenerator = require('./screen/index.js');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('screen', screenGenerator);
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(path.join(__dirname, `../../src/screens/${comp}`), fs.F_OK);
      return `screens/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
  plop.setActionType('prettify', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/',
      config.path,
      plop.getHelper('properCase')(answers.name),
      '**.js'
    )}`;
    exec(`yarn prettify -- "${folderPath}"`);
    exec(`yarn lintFolder ./src/screens/${answers.name}/ -- "${folderPath}"`);
    return folderPath;
  });
  plop.setActionType('prettifyScreen', (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      '/../../src/',
      config.path,
      `${plop.getHelper('properCase')(answers.name)}Screen/`,
      '**.js'
    )}`;
    exec(`yarn lintFolder ./src/screens/${answers.name}Screen/`);
    return folderPath;
  });
  plop.setActionType('prettifyRootSaga', (answers, config) => {
    const folderPath = `${path.join(__dirname, '/../../src/', config.path)}`;
    exec(`yarn lintFolder ${folderPath}/ducks/index.js`);
    exec(`yarn lintFolder ${folderPath}/sagas/index.js`);
    return folderPath;
  });
};
