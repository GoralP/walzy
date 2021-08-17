import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  authReducers,
  profileReducers,
  allWallpaperRingoneReducers,
  DownloadReducers,
  favoriteReducers,
  feedbackReducers,
  tagSearchReducers,
} from "./reducers";

const rootReducer = combineReducers({
  authReducers,
  profileReducers,
  allWallpaperRingoneReducers,
  DownloadReducers,
  favoriteReducers,
  feedbackReducers,
  tagSearchReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
