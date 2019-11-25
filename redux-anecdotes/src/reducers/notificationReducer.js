const reducer = (state = null, action) => {
  switch (action.type) {
    // case 'ADD_NOTIFICATION':
    //     return `you added anecdote: '${action.anecdote.content}'`
    // case 'VOTE_NOTIFICATION':
    //     return `you voted '${action.anecdote}'`
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION': 
      return null
    default: return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, (time * 1000));
  }
}
// export const notificationVote = (anecdote) => {
//   return {
//     type: 'VOTE_NOTIFICATION',
//     anecdote
//   }
// }

// export const notificationAdded = (anecdote) => {
//   return {
//     type: 'ADD_NOTIFICATION',
//     anecdote
//   }
// }

// export const clearNotification = () => {
//   return {
//     type: 'CLEAR_NOTIFICATION'
//   }
// }

export default reducer