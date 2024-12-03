import * as prismic from '@prismicio/client'

const prismicProjectName = 'startup-template'
const accessToken =
  'MC5aMC1QRFJNQUFDSUE5UEd3.Vu-_ve-_ve-_vTnvv71c77-977-9SQ7vv71e77-9DRNpSHjvv70ZQhYcO--_ve-_vXLvv73vv73vv71F'
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
