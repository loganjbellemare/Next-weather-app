export function convertToMph(mps: number): string {
  const metersInOneMile = 1609.34; // 1 mile is approximately 1609.34 meters
  const secondsInOneHour = 3600; // 1 hour is 3600 seconds

  // Convert meters per second to miles per hour
  const mph = (mps * secondsInOneHour) / metersInOneMile;
  return `${mph.toFixed(0)}mph`;
}
