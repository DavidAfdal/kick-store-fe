import { ColorModel } from './colorModel';

export type LikesModel = {
  id: number;
  nama: string;
  thumbnail: string;
  harga: string;
  tag?: string;
  Discount?: number;
  color: ColorModel[];
  like: boolean;
};
