import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { formatDateForChart } from '../utils';

const getCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get('currencies');
    const currencies = Object.keys(data);
    const formattedCurrencies = currencies.map((currency) => {
      return { label: currency, value: currency };
    });
    return formattedCurrencies;
  } catch (error) {
    throw new Error(error);
  }
};

const getCurrenciesExchange = async (date, currency1, currency2) => {
  try {
    const { data } = await axiosInstance.get(
      `${date}?from=${currency1}&to=${currency2}`
    );
    const rates = Object.entries(data.rates);
    let is1d = false;

    if (rates.length === 1) {
      is1d = true;
    }
    const formattedData = rates.map(([itemDate, itemValue]) => {
      const formattedDate = formatDateForChart(is1d ? date : itemDate);
      return {
        label: `${formattedDate}`,
        value: is1d ? itemValue : itemValue[currency2],
      };
    });

    return formattedData;
  } catch (error) {
    throw new Error(error);
  }
};

const getLocation = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
    );
    return data.address;
  } catch (error) {
    throw new Error(error);
  }
};

export default { getCurrencies, getCurrenciesExchange, getLocation };
