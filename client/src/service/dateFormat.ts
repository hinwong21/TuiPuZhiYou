export function dateFormat(date: Date): string {
  const inputDate = new Date(date);
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");

  return `${year} - ${month} - ${day}`;
}
