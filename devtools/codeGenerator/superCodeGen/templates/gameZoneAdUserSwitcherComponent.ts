import type {
  SuperCodeGeneratorFilesSchema,
  SuperCodeGeneratorTemplateSchema,
} from '@jeremytenjo/super-code-generator'

const files: SuperCodeGeneratorFilesSchema = [
  {
    path: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `${pascalCase}.tsx`
    },
    template: ({ name, helpers }) => {
      const pascalCase = helpers?.changeCase?.pascalCase(name)

      return `import React from 'react'
      import ActionBox from '@useweb/ui/ActionBox'
      import Button from '@useweb/ui/Button'
      import Alert from '@useweb/ui/Alert'
      
      export type ${pascalCase}Props = {
        gameZoneAdId: GameZoneAdSchema['id'] | undefined
      }
      
      export default function ${pascalCase}(
        props: ${pascalCase}Props,
      ) {
        const gameZoneAdData = useGameZoneAdData({
          gameZoneAdId: props.gameZoneAdId,
        })
      
        return (
          <GameZoneAdUserSwitcher
            gameZoneAd={gameZoneAdData.gameZoneAd}
            sellerView={<SellerView {...props} />}
            buyerView={<BuyerView {...props} />}
          />
        )
      }
      
      const SellerView = (props: ${pascalCase}Props) => {
        const gameZoneAdData = useGameZoneAdData({
          gameZoneAdId: props.gameZoneAdId,
        })
      
        return (
          <ActionBox
            data-id='ActionBox'
            headerProps={{
              title: 'ActionBox',
            }}
            ctas={
              <>
                <Button name='Save' sx={{}}>
                  Save
                </Button>
              </>
            }
            sx={{}}
          >
            SellerView
          </ActionBox>
        )
      }
      
      const BuyerView = (props: ${pascalCase}Props) => {
        const gameZoneAdData = useGameZoneAdData({
          gameZoneAdId: props.gameZoneAdId,
        })
      
        return (
          <ActionBox
            data-id='ActionBox'
            headerProps={{
              title: 'ActionBox',
            }}
            ctas={
              <>
                <Button name='Save' sx={{}}>
                  Save
                </Button>
              </>
            }
            sx={{}}
          >
            BuyerView
          </ActionBox>
        )
      }
      
      `
    },
  },
]

const template: SuperCodeGeneratorTemplateSchema = {
  type: 'Game Zone Ad User Switcher Component',
  files,
}

export default template
