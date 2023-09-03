import { useState } from 'react'

//random int function from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (max) => Math.floor(Math.random() * max)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const selectedVotes = votes[selected];

  const addVote = ()=>{
    const copy = [...votes];
    copy[selected]+=1;
    setVotes(copy);
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      has {selectedVotes} {selectedVotes===1?"vote":"votes"}
      <br/>
      <Button handleClick={addVote} text="vote"/>
      <Button handleClick={()=>setSelected(getRandomInt(anecdotes.length))} text="next anecdote"/>
    </div>
  );
}

export default App