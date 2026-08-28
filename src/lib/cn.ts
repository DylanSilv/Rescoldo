/** Une clases ignorando valores vacíos. Suficiente para el tamaño del proyecto. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
