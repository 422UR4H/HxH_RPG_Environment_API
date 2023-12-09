export function dateFormat(date: string | Date) {
  if (typeof date !== 'string') date = date.toISOString();
  return date.split('T')[0].split('-').reverse().join('-');
}
