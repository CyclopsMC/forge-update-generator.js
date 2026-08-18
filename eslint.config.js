const config = require('@rubensworks/eslint-config');

module.exports = config([
  {
    // Compilation output, which lives next to the sources
    ignores: [
      '**/*.js',
      '**/*.js.map',
      '**/*.d.ts',
    ],
  },
  {
    files: [ '**/*.ts' ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [ './tsconfig.eslint.json' ],
      },
    },
  },
  {
    rules: {
      'no-implicit-coercion': 'off',
    },
  },
]);
