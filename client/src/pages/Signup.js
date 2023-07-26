import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


function App() {
  const navigate = useNavigate();
  const[name,setName] = useState('')
  const[mobile,setMobile] = useState('')
  const[password,setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:3005/api/register',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name,
        mobile,
        password,
      }),
    })

    const data = await response.json()
    if(data.status === 'ok'){
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="App"
    style={{
        display: "flex-box",
        justifyContent: "center",
        alignItems: "center"
      }}>
     <h1>Register</h1>
     <form onSubmit = {registerUser}>
      <input 
        align = "center"
        value= {name}
        onChange={(e) => setName(e.target.value)}
        type="text" 
        placeholder="Name"/>
      <br/>
      <input 
       value= {mobile}
       onChange={(e) => setMobile(e.target.value)}
       type="tel" 
       placeholder="Mobile Number" pattern="{1}[0-9]{11,14}"/>
      <br/>
      <input
       value= {password}
       onChange={(e) => setPassword(e.target.value)}
       type="password" 
       placeholder="Password"/>
      <br/>
      <input type = "submit" value="Register"/>
     </form>
    </div>
  );
}

export default App;
