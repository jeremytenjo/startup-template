import React from 'react'
import type { BoxProps } from '@useweb/ui/Box'
import {
  Configure,
  InstantSearch,
  useInstantSearch,
  useSearchBox,
  type ConfigureProps,
} from 'react-instantsearch'
import { DefaultTextFieldClearComponent } from '@useweb/ui/TextField'
import Autocomplete from '@useweb/ui/Autocomplete'
import type { SearchClient } from 'algoliasearch/lite'

import { algoliaConfig } from '../../../algolia.config.js'
import type UserSchema from '../../../../../../data/users/user.schema.js'
import SearchIcon from '../../../../../components/icons/SearchIcon/SearchIcon.js'

export type AlgoliaAutocompleteProps<DataSchema extends AlgoliaInputSchema> = {
  indexName: DataSchema['indexName']
  hitComponent: React.FC<{ hit: DataSchema['data']; onClose: () => any }>
  getOptionLabel: (props: { option: DataSchema['data'] }) => string
  placeholder: string
  sx?: BoxProps['sx']
  textFieldSx?: BoxProps['sx']
  searchConfig?: ConfigureProps
  additionalHitsFetcher?: (props: {
    query: string
    currentHits: AlgoliaUserSearchProps['data'][]
  }) => Promise<{
    hits: any[]
  }>
}

export default function AlgoliaAutocomplete<DataSchema extends AlgoliaInputSchema>(
  props: AlgoliaAutocompleteProps<DataSchema>,
) {
  const searchClient: SearchClient = {
    ...algoliaConfig.algoliaClient,

    async search(requests) {
      const userSearchRequest = requests.find((r) => r.indexName === props.indexName)

      if (userSearchRequest?.params?.query !== '') {
        const res = (await algoliaConfig.algoliaClient.search(requests)) as any

        if (props.additionalHitsFetcher) {
          const additionalHits = await props.additionalHitsFetcher({
            query: userSearchRequest?.params?.query || '',
            currentHits: res.results[0].hits || [],
          })

          res.results[0].hits = [
            ...(res.results[0].hits || []),
            ...(additionalHits.hits || []),
          ]
        }

        return res
      } else {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: false,
            query: '',
            params: '',
          })),
        })
      }
    },
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={props.indexName}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <Configure {...(props.searchConfig || {})} />
      <AlgoliaAutocompleteUi {...props} />
    </InstantSearch>
  )
}

function AlgoliaAutocompleteUi<DataSchema extends AlgoliaInputSchema>(
  props: AlgoliaAutocompleteProps<DataSchema>,
) {
  const [autocompleKey, setAutocompleKey] = React.useState(0)
  const instantSearch = useInstantSearch()
  const searchBox = useSearchBox()

  const resetAutocomplete = () => {
    setAutocompleKey(autocompleKey + 1)
  }

  return (
    <>
      <Autocomplete<DataSchema['data']>
        key={autocompleKey}
        id={props.indexName}
        options={instantSearch?.results?.hits || []}
        getOptionLabel={({ option }) => {
          return props.getOptionLabel({ option })
        }}
        hitComponent={props.hitComponent}
        placeholder={props.placeholder}
        sx={{ width: 300, ...(props.sx || {}) }}
        onTextfieldChange={(p) => {
          searchBox.refine(p.value)
        }}
        muiAutocompleteProps={{
          freeSolo: instantSearch?.results?.query === '',
          noOptionsText: 'No results found',
        }}
        textFieldProps={{
          sx: props.textFieldSx,
          InputProps: {
            startAdornment: (
              <SearchIcon
                sx={{
                  width: '12px',
                  mr: 1,
                }}
              />
            ),
            endAdornment: (
              <DefaultTextFieldClearComponent
                value={searchBox.query}
                onClick={() => {
                  searchBox.clear()
                  resetAutocomplete()
                }}
              />
            ),
          },
        }}
      />
    </>
  )
}

type AlgoliaInputSchema = {
  indexName: string
  data: any
}

// indecis
export type AlgoliaUserSearchProps = {
  indexName: 'user_search'
  data: UserSchema & {
    overrideDisplayName: string | undefined
  }
}
