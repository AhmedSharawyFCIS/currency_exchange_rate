import React from 'react';
import Home from '../src/screens/home';
import { mount, shallow } from 'enzyme';
import { act } from 'react-test-renderer';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const setLoadingGetLocation = jest.fn();
const setLocation = jest.fn();
const setShowNotificationsPermission = jest.fn();
const navigate = jest.fn();
const setup = ({
  loadingGetLocation = false,
  location = '',
  showNotificationPermission = true,
  isMount = true,
}) => {
  React.useState = jest
    .fn()
    .mockReturnValueOnce([loadingGetLocation, setLoadingGetLocation])
    .mockReturnValueOnce([location, setLocation])
    .mockReturnValueOnce([
      showNotificationPermission,
      setShowNotificationsPermission,
    ]);
  const wrapper = isMount
    ? mount(<Home />)
    : shallow(<Home navigation={{ navigate }} />);
  return wrapper;
};

const getTheLocation = (country, isReject) => {
  if (isReject) {
    axios.get = jest.fn().mockRejectedValue(new Error('error'));
  } else {
    axios.get = jest.fn().mockResolvedValue({ data: { address: { country } } });
  }

  Geolocation.getCurrentPosition = jest.fn().mockImplementationOnce((resolve) =>
    resolve({
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    })
  );
};
it('renders Home correctly', () => {
  const wrapper = setup({});
  expect(wrapper).toBeDefined();
});

describe('checkLocationPermission', () => {
  beforeEach(() => {
    setLocation.mockClear();
  });

  describe('checks the location in android', () => {
    beforeAll(() => (Platform.OS = 'android'));
    PermissionsAndroid.requestMultiple = jest.fn().mockReturnValue({
      'android.permission.ACCESS_FINE_LOCATION': 'granted',
      'android.permission.ACCESS_COARSE_LOCATION': 'granted',
    });
    it('checks that current location getted successfully when there is the permission', async () => {
      const country = 'Egypt';
      getTheLocation(country);
      await act(async () => {
        setup({});
      });
      expect(setLocation).toHaveBeenCalledWith(country);
    });

    it('checks that current location not getted successfully when there is the permission but GeoLocation Failed', async () => {
      Geolocation.getCurrentPosition = jest
        .fn()
        .mockImplementationOnce((_, reject) => reject());

      setup({});

      expect(setLocation).not.toHaveBeenCalled();
    });

    it('checks that current location not getted successfully when there is the permission but transform the lat and lng failed', async () => {
      const country = 'Egypt';
      getTheLocation(country, true);
      await act(async () => {
        setup({});
      });
      expect(setLocation).not.toHaveBeenCalled();
    });
  });

  describe('checks the location in ios', () => {
    beforeAll(() => (Platform.OS = 'ios'));
    it('checks that location not getted when there is no permission', async () => {
      Geolocation.requestAuthorization = jest.fn();
      setup({});

      expect(setLocation).not.toHaveBeenCalled();
    });
    it('checks that location getted when there is the permission', async () => {
      Geolocation.requestAuthorization = jest.fn().mockReturnValue('granted');

      const country = 'Ghana';
      getTheLocation(country);

      await act(async () => {
        setup({});
      });
      expect(setLocation).toHaveBeenCalledWith(country);
    });
  });
});

describe('ConfirmationPopup', () => {
  beforeEach(() => {
    setShowNotificationsPermission.mockClear();
  });

  const wrapper = setup({ isMount: false });
  const ConfirmationPopup = wrapper.find('Memo()').last();

  it('checks that onPressConfirmReceiveNotifications triggered', () => {
    ConfirmationPopup.props().onPressPositiveButtonCB();
    expect(setShowNotificationsPermission).toHaveBeenCalledWith(false);
  });
  it('checks that onPressDenyReceiveNotifications triggered', () => {
    ConfirmationPopup.props().onPressNegativeButtonCB();
    expect(setShowNotificationsPermission).toHaveBeenCalledWith(false);
  });
});

it('checks that onPressShowCurrencyRate triggered', () => {
  const wrapper = setup({ isMount: false });
  const TouchableOpacity = wrapper.find('TouchableOpacity').last();
  TouchableOpacity.simulate('press');
  expect(navigate).toHaveBeenCalled();
});
