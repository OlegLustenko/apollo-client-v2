module.exports = {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
  singleAttributePerLine: true,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: false,
  bracketSameLine: false,
  proseWrap: 'never',
  quoteProps: 'preserve',
  tabWidth: 2,
  plugins: [
    'prettier-plugin-tailwindcss',
  ],
  pluginSearchDirs: false,
  tailwindFunctions: ['clsx', 'cva', 'containerClassName'],

};
