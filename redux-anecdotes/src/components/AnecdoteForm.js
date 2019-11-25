import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    props.setNotification(`you added anecdote: '${content}'`, 5);
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
