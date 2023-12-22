import axios from "axios";
import Cookies from "js-cookie";
import { History } from "history";

export const getCurrentUser = (token) => {
    return dispatch => {
        axios(`https://api.escuelajs.co/api/v1/auth/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data))
                dispatch({ type: 'GET_CURRENT-USER', payload: data })
                history.push('/admin')
            })
    }
}

export const getUser = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'))
        dispatch({ type: 'GET_USER', payload: user })
    }
}

export const logout = () => {
    return dispatch => {
        Cookies.remove('token')
        localStorage.removeItem('token')
        localStorage.removeItem('item')
        dispatch({ type: 'LOGOUT' })
        history.push('/')
    }
}


export const signIn = (data) => {
    return (dispatch) => {
        axios.post(`https://api.escuelajs.co/api/v1/auth/login`, data)
            .then(({ data }) => {
                Cookies.set('token', data.access_token)
                localStorage.setItem('token', data.access_token)
                dispatch({ type: 'SIGN_IN', payload: data })
                dispatch(getCurrentUser(data.access_token))
            })
    }
}