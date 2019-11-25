import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
// import anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'
// import Filter from './components/Filter'

const App = (props) => {
  useEffect(() => {
    props.initAnecdotes()
  }, [props])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)