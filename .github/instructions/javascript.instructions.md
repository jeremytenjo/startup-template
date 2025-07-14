---
applyTo: '**/*.{ts,tsx,js,jsx}'
---

# Javascript and Typescript - Functions that do not return React components

- Always use objects as a functions arguments named props
- use maps and for each instead of for loops
- Format the Props type as `${functionName}Props`, make sure the name is pascal case
- Always use block statement syntax with curly braces for arrow functions, never use implicit returns

  ```typescript
  // ✅ Good
  array.map((item) => {
    return item.value
  })

  // ❌ Bad
  array.map((item) => item.value)
  ```

- Always export the props type
- Do not spread the props object in the function
- Always return an object with a key named based on the returned data
- use the {}[] format for array types
- always put only one variable in an if statement
- Use the function arguments/properties directly instead of assigning them to new local variables
- When creating function files, always add them in a folder named after the function name
- Handle return values in variable declarations, not in the return statement
- Example:

  ```typescript
  // ✅ Good
  const data = response.data || []
  const totalSize = count || 0
  return { data, totalSize }

  // ❌ Bad
  return {
    data: data || [],
    totalSize: count || 0,
  }
  ```

- Use the following structure when creating a function

```
import assert from '@useweb/assert'

export type ${propsName} = {name: string}

    export default async function ${camelCase}(props: ${propsName}) {
      assert<${propsName},>({ props, requiredProps: ['name'] })

      const name = props.name

      return { name }
    }

    export type ${returnName} = ReturnType<typeof ${camelCase}>
```

- use crossfetch instead of fetch, eg 'import crossfetch from 'cross-fetch'

# React components

- When using @useweb/ui components, check \*\*/@useweb/ui/<componentname>/index.d.ts for proper types and props
- style all components using the sx prop
- always use css grid over flex
- use src/lib/components/dataDisplay/charts/types/LineChart/LineChart.tsx for line charts
- use the @useweb/ui/Text component for text. for example:

```typescript
import Text from '@useweb/ui/Text'
  <Text text="Hello World" />
```

- use the @useweb/ui/Box instead of @mui/material/Box
- use the @useweb/ui/Button instead of @mui/material/Button
- use the @useweb/ui/Image component for images
- always add the data-id prop to the root element of the component, same name as the component
- always use the @useweb/ui/Link component for links

````typescript

# Supabase

- .eq in a Supabase query must always include a satisfies type check for the data
  for example:

```typescript
.eq(
      'id' satisfies keyof DataSchema,
      props.id satisfies DataSchema['id'],
    )
````
