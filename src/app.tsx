import * as React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Timer } from './components/Timer';
import './scss/app';
import { Setter } from './components/Setter';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToggleButton } from './components/ToggleButton';
import { HistoryList } from './components/HistoryList';

const persistor = persistStore(store);

export function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Timer></Timer>
				<Setter></Setter>
				<ToggleButton></ToggleButton>
				<HistoryList></HistoryList>
			</PersistGate>
		</Provider>
	)
}