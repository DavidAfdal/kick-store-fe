import { ColorModel } from './colorModel';

export type ShoeModel = {
  id: number;
  nama: string;
  thumbnail: string;
  harga: string;
  tag?: string;
  Discount?: number;
  gambar: string[];
  color: ColorModel[];
};
