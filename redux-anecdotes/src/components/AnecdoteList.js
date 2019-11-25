import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
// import {
//   notificationVote,
//   clearNotification
// } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const anecdotes = props.anecdotes;
  // // const anecdotes = props.store.getState().anecdotes
  // const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  // const filter = props.filter;
  // // const filter = props.store.getState().filter
  // const filteredAnecdotes = [];
  // if (filter) {
  //   anecdotes.map((anecdote) => {
  //     if (anecdote.content.toUpperCase().includes(filter.toUpperCase())) {
  //       return filteredAnecdotes.push(anecdote);
  //     }
  //     return null;
  //   });
  // }

  console.log('props.visibleAnecdotes', props.visibleAnecdotes)

  const vote = (anecdote) => {
    const updateAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    console.log('updateAnecdote', updateAnecdote)
    props.voteAnecdote(updateAnecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
    // props.store.dispatch(voteAnecdote(anecdote.id));
    // props.store.dispatch(notificationVote(anecdote.content));
    // setTimeout(() => {
    //   props.clearNotification();
    //   // props.store.dispatch(clearNotification())
    // }, 5000);
  };

  return (
    <div>
      <Filter />
      {props.visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  const sort = (anecdotes) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
    return sortedAnecdotes;
  };

  if (filter) {
    const filteredAnecdotes = [];
    anecdotes.map((anecdote) => {
      if (anecdote.content.toUpperCase().includes(filter.toUpperCase())) {
        return filteredAnecdotes.push(anecdote);
      } else {
        return null;
      }
    });
    return sort(filteredAnecdotes);
  } else {
    return sort(anecdotes);
  }
};

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps =  {
    voteAnecdote,
    setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
