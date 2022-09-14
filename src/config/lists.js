import { subtractDate, formatDate } from '../utils';

const dates = [
  {
    label: '1D',
    value: formatDate(new Date()),
  },
  {
    label: '1M',
    value: `${subtractDate(formatDate(new Date()), 1, 'M')}..${formatDate(
      new Date()
    )}`,
  },
  {
    label: '3M',
    value: `${subtractDate(formatDate(new Date()), 3, 'M')}..${formatDate(
      new Date()
    )}`,
  },
  {
    label: '1Y',
    value: `${subtractDate(formatDate(new Date()), 1, 'Y')}..${formatDate(
      new Date()
    )}`,
  },
  {
    label: '5Y',
    value: `${subtractDate(formatDate(new Date()), 5, 'Y')}..${formatDate(
      new Date()
    )}`,
  },
];

export default { dates };
