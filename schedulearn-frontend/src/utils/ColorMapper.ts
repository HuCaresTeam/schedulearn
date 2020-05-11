import { Constants } from "src/Constants";

export class ColorMapper {
  private static decimalToHex(value: number, padding: number): string {
    let hex = value.toString(16);
    if (hex.length < padding) {
      hex = "0".repeat(padding - hex.length) + hex;
    }

    return hex;
  }

  private static hexToRgb(colorHex: string): number[] {
    const [redHex, greenHex, blueHex] = [...colorHex.match(/.{2}/g)];

    const red = parseInt(redHex, 16);
    const green = parseInt(greenHex, 16);
    const blue = parseInt(blueHex, 16);

    return [red, green, blue];
  }

  private static avgColor(colorHex: string, ethalonHex: string): string {
    const [r, g, b] = this.hexToRgb(colorHex);
    const [er, eg, eb] = this.hexToRgb(ethalonHex);

    const newR = Math.ceil((r + er) / 2);
    const newG = Math.ceil((g + eg) / 2);
    const newB = Math.ceil((b + eb) / 2);

    const hexR = this.decimalToHex(newR, 2);
    const hexG = this.decimalToHex(newG, 2);
    const hexB = this.decimalToHex(newB, 2);

    return `${hexR}${hexG}${hexB}`;
  }

  public static getHex(color: string): string {
    return color.substring(1);
  }

  public static generateColorFromId(colorId: number, ethalonColor: string): string {
    const ethalonColorHex = this.getHex(ethalonColor);
    const colorMapped = Constants.colorMapped;
    const mappedId = colorMapped[colorId % colorMapped.length];

    const mappedColor = Math.floor(((255 * 225 * 255) / colorMapped.length) * mappedId);
    const colorHex = this.decimalToHex(mappedColor, 6);
    const avgColorHex = this.avgColor(colorHex, ethalonColorHex);

    return `#${avgColorHex}`;
  }

  public static getFontColorByBackgroud(color: string, lightColor?: string, darkColor?: string): string {
    if (!lightColor)
      lightColor = "#FFFFFF";
    if (!darkColor)
      darkColor = "#000000";

    const colorHex = this.getHex(color);
    const [r, g, b] = this.hexToRgb(colorHex);

    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 160) ? darkColor : lightColor;
  }
}