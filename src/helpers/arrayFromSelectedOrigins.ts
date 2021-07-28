import { ISelectedOrigins } from "features/products/types";

export const makeArrayOfSelectedOrigins = (origins: string): ISelectedOrigins[] => {
  const originsQuery = origins
    .split(",")
    .map((item) => Object({ label: `${item[0].toUpperCase()}${item.substr(1)}`, value: item }));

  return originsQuery;
};
