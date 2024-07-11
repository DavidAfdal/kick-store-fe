

export type CartItemModel = {
  id: number;
  shoe_color: string;
  quantity: number;
  shoe_size: string;
  price:number;
  shoe_id: string;
  shoe: ShoeCart
};

export type ShoeCart = {
  name: string;
  category: string;
  type: string;
  thumbImg: string;
}


export type CartInput = {
  shoeId: number;
  cart_size: string;
  price: number
}
