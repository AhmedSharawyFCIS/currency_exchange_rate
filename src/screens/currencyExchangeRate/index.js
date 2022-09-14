/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import services from '../../services';
import { colors } from '../../theme';
import Dropdown from './dropdown';
import { LineChart } from 'react-native-gifted-charts';
import { lists } from '../../config';

const CurrencyExchangeRate = () => {
  const { useState } = React;
  const { dates } = lists;
  const [currencies, setCurrencies] = useState([]);
  const [currency1, setCurrency1] = useState(null);
  const [currency2, setCurrency2] = useState(null);
  const [date, setDate] = useState(dates[0].value);
  const [currencyExchangeList, setCurrencyExchangeList] = useState([]);
  const [loadingCurrencyExchangeList, setLoadingCurrencyExchangeList] =
    useState(false);
  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const currenciesList = await services.getCurrencies();

        setCurrencies(currenciesList);
      } catch {}
    };
    getCurrencies();
  }, []);

  useEffect(() => {
    const getCurrenciesExchange = async () => {
      try {
        setLoadingCurrencyExchangeList(true);
        const currenciesList = await services.getCurrenciesExchange(
          date,
          currency1,
          currency2
        );
        setCurrencyExchangeList(currenciesList);
      } catch (error) {
        const message = error?.message;
        if (message) {
          alert(message);
        }
        setCurrencyExchangeList([]);
      } finally {
        setLoadingCurrencyExchangeList(false);
      }
    };
    const isTwoCurrenciesChosen = currency1 && currency2;
    if (isTwoCurrenciesChosen && currency1 === currency2) {
      alert('Please choose different currencies');
      setCurrencyExchangeList([]);
    } else if (isTwoCurrenciesChosen) {
      getCurrenciesExchange();
    }
  }, [date, currency1, currency2]);

  const renderDropdowns = () => (
    <View style={styles.dropdownsContainer}>
      <Dropdown
        data={currencies}
        color={colors.green}
        style={styles.dropdown}
        value={currency1}
        setValue={setCurrency1}
      />
      <Dropdown
        data={currencies}
        color={colors.orange}
        value={currency2}
        setValue={setCurrency2}
      />
    </View>
  );
  const renderDateDropdown = () => (
    <View style={styles.dateDropdownContainer}>
      <Dropdown
        data={dates}
        color={colors.lightGreen}
        searchable={false}
        dropdownStyle={styles.dateDropdownWidth}
        dropDownContainerStyle={styles.dateDropdownWidth}
        value={date}
        setValue={setDate}
      />
    </View>
  );
  const renderChart = () => (
    <View style={styles.chartCardContainer}>
      <View>{renderDateDropdown()}</View>
      <View style={styles.chartContainer}>
        {loadingCurrencyExchangeList && <ActivityIndicator />}
        <LineChart
          data={currencyExchangeList}
          xAxisTextNumberOfLines={2}
          xAxisLabelTextStyle={styles.chartLabelText}
          isAnimated
          width={RFValue(250)}
        />
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      <View style={styles.subContainer}>
        {renderDropdowns()}
        {renderChart()}
      </View>
    </ScrollView>
  );
};

export default CurrencyExchangeRate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexGrow: 1,
  },
  subContainer: {
    marginHorizontal: RFValue(16),
    marginTop: RFValue(20),
  },
  dropdownsContainer: {
    flexDirection: 'row',
    zIndex: 2000,
  },
  dropdown: {
    marginEnd: RFValue(16),
  },
  chartCardContainer: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    borderRadius: RFValue(6),
    marginTop: RFValue(50),
    padding: RFValue(10),
  },
  dateDropdownContainer: {
    alignItems: 'flex-end',
  },
  dateDropdownWidth: {
    width: RFValue(150),
  },

  chartContainer: {
    zIndex: -1,
    marginTop: RFValue(50),
    overflow: 'hidden',
  },

  chartLabelText: {
    marginEnd: RFValue(3),
    height: RFValue(40),
  },
});
