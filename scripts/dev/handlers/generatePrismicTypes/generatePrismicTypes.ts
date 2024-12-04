import shell from '../../../../devtools/utils/node/shell.js'

// generate prismic types
export default function generatePrismicTypes() {
  // https://github.com/prismicio/prismic-ts-codegen
  shell('npm run prismic:generate:types')
}
