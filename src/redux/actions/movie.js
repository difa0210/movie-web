import { INSERT_MOVIE } from "../constants";

const insertMovie = (data) => ({
  type: INSERT_MOVIE,
  payload: data,
});

export { insertMovie };
