module.exports = plop => {
  plop.setGenerator('entity', {
    description: 'Create an entity',
    prompts: [
      {
        type: 'list',
        name: 'entityType',
        message: 'Choose entity type',
        choices: ['component', 'type', 'interface', 'hook']
      },
      {
        type: 'input',
        name: 'name',
        message: 'Enter entity name'
      }
    ],
    actions: data => {
      if (data.entityType === 'component') {
        return [
          {
            type: 'add',
            path: './src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
            templateFile: 'plop-templates/Component/Component.tsx.hbs'
          },
          {
            type: 'add',
            path: './src/components/{{pascalCase name}}/index.ts',
            templateFile: 'plop-templates/Component/index.ts.hbs'
          },
          {
            type: 'append',
            path: './src/components/index.ts',
            separator: '',
            templateFile: 'plop-templates/Component/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'hook') {
        return [
          {
            type: 'add',
            path: './src/hooks/{{camelCase name}}.ts',
            templateFile: 'plop-templates/Hook/Hook.ts.hbs'
          },
          {
            type: 'append',
            path: './src/hooks/index.ts',
            separator: '',
            templateFile: 'plop-templates/Hook/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'type') {
        return [
          {
            type: 'add',
            path: './src/types/T{{pascalCase name}}.ts',
            templateFile: 'plop-templates/Type/Type.ts.hbs'
          },
          {
            type: 'append',
            path: './src/types/index.ts',
            separator: '',
            templateFile: 'plop-templates/Type/exportAll.ts.hbs'
          }
        ]
      } else if (data.entityType === 'interface') {
        return [
          {
            type: 'add',
            path: './src/types/I{{pascalCase name}}.ts',
            templateFile: 'plop-templates/Interface/Interface.ts.hbs'
          },
          {
            type: 'append',
            path: './src/types/index.ts',
            separator: '',
            templateFile: 'plop-templates/Interface/exportAll.ts.hbs'
          }
        ]
      }
    }
  })
}
