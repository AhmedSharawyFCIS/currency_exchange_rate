import React from 'react';
import CurrencyExchangeRate from '../src/screens/currencyExchangeRate';
import { mount, shallow } from 'enzyme';
import { act } from 'react-test-renderer';
import axiosInstance from '../src/axiosInstance';
import { formatDateForChart } from '../src/utils';

window.alert = jest.fn();

const setCurrencies = jest.fn();
const setCurrency1 = jest.fn();
const setCurrency2 = jest.fn();
const setDate = jest.fn();
const setCurrencyExchangeList = jest.fn();
const setLoadingCurrencyExchangeList = jest.fn();

const setup = ({
  currencies,
  currency1 = null,
  currency2 = null,
  date = '2022-10-10',
  currencyExchangeList = [],
  loadingCurrencyExchangeList = false,
  isMount = true,
}) => {
  React.useState = jest
    .fn()
    .mockReturnValueOnce([currencies, setCurrencies])
    .mockReturnValueOnce([currency1, setCurrency1])
    .mockReturnValueOnce([currency2, setCurrency2])
    .mockReturnValueOnce([date, setDate])
    .mockReturnValueOnce([currencyExchangeList, setCurrencyExchangeList])
    .mockReturnValueOnce([
      loadingCurrencyExchangeList,
      setLoadingCurrencyExchangeList,
    ]);

  const wrapper = isMount
    ? mount(<CurrencyExchangeRate />)
    : shallow(<CurrencyExchangeRate />);
  return wrapper;
};

it('renders CurrencyExchangeRate correctly', () => {
  const wrapper = setup({});
  expect(wrapper).toBeDefined();
});

it('checks that getCurrencies runs successfully', async () => {
  const currency = 'EGP';
  axiosInstance.get = jest
    .fn()
    .mockResolvedValue({ data: { [currency]: 'Egypt' } });

  await act(async () => {
    setup({});
  });

  expect(setCurrencies).toHaveBeenCalledWith([
    { label: currency, value: currency },
  ]);
});

describe('setCurrencyExchangeList', () => {
  beforeEach(() => setCurrencyExchangeList.mockClear());

  it('checks that setCurrencyExchangeList called successfully when the two currencies chosen with single date', async () => {
    const date = '2018-12-31';
    const value = 0.8785;
    axiosInstance.get = jest.fn().mockResolvedValue({
      data: { rates: { EGP: 0.8785 } },
    });
    await act(async () => {
      setup({ currency1: 'USD', currency2: 'EGP', date });
    });

    expect(setCurrencyExchangeList).toHaveBeenCalledWith([
      { label: formatDateForChart(date), value },
    ]);
  });

  it('checks that setCurrencyExchangeList called successfully when the two currencies chosen with multiple dates', async () => {
    const date1 = '2018-12-31';
    const date2 = '2019-01-07';
    const value1 = 0.8785;
    const value2 = 0.87093;
    axiosInstance.get = jest.fn().mockResolvedValue({
      data: {
        rates: {
          [date1]: { EUR: value1 },
          [date2]: { EUR: value2 },
        },
      },
    });
    await act(async () => {
      setup({ currency1: 'USD', currency2: 'EUR' });
    });

    expect(setCurrencyExchangeList).toHaveBeenCalledWith([
      { label: formatDateForChart(date1), value: value1 },
      { label: formatDateForChart(date2), value: value2 },
    ]);
  });

  it('checks that setCurrencyExchangeList called with empty list when the two currencies chosen but there is an error from the request itself', async () => {
    axiosInstance.get = jest.fn().mockRejectedValue(new Error('err'));
    await act(async () => {
      setup({ currency1: 'USD', currency2: 'EGP' });
    });

    expect(setCurrencyExchangeList).toHaveBeenCalledWith([]);
  });

  it('checks that setCurrencyExchangeList called with empty list when the two currencies are the same', async () => {
    await act(async () => {
      setup({ currency1: 'USD', currency2: 'USD' });
    });

    expect(setCurrencyExchangeList).toHaveBeenCalledWith([]);
  });
});

it('checks that ActivityIndicator appears when ActivityIndicator is true', () => {
  const wrapper = setup({ loadingCurrencyExchangeList: true });

  expect(wrapper.find('ActivityIndicator')).toBeDefined();
});
