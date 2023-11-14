import shoe1 from '../assets/Image/shoe1.jpg';
import shoe2 from '../assets/Image/shoe2.jpg';
import shoe3 from '../assets/Image/shoe3.jpg';
import shoe4 from '../assets/Image/shoe4.jpg';
import shoe5 from '../assets/Image/shoe5.png';
import shoe6 from '../assets/Image/shoe6.png';
import shoe7 from '../assets/Image/shoe7.png';
import shoe8 from '../assets/Image/shoe8.png';
import shoe9 from '../assets/Image/shoe9.png';
import detail1 from '../assets/Image/details1.jpg';
import detail2 from '../assets/Image/details2.jpg';
import detail3 from '../assets/Image/details3.jpg';
import ozelia1 from '../assets/Image/ozelia1.jpg';
import ozelia2 from '../assets/Image/ozelia2.jpg';
import ozelia3 from '../assets/Image/ozelia3.jpg';
import wd1 from '../assets/Image/4wd1.webp';
import wd2 from '../assets/Image/4wd2.webp';
import wd3 from '../assets/Image/4wd3.jpg';
import boost1 from '../assets/Image/boost1.png';
import boost2 from '../assets/Image/boost2.png';
import boost3 from '../assets/Image/boost3.png';
import { ShoeModel } from '../models/shoesModel';

const ShoesData: ShoeModel[] = [
  {
    id: 1,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe1,
    harga: '100.00',
    tag: 'new',
    gambar: [shoe1, detail1, detail2, detail3],
    color: [
      {
        nama: 'navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 2,
    nama: 'ADIDAS OZELIA SHOES',
    thumbnail: shoe2,
    harga: '125.00',
    Discount: 20,
    gambar: [shoe2, ozelia1, ozelia2, ozelia3],
    color: [
      {
        nama: 'navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 3,
    nama: 'ADIDAS 4DFWD PULSE 2.0',
    thumbnail: shoe3,
    harga: '145.00',
    gambar: [shoe3, wd1, wd2, wd3],
    color: [
      {
        nama: 'navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 4,
    nama: 'ADIDAS ULTRABOOST 1.0 DNA DARK GREEN UNISEX ORIGINAL',
    thumbnail: shoe4,
    harga: '175.00',
    Discount: 20,
    gambar: [shoe4, boost1, boost2, boost3],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 5,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe5,
    harga: '125.00',
    tag: 'new',
    gambar: [shoe5],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 6,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe6,
    harga: '125.00',
    Discount: 20,
    gambar: [shoe6],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 7,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe7,
    harga: '125.00',
    gambar: [shoe7],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 8,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe8,
    harga: '125.00',
    Discount: 20,
    gambar: [shoe8],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
  {
    id: 9,
    nama: 'ADIDAS 4DFWD X PARLEY RUNNING SHOES',
    thumbnail: shoe9,
    harga: '125.00',
    Discount: 20,
    gambar: [shoe9],
    color: [
      {
        nama: 'Shadow Navy',
        color: '#253043',
      },
      {
        nama: 'Army Green',
        color: '#707E6E',
      },
    ],
  },
];
export default ShoesData;
