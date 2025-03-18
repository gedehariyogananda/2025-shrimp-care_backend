export class FormatterHelper {
  static percentage(value: number, decimals: number = 0): string {
    return `${value.toFixed(decimals)}%`;
  }
}
