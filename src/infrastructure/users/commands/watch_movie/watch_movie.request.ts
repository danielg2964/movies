import { S } from "fluent-json-schema";

export const WatchMovieRequest = S.object()
  .prop("user_uuid", S.string()).required()
  .prop("movie_uuid", S.string()).required();

export type WatchMovieRequest = {
  user_uuid: string;
  movie_uuid: string;
}
