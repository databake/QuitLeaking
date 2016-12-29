
import React from 'react';
import { Platform, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import configureStore from './store/configureStore';
import navigationContext from '../navigation/CustomNavigationContext';

const store = configureStore();
export default class App extends React.Component {

constructor(props) {
    super(props);
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <Provider store={store}>
          <NavigationProvider context={navigationContext}>
            <StackNavigation
              id="root"
              navigatorUID="root"
              initialRoute={Platform.OS === 'android' ? 'drawerNavigation' : 'tabNavigation'}
            />
          </NavigationProvider>
        </Provider>
      </View>
    );
  }
}
