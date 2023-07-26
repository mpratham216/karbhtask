import React, { useEffect, useState } from 'react'
import { useJwt as jwt } from "react-jwt";
import { useNavigate as navigate } from 'react-router-dom'
import axios from 'axios';
const Home = () =>{

    // const [quote, setQuote]= useState('')
    // const [tempQuote, setTempQuote]= useState('')
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
          const response = await axios.get(
            `https://randomuser.me/api/search?name=${searchInput}`
            // Replace "https://your-api-url.com/search" with your actual API endpoint for searching by name.
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };
    

    // async function populateQuote(){
    //     const req = await fetch('http://localhost:3005/api/quote',{
    //         headers:{
    //             'x-access-token': localStorage.getItem('token'),
    //         },
    //     })
    //     const data = req.json()
    //     if(data.status === 'ok'){
    //         setQuote(data.quote)
    //     }
    //     else{
    //         alert(data.error)
    //     }
    // }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user= jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate.replace('/login')
            }else{
                handleSearch()
            }
        }
    })
    // async function updateQuote(event){
    //     event.preventDefault()
    //     const req = await fetch('http://localhost:3005/api/quote',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'x-access-token': localStorage.getItem('token'),
    //         },
    //         body: JSON.stringify({
    //             quote:tempQuote,
    //         }),
    //     })
    //     const data = await req.json()
    //     if(data.status === 'ok'){
    //         setTempQuote('')
    //         setQuote(data.quote)
    //     }
    //     else{
    //         alert(data.error)
    //     }
    // }
    return(
        <div>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search by Name"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((result) => (
          <div key={result.user_id}>
            <p>Name: {result.name}</p>
            <p>User ID: {result.mobile}</p>
          </div>
        ))}
      </div>
    </div>
    );
}

export default Home