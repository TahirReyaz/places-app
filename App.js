import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './navigation/Navigator';
import placesReducer from './store/places-reducer';
import { init } from './helpers/db';

init().then(() => {
  console.log('Initaited');
}).catch(err => console.log(err));

enableScreens();

const rootReducer= combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
