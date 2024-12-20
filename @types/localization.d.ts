import en from "../localization/en.json";

type Messages = typeof en;

type Paths<Schema, Path extends string = ""> = Schema extends string
  ? Path
  : Schema extends object
  ? {
      [K in keyof Schema & string]: Paths<
        Schema[K],
        `${Path}${Path extends "" ? "" : "."}${K}`
      >;
    }[keyof Schema & string]
  : never;
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}

  type TFunction = (key: Paths<Messages>) => string;
}
