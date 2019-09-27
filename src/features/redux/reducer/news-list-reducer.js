import {NEWSLIST, ERROR} from './../action/action-types'
// import {NewsList} from '../state/newlist'
export function newsListReducer(state, action) {
    switch (action.type) {
        case NEWSLIST:
            return { ...state, data: action.payload }
        case ERROR:
            return { ...state, err: action.payload }
        default:
            return { ...state }
    }
}
