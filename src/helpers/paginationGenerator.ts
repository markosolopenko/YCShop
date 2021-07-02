export const paginationChange = (page: number, range: number): Array<string | number> => {
  switch (true) {
    case range < 6:
      return new Array(range).fill(null).map((_, index) => index + 1);
    case page < 4:
      return [1, 2, 3, 4, "...", range];
    case page > range - 3:
      return [1, "...", range - 3, range - 2, range - 1, range];
    default:
      return [1, "...", page - 1, page, page + 1, "...", range];
  }
};
