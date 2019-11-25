import anecdoteService from '../services/anecdotes';

const asObject = (anecdote) => {
  console.log('asObject runs with anecdote:', anecdote);
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const aneToChange = state.find((e) => e.id === id);
      const changedAne = {
        ...aneToChange,
        votes: aneToChange.votes + 1
      };
      return state.map((ane) => (ane.id !== id ? ane : changedAne));
    case 'NEW_ANECDOTE':
      const content = action.data;
      const newAnecdote = asObject(content);
      return [...state, newAnecdote];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
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
    const id = updatedAnecdote.id;
    dispatch({
      type: 'VOTE',
      data: { id }
    });
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
