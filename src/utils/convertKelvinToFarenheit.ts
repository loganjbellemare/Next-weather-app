export function convertKelvinToFahrenheit(kelvin: number): number {
  // Convert Kelvin to Fahrenheit
  const fahrenheit: number = ((kelvin - 273.15) * 9) / 5 + 32;
  return Math.floor(fahrenheit);
}
