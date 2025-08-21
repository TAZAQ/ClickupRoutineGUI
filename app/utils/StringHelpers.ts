
export class StringHelpers {
  static padLeft(str: string, pad: string, length: number) {
    return (pad + str).slice(-length);
  }
}
