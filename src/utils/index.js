import moment from 'moment';

const formatDate = (date) => moment(date).format('YYYY-MM-DD');
const formatDateForChart = (date) => moment(date).format('DDMMMYY');
const subtractDate = (date, count, type) =>
  formatDate(moment(date).subtract(count, type));

export { formatDate, formatDateForChart, subtractDate };
