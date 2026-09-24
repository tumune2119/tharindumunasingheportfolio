// Atbash is self-inverse (A<->Z, B<->Y, ...), so the same function both
// encodes and decodes — there's no separate "decode" needed.
export function atbash(input: string): string {
  return input.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= "Z" ? 65 : 97;
    return String.fromCharCode(base + (25 - (char.charCodeAt(0) - base)));
  });
}
