import { Product } from './shoesModel';

type PaginationEntity = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Product[];
};



export default PaginationEntity;
