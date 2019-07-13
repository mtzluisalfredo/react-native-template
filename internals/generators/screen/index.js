/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a new Screen to project',
  prompts: [
    {
      type: 'list',
      name: 'type',
      message: 'Select the base type:',
      default: 'Stateless',
      choices: () => ['Stateless', 'React.PureComponent', 'React.Component'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called? => {{Any}}"Screen"',
      default: 'Home',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or screen with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantDucksAndSagas',
      default: true,
      message: 'Do you want an Ducks/Sagas/Types/Creators for this screen?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case 'Stateless': {
        componentTemplate = './screen/stateless.js.hbs';
        break;
      }
      default: {
        componentTemplate = './screen/class.js.hbs';
      }
    }

    const actions = [
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}Screen/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}Screen/tests/index.test.js',
        templateFile: './screen/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantDucksAndSagas) {
      // Duck
      actions.push({
        type: 'add',
        path: '../../src/store/ducks/{{camelCase name}}.js',
        templateFile: './screen/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/store/ducks/tests/{{camelCase name}}.test.js',
        templateFile: './screen/reducer.test.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/store/sagas/{{camelCase name}}.js',
        templateFile: './screen/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/store/sagas/tests/{{camelCase name}}.test.js',
        templateFile: './screen/saga.test.js.hbs',
        abortOnFail: true,
      });
      // Auto import reducer
      actions.push({
        type: 'append',
        path: '../../src/store/ducks/index.js',
        pattern: /import { combineReducers } from 'redux';/g,
        templateFile: './screen/import.duck.js.hbs',
      });
      actions.push({
        type: 'append',
        path: '../../src/store/ducks/index.js',
        pattern: /export default combineReducers\({/g,
        templateFile: './screen/import.duck-step2.js.hbs',
      });
      // Auto import saga
      actions.push({
        type: 'append',
        path: '../../src/store/sagas/index.js',
        pattern: /import { all, fork } from 'redux-saga\/effects';/g,
        templateFile: './screen/import.saga.js.hbs',
      });
      actions.push({
        type: 'append',
        path: '../../src/store/sagas/index.js',
        pattern: /yield all\(\[/g,
        templateFile: './screen/import.saga-step2.js.hbs',
      });
      actions.push({
        type: 'prettifyRootSaga',
        path: '/store/',
      });
    }

    actions.push({
      type: 'prettifyScreen',
      path: '/screens/',
    });

    return actions;
  },
};
