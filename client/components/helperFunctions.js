import dateFns from 'date-fns';

export const MonthinNum = date => {
  return Number(dateFns.format(date, 'MM/DD/YYYY').split('/')[0]);
};

export const YearinNum = date => {
  return Number(dateFns.format(date, 'MM/DD/YYYY').split('/')[2]);
};

export const DayinNum = date => {
  return Number(dateFns.format(date, 'MM/DD/YYYY').split('/')[1]);
};

export const transFormtimeOptions = [
  { key: '0', text: '1:00', value: '1:00' },
  { key: '1', text: '1:30', value: '1:30' },
  { key: '2', text: '2:00', value: '2:00' },
  { key: '3', text: '2:30', value: '2:30' },
  { key: '4', text: '3:00', value: '3:00' },
  { key: '5', text: '3:30', value: '3:30' },
  { key: '6', text: '4:00', value: '4:00' },
  { key: '7', text: '4:30', value: '4:30' },
  { key: '8', text: '5:00', value: '5:00' },
  { key: '9', text: '5:30', value: '5:30' },
  { key: '10', text: '6:00', value: '6:00' },
  { key: '11', text: '6:30', value: '6:30' },
  { key: '12', text: '7:00', value: '7:00' },
  { key: '13', text: '7:30', value: '7:30' },
  { key: '14', text: '8:00', value: '8:00' },
  { key: '15', text: '8:30', value: '8:30' },
  { key: '16', text: '9:00', value: '9:00' },
  { key: '17', text: '9:30', value: '9:30' },
  { key: '18', text: '10:00', value: '10:00' },
  { key: '19', text: '10:30', value: '10:30' },
  { key: '20', text: '11:00', value: '11:00' },
  { key: '21', text: '11:30', value: '11:30' },
  { key: '22', text: '12:00', value: '12:00' },
  { key: '23', text: '12:30', value: '12:30' },
];
