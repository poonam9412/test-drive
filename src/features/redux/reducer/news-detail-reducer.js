import {NEWSDETAIL, ERROR} from './../action/action-types'
export function newsDetailReducer(state, action) {
    switch (action.type) {
        case NEWSDETAIL:
            const detailValue =( action.payload.articles || []).find((e,i)=> e.title === action.id)
            return { ...state, data: detailValue}
        case ERROR:
            return { ...state, err: action.payload }
        default:
            return { ...state }
    }

}