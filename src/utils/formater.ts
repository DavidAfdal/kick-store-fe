const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export const ConvertRupiah = (price?: number | string) => {
  if (!price) {
    return;
  }
  if (typeof price === 'string') {
    return formatter.format(parseInt(price));
  }
  return formatter.format(price);
};

