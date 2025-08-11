import { Genre } from "./Genre";
import { Platforms } from "./Platforms";
import { Publishers } from "./Publishers";

export interface Game {
  id: number;
  name: string;
  slug: string;
  genres: Genre[];
  publishers: Publishers[];
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platforms }[];
  metacritic: number;
  rating_top: number;
}
