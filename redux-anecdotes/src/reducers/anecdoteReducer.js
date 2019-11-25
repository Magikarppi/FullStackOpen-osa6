import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = anecdote => {
  console.log('asObject runs with anecdote:', anecdote)
  return {
    content: anecdote.content,
    id: anecdote.id,         //muutin getId()
    votes: anecdote.votes
  };
};

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      console.log('State in vote:', state)
      const aneToChange = state.find(e => e.id === id);
      console.log('anetochange', aneToChange)
      const changedAne = {
        ...aneToChange,
        votes: aneToChange.votes + 1
      };
      return state.map(ane => (ane.id !== id ? ane : changedAne));
    case 'NEW_ANECDOTE':
      const content = action.data;
      console.log('content:', content)
      const newAnecdote = asObject(content);
      console.log('newAnecdote', newAnecdote)
      return [...state, newAnecdote];
    case 'INIT_ANECDOTES': 
      return action.data
    default:
      return state;
  }

  // return state
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    const id = updatedAnecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

export default reducer;
