/* eslint-disable no-undef */
const Enzyme = require('enzyme');
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// import 'react-native-gesture-handler/jestSetup';
// import 'setimmediate';

jest.mock('react-native-geolocation-service', () => {
  return {
    Geolocation: { requestAuthorization: jest.fn() },
  };
});
const originalConsoleError = console.error;
console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return;
  }

  originalConsoleError(message);
};

Enzyme.configure({ adapter: new Adapter() });
