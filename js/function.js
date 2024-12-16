function countsTime(startOfDay, endOfDay, startOfMeeting, duration) {
  function timeToMinutes(time) {
    const [hours, minutes] =
      time.split(':').map(Number);
    return hours * 60 + minutes;
  }
  const startDay = timeToMinutes(startOfDay);
  const endDay = timeToMinutes(endOfDay);
  const startMeeting = timeToMinutes(startOfMeeting);
  const endMeeting = startMeeting + duration;
  return startMeeting >= startDay && endMeeting <= endDay;
}
const meetingStart = '14:00';
const meetingDuration = 90; // продолжительность встречи в минутах
const workStart = '08:00';
const workEnd = '17:30';


const isWithinWorkingHours = countsTime(workStart, workEnd, meetingStart, meetingDuration);


if (isWithinWorkingHours) {
  // eslint-disable-next-line no-alert
  alert('Встреча укладывается в рабочий день.');
} else {
  // eslint-disable-next-line no-alert
  alert('Встреча не укладывается в рабочий день.');
}
