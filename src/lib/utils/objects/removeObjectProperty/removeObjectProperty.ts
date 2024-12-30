import type { PartialRequired } from '@useweb/use-data'

export type RemoveObjectPropertyProps<DataSchema> = {
  obj: PartialRequired<DataSchema>
  key: keyof DataSchema
}
/**
 * Override the delete operator to remove a property from an object error.
 */
export default function removeObjectProperty<DataSchema>(
  props: RemoveObjectPropertyProps<DataSchema>,
) {
  const obj = props.obj as any

  delete obj[props.key]
}

export type RemoveObjectPropertyReturn = ReturnType<typeof removeObjectProperty>
