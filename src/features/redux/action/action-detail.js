import {NEWSDETAIL, ERROR} from './action-types'

export const newsDeatilAction = (i) => dispatch => {
    fetch("http://www.mocky.io/v2/5d8686a032000024b607b40e")
        .then(res =>
            res.json().then(data => dispatch({
                type: NEWSDETAIL,
                payload: data,
id:i
            })
            )
        )
        .catch(err => dispatch({ type: ERROR, payload: err.response.data }))
}