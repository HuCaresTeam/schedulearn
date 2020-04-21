export default class TimeManipulator {
  public static getNearestThirtyMinuteInterval(date: Date): { start: Date; end: Date } {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const startTime = this.getTheNextThirtyMinutes(hour, minutes);
    const endTime = this.getTheNextThirtyMinutes(startTime.hour, startTime.minutes);

    // Special case of nearing end of day
    if (startTime.hour >= 23 && startTime.minutes >= 30)
      endTime.minutes = 59;

    const start = new Date(year, month, day, startTime.hour, startTime.minutes);
    const end = new Date(year, month, day, endTime.hour, endTime.minutes);
    return { start, end };
  }

  public static getTheNextThirtyMinutes(hour: number, minutes: number): { hour: number; minutes: number } {
    // Special case of nearing end of day
    if (hour >= 23 && minutes >= 30)
      return { hour: hour, minutes: 30 };

    if (minutes <= 30)
      return { hour, minutes: 30 };

    return { hour: hour + 1, minutes: 0 };
  }
}