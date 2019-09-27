import { combineReducers } from 'redux'
import {newsDetailReducer} from './news-detail-reducer'
import {newsListReducer} from './news-list-reducer'
export default combineReducers({
    newsListDATA:newsListReducer,
    newsDetail: newsDetailReducer
})