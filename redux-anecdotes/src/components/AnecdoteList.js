import React from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    const updateAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    };
    props.voteAnecdote(updateAnecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
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
  );
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
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
