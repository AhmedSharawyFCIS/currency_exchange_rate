import React, { useEffect } from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../theme';
import services from '../../services';
import Loading from '../../components/loading';
import ConfirmationPopup from '../../components/confirmationPopup';
import commonStyles from '../../theme/commonStyles';
const Home = (props) => {
  const { useState } = React;
  const { navigation } = props;
  const [loadingGetLocation, setLoadingGetLocation] = useState(false);
  const [location, setLocation] = useState('');
  const [showNotificationPermission, setShowNotificationsPermission] =
    useState(true);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    setLoadingGetLocation(true);
    Geolocation.getCurrentPosition(
      async (locationParam) => {
        const { latitude, longitude } = locationParam.coords;
        const addressData = await services.getLocation(latitude, longitude);
        setLocation(addressData?.country);
        setLoadingGetLocation(false);
      },
      () => {
        setLoadingGetLocation(false);
      },
      { timeout: 20000, enableHighAccuracy: true, maximumAge: 1000 }
    );
  };

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const fineLocationPermission = 'android.permission.ACCESS_FINE_LOCATION';
      const coarseLocationPermission =
        'android.permission.ACCESS_FINE_LOCATION';

      const granted = await PermissionsAndroid.requestMultiple([
        fineLocationPermission,
        coarseLocationPermission,
      ]);
      if (
        granted[fineLocationPermission] === 'granted' &&
        granted[coarseLocationPermission] === 'granted'
      ) {
        getCurrentLocation();
      }
    } else {
      const result = await Geolocation.requestAuthorization('always');
      if (result === 'granted') {
        getCurrentLocation();
      } else {
        Linking.openURL('app-settings:');
      }
    }
  };

  const onPressShowCurrencyRate = () =>
    navigation.navigate('currencyExchangeRate');

  const onPressConfirmReceiveNotifications = () =>
    setShowNotificationsPermission(false);

  const onPressDenyReceiveNotifications = () =>
    setShowNotificationsPermission(false);

  return (
    <View style={[commonStyles.flex, styles.container]}>
      <Loading visible={loadingGetLocation} />
      <ConfirmationPopup
        visible={showNotificationPermission}
        text="Do you want to receive notifications from the app?"
        onPressPositiveButtonCB={onPressConfirmReceiveNotifications}
        onPressNegativeButtonCB={onPressDenyReceiveNotifications}
      />
      <Text style={styles.header}>Where do you come from?</Text>
      <View>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[commonStyles.centerContainer, styles.button]}
        onPress={onPressShowCurrencyRate}
      >
        <Text style={styles.buttonText}>Show currency exchange rate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(20),
  },
  header: {
    fontSize: RFValue(17),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    height: RFValue(40),
    marginVertical: RFValue(20),
    borderRadius: RFValue(6),
    padding: RFValue(5),
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: RFValue(6),
    padding: RFValue(15),
  },
  buttonText: {
    color: colors.white,
  },
});
