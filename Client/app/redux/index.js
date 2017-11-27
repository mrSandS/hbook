import { combineReducers, applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import notes from './reducers/notes';
import auth from './reducers/auth';

const rootReducer = combineReducers({
	notes,
	auth
})

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
)

export default store