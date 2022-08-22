// eslint-disable-next-line no-undef
module.exports = (plop) => {
  plop.setGenerator('entity', {
    description: 'Create an entity',
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Choose entity type',
        choices: [
          'component',
          'type'
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter entity name'
      }
    ],
    actions: (data) => {
      if (data.entityType === 'component') {
        return [
          {
            type: 'add',
            path: 'components/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'plop-templates/Component/Component.tsx.hbs'
          },
          {
            type: 'add',
            path: 'components/{{pascalCase name}}/index.ts',
            templateFile: 'plop-templates/Component/index.ts.hbs'
          },
          {
            type: 'append',
            path: 'components/index.ts',
            separator: '',
            templateFile: 'plop-templates/Component/exportAll.ts.hbs'
          }
        ]
      }
    }
  })
}
