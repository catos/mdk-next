export default function toUpperFirst(text: string) {
  if (text.length < 1) {
    return text
  }

  return text.charAt(0).toUpperCase() + text.slice(1)
}