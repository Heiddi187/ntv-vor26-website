import { useState } from 'react'
import './App.css'
import { Input } from './components/Input'
import { MyCard } from './components/ui/MyCard'


function App() {
  const [myName, setMyName] = useState('Heiddi')
  const [email, setEmail] = useState('')
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMyName(e.target.value)
  }

  return (
    <>
      
      <h1>Hello website</h1>
      <div>my name and email</div>
      <div>{myName} {email}</div>
      <Input value={myName} onChange={handleChange} />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button style={{color: 'white'}} onClick={() => alert('submitted: '+email)}>Submit</button>

      <div>
      {/* Card component */}
      <div>Card</div>
        <MyCard />
      </div>
      <p className='footer-note'>Not copywrited by me</p> // til að setja neðst á síðuna. gera classname og bæta við í css skrá. og svo setja className í p tagið
      </>
  )
}

export default App

