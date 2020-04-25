import {createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from "./reducers/index";

let store;
if(process.env.NODE_ENV === 'production'){
  store = createStore(rootReducer);
}else{
  store = createStore(rootReducer, composeWithDevTools());
}

export default store;