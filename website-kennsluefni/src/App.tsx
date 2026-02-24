import { useState } from 'react'

import './App.css'

function App() {
  const [myName, setMyName] = useState('Heiddi')
  const [email, setEmail] = useState('')
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMyName(e.target.value)
  }

  return (
    <>
      <h1>Hello website</h1>
      <div>myName</div>
      <div>{myName} {email}</div>
        <input 
          type="text"
          value={myName}
          //onChange={(e) => setMyName(e.target.value)}
          onChange={(e) => handleChange(e)} 
        />
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button onClick={() => alert('submitted: '+email)}>Submit</button>
      <p>Not copywrited by me</p>
    </>
  )
}

export default App

