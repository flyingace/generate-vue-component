const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('Polaris Vue Component')} generator!`));

    const prompts = [{
      type: 'input',
      name: 'pascalComponentName',
      message: 'What is the name of your component? (Use PascalCase)',
      default: 'Component'
    },
    {
      type: 'input',
      name: 'extendedClassName',
      message: 'What class will your component extend?',
      default: 'Vue'
    }
  ];

    return this.prompt(prompts).then((props) => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.kebabComponentName = this.generateComponentPath(this.props.pascalComponentName);
    });
  }

  generateComponentPath(pascalComponentName) {
    return _.kebabCase(pascalComponentName);
  }

  writing() {
    console.log('props: ', this.props);
    // component class definition
    this.fs.copyTpl(
      this.templatePath('component-class-definition.js'),
      this.destinationPath(`src/components/${this.kebabComponentName}/${this.props.pascalComponentName}.ts`),
      {pascalComponentName: this.props.pascalComponentName, extendedClassName: this.props.extendedClassName}
    );
    // component styles
    this.fs.copyTpl(
      this.templatePath('component-styles.scss'),
      this.destinationPath(`src/components/${this.kebabComponentName}/${this.props.pascalComponentName}.scss`),
      {kebabComponentName: this.kebabComponentName, pascalComponentName: this.props.pascalComponentName}
    );
    // component unit tests
    this.fs.copyTpl(
      this.templatePath('component-unit-tests.js'),
      this.destinationPath(`src/components/${this.kebabComponentName}/${this.props.pascalComponentName}.spec.ts`),
      {pascalComponentName: this.props.pascalComponentName}
    );
    // component vue template
    this.fs.copyTpl(
      this.templatePath('component-vue-template.js'),
      this.destinationPath(`src/components/${this.kebabComponentName}/${this.props.pascalComponentName}.vue`),
      {kebabComponentName: this.kebabComponentName, pascalComponentName: this.props.pascalComponentName}
    );
    // component index file
    this.fs.copyTpl(
      this.templatePath('component-index.js'),
      this.destinationPath(`src/components/${this.kebabComponentName}/index.ts`),
      {pascalComponentName: this.props.pascalComponentName}
    );
  }
};
