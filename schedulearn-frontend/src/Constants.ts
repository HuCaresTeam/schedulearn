import shuffleseed from "shuffle-seed";

export class Constants {
  public static readonly host = "https://localhost:44383";
  public static readonly colorMapped = shuffleseed.shuffle([...Array(2000).keys()], 1);
}
