export type ReplaceEmojiCodeWithEmojiProps = { input: string }

export default function replaceEmojiCodeWithEmoji(
  props: ReplaceEmojiCodeWithEmojiProps,
): {
  string: string
} {
  const match = props.input.match(/&#(\d+);/)
  if (match) {
    const emoji = String.fromCodePoint(parseInt(match[1]))
    return {
      string: props.input.replace(/&#\d+;/, emoji),
    }
  }
  return { string: props.input }
}

export type ReplaceEmojiCodeWithEmojiReturn = ReturnType<typeof replaceEmojiCodeWithEmoji>
