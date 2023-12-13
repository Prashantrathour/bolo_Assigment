import {legacy_createStore, applyMiddleware, combineReducers } from "redux"
import { reducer as allquestionreducer } from "./AllQuestion/reducer"
import { reducer as addform } from "./AddForm/reducer"
import {thunk} from "redux-thunk"
const rootreducer=combineReducers({allquestionreducer,addform})
export const store=legacy_createStore(rootreducer,applyMiddleware(thunk))