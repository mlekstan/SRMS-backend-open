export function transformMinutesToInterval(timeMinutes: number) {
  const days = String(Math.floor(timeMinutes / (60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((timeMinutes % (60 * 24)) / 60)).padStart(2, "0");
  const minutes = String(Math.floor(timeMinutes % 60)).padStart(2, "0");

  return `${days} ${hours}:${minutes}`;
}