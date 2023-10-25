export const dateFormatter = (date: string) => {
  const onlyDate = date.split('T')[0];
  const day = onlyDate.split('-')[2];
  const month = onlyDate.split('-')[1];

  const year = onlyDate.split('-')[0];

  return `${day}/${month}/${year}`;
};
