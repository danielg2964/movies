import { Type, type Static } from "@sinclair/typebox";

export const WatchMovieRequest = Type.Object({
  user_uuid: Type.String(),
  movie_uuid: Type.String()
});

export type WatchMovieRequest = Static<typeof WatchMovieRequest>

