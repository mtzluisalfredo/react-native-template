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
      message: 'What should it be called?',
      default: 'HomeScreen',
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
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantDucksAndSagas',
      default: true,
      message: 'Do you want an Ducks/Sagas/Types/Creators for this screen?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
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
        path: '../../src/screens/{{properCase name}}/index.js',
        templateFile: componentTemplate,
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/index.test.js',
        templateFile: './screen/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/messages.js',
        templateFile: './screen/messages.js.hbs',
        abortOnFail: true,
      });
    }

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
        path: '../../src/store/sagas/{{properCase name}}.js',
        templateFile: './screen/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/store/sagas/tests/{{properCase name}}.test.js',
        templateFile: './screen/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/screens/',
    });

    return actions;
  },
};
