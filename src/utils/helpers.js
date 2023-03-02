
export const getFormattedDate = (val) => {
  let date = new Date(val);
  let formattedDate = date.toDateString();
  return formattedDate;
}