import algoliasearch from 'algoliasearch/lite'

const applicationId = ''
const searchOnlyApiKey = ''
const algoliaClient = algoliasearch(applicationId, searchOnlyApiKey)

export const algoliaConfig = {
  applicationId,
  searchOnlyApiKey,
  algoliaClient,
}
