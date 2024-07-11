import { ShoeCart } from "./cartModels";

export type OrderType = {
    id: string;
    total_price: number;
    total_items: number;
    order_items: OrderItemModel[];
    payment: Payment;
    address: string;
    phone_number: string;
    user_id: number;
    createdAt: string;
    updatedAt: string;
}

export type PaginationHistory = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: OrderType[]
};


export type DashboardData = {
  totalStock: number,
  revanueMonth: number,
  salesMonth: number

}


export type OrderItemModel = {
    id: number;
    shoe_color: string;
    quantity: number;
    shoe_size: string;
    price:number;
    shoe_id: number;
    order_id: string;
    shoe: ShoeCart;
    createdAt: string;
    updatedAt: string;
  };

export type Payment = {
  id: number;
  grossAmount: number;
  paymentStatus: string;
  paymentUrl: string;
  order_id: string;
  createdAt: string;
  updatedAt: string;
}


//   "id": "Ddxv5BmaKD2EJbciSoISd",
//             "total_price": 2000000,
//             "total_items": 24,
//             "address": "pondok angsana 3",
//             "phone_number": "081803863937",
//             "createdAt": "2023-12-21T14:21:51.169Z",
//             "updatedAt": "2023-12-21T14:21:51.169Z",
//             "user_id": 2,
//             "order_items": [
//                 {
//                     "id": 3,
//                     "shoe_color": "Shadow Navy",
//                     "shoe_size": "38",
//                     "quantity": 1,
//                     "price": 1000000,
//                     "createdAt": "2023-12-21T14:21:51.267Z",
//                     "updatedAt": "2023-12-21T14:21:51.267Z",
//                     "shoe_id": 1,
//                     "order_id": "Ddxv5BmaKD2EJbciSoISd",
//                     "shoe": {
//                         "name": "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
//                         "category": "RUNNERS",
//                         "type": "MALE",
//                         "thumbImg": "http://res.cloudinary.com/diwllm935/image/upload/v1702839785/vr3t8uw1mh9te5cl6swn.jpg"
//                     }
//                 }
//             ]


