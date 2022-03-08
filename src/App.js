import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import Amplify from 'aws-amplify'
import LikeX from './components/LikeX.js'
import TopPicks from './components/TopPicks.js'
import LikeWatched from './components/LikeWatched.js'

import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react'
import { MdSend /* MdList */ } from 'react-icons/md'
import axios from 'axios' 
import awsConfig from './aws-exports'


Amplify.configure(awsConfig) 

  
function getLikeWatchedList () { 
   console.log("inside getLikeWatched")
  axios.get(`https://btv7vn2xd3.execute-api.us-west-2.amazonaws.com/test/likewatched?itemId=24&userId=10`)
    .then(res => {
          console.log(res.data.itemList)
          console.log("called lambdA. ss")
          }).catch(err =>{
      console.log(err);
    })
  }


function getTopPickedList () { 
   console.log("inside getTopPicked")
  axios.get(`https://dujmlvrgc5.execute-api.us-west-2.amazonaws.com/test/toppicks?userId=55`)
    .then(res => {
          console.log(res.data.itemList)
          console.log("called lambdA")
          }).catch(err =>{
      console.log(err);
    })
  }

function getLikeXList (itemId,userId) { 
  console.log("inside getLikeX")
  const query = "https://bt1m7jsjsj.execute-api.us-west-2.amazonaws.com/test/likex?itemId=" + itemId + "&userId=" + userId;
  console.log(query);
  axios.get(query)
    .then(res => {
          console.log(res.data.itemList)
          console.log("called lambdA") 
          }).catch(err =>{
      console.log(err);
    })
  }




function App() {
  
  const [userId, setuserId] = useState("");
  const [movieId, setmovieId] = useState("");
  
 

  return (
    
    
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='Please Sign-in with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='Plaese Sign-up with Your E-Mail Address'
        slot='sign-up'
      />
    
    

    <div>
      <nav style={nav}>
        <p style={navHeading}>Welcome to Octank Video!</p>
      </nav>
     
      <div style={container}>
        
                                                                                
          <input
          type="text"
          value={userId}
          placeholder="userId"
          onChange={(e) => setuserId(e.target.value)}
        />
        <input
          type="text"
          value={movieId}
          placeholder="movieId"
          onChange={(e) => setmovieId(e.target.value)}
        />
         
         <input id="submit" name="submit" type="submit" value="Submit" onclick={getLikeXList(userId,movieId)}/>

   
      </div>
      <div><br/></div>                                                                          
      <div>
          <LikeX/>
      </div>
      <div><br/></div>
      <div>
          <TopPicks/> <LikeWatched/>
      </div>
                                                                                
                                                                                
                                                                                
                                                                                
                                                                                
      </div>                                                                      
                                                                                
    </AmplifyAuthenticator>
     
    
  );
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App
