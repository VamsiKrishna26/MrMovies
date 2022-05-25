import {combineReducers} from 'redux';
import MoviesReducer from './titles/titles.reducer';
import userReducer from './user/user.reducer';

const rootReducer=combineReducers({
    movies:MoviesReducer,
    user:userReducer
});

export default rootReducer;