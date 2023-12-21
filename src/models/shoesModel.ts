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

export type Product = {
  id: number;
  name: string;
  price: number;
  diskon: number;
  thumbImg: string;
  createdAt: Date;
};

export type ProductDetails = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  type: string;
  diskon: number;
  images: Omit<Images, 'type'>[];
  sizes: Size[];
  colors: Color[];
  createdAt: Date;
};

type Images = {
  url: string;
  type: string;
};

type Size = {
  size: number;
  stock: number;
};

type Color = {
  name: string;
  color: string;
};
