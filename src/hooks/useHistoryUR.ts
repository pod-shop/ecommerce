import { Reducer, useReducer } from 'react';

export type State<T> = {
  past: Array<T | undefined>;
  present?: T;
  future: Array<T | undefined>;
}

export type Action<T> = {
  type: string;
  payload?: T
}

const reducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO':
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    case 'REDO':
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    case 'ADD':
      if (present === action.payload) {
        return state;
      }

      return {
        past: [...past, present],
        present: action.payload,
        future: []
      }
    case 'RESET':
      return {
        past: [],
        present: action.payload,
        future: []
      }
    case 'CLEAR':
      return {
        past: [],
        present: undefined,
        future: []
      }
    default:
      throw new Error('Action not supported');
  }
}

/**
 * Undoable and redoable history.
 * 
 * @param initialPayload the initial value in the history
 */
export default <T>(initialPayload?: T) => {
  const initialState: State<T> = { past: [], present: initialPayload, future: [] };

  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(reducer, initialState);

  const values = {
    previous: state.past,
    current: state.present,
    next: state.future
  }

  const actions = {
    undo: () => dispatch({
      type: 'UNDO'
    }),
    redo: () => dispatch({
      type: 'REDO'
    }),
    add: (payload: T) => dispatch({
      type: 'ADD',
      payload
    }),
    reset: () => dispatch({
      type: 'RESET',
      payload: initialState.present
    }),
    clear: () => dispatch({
      type: 'CLEAR'
    })
  }

  return {
    ...values,
    ...actions,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0
  };
}
