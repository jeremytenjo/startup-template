import * as prismic from '@prismicio/client'

const prismicProjectName = 'startup-template-one'
const accessToken =
  'MC5aMkx2S1JBQUFDTUE3c1FZ.77-977-977-977-977-977-9XkHvv70377-9FHgU77-9Ou-_ve-_ve-_vU0rAwnvv70b77-977-977-977-9Pe-_ve-_vQ'
const apiEndpoint = `https://${prismicProjectName}.prismic.io/api/v2`
const repositoryName = prismic.getRepositoryName(apiEndpoint)

const prismicConfig = {
  repositoryName,
  apiEndpoint,
  accessToken,
  previewUrl:
    process.env.NODE_ENV === 'production'
      ? `https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicProjectName}`
      : false,
}

export default prismicConfig
