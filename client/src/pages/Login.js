
import React, {useState} from 'react'

function Login() {
  const[mobile,setMobile] = useState('')
  const[password,setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:3005/api/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        mobile,
        password,
      }),
    })

    const data = await response.json()
    
    if(data.user) {
      alert("Login successful")
      window.location.href = "/home"
    }
    else{
      alert("Please check username and password")
    }  
    console.log(data)
  }

  return (
    <div className="App">
     <h1>Login</h1>
     <form onSubmit = {loginUser}>
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
      <input type = "submit" value="Login"/>
     </form>
    </div>
  );
}

export default Login;