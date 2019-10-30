import React from 'react';
import axios from 'axios';

export default function Fib() {
  const [ state, setState ] = React.useState({
    seenIndexes: [],
    values: {},
    index: ''
  })

  React.useEffect(() => {
    fetchIndexes()
    fetchValues()
  }, [])

  async function fetchValues() {
    const values = await axios.get('/api/values/current');
    setState(curr => ({...curr, values: values.data}))
  }

  async function fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all')
    setState(curr => ({...curr, seenIndexes: seenIndexes.data}))
  }

  function renderSeenIndexes() {
    return state.seenIndexes.map(({number}) => number).join(', ');
  }

  function renderValues() {
    const entries = [];

    console.log('----- values:', state.values);

    for (let key in state.values) {
      entries.push(
        <div key={key}>
         For index {key} I calculated {state.values[key]}
        </div>
      )
    }

    return entries;
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log('-------- submitting:', state.index);
    await axios.post('/api/values', {
      index: state.index
    })
    setState(curr => ({...curr, index: ''}))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your Index:</label>
        <input value={String(state.index)} onChange={e => {
          console.log("------- change:", e.currentTarget.value)
          setState({
            ...state,
            index: e.currentTarget.value
          })
        }}/>
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}

    </div>
  )
}