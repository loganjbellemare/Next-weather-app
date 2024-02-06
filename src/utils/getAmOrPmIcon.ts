export function getAmOrPmIcon(iconName: string, dateTimeString: string) {
  const hours = new Date(dateTimeString).getHours(); //get hours from input date
  const isDayTime = hours >= 6 && hours < 18; //confirm time is between 6am and 6pm for daytime
  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n"); //replace second character in iconName with d for daytime if time is AM, and n for nighttime if time is PM
}
