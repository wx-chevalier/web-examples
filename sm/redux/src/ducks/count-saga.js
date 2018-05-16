export default function counter(state = 0, action) {
  switch (action.type) {
    case 'SAGA_INCREMENT':
      return state + 1
    case 'SAGA_INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state
    case 'SAGA_DECREMENT':
      return state - 1
    default:
      return state
  }
}