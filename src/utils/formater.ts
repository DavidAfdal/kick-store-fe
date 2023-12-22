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

export function FormatDateToDDMMYYYY(date : Date) {
  const year = date.getFullYear();

  // Get month and pad with leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0');

  // Get day and pad with leading zero if needed
  const day = date.getDate().toString().padStart(2, '0');

  // Concatenate the formatted date parts
  const formattedDate = day + '/' + month + '/' + year;

  return formattedDate;
}

export function DeliverdDay(date : Date) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + 1);
  return FormatDateToDDMMYYYY(newDate);
}

