export const checkNewProduct = (createdAt : Date) => {
    let isProductNew = false;
    if (createdAt) {
      isProductNew = new Date(Date.now()).getDate() === new Date(createdAt).getDate() && new Date(Date.now()).getMonth() === new Date(createdAt).getMonth() && new Date(Date.now()).getFullYear() === new Date(createdAt).getFullYear();
    } 
    return isProductNew
}