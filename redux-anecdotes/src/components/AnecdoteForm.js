import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    // const newAnecdote = await anecdoteService.createNew(content)
    // console.log('newAnecdote in addAnecdote', newAnecdote)
    props.createAnecdote(content);
    props.setNotification(`you added anecdote: '${content}'`, 5);
    // props.store.dispatch(createAnecdote(content));
    // props.store.dispatch(notificationAdded(content));
    // setTimeout(() => {
    //   props.clearNotification()
    //   // props.store.dispatch(clearNotification())
    // }, 5000)
  };

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="anecdote" />
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const mapDispatchToProps =  {
    setNotification,
    createAnecdote
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
// const ConnectedAnectodeForm = connect(null, mapDispatchToProps)(AnecdoteForm)

// export default ConnectedAnectodeForm