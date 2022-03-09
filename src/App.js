import React, { useState, useEffect, useMemo, Component } from 'react'

import './App.css'
import Amplify from 'aws-amplify'
import LikeX from './components/LikeX.js'
import TopPicks from './components/TopPicks.js'
import LikeWatched from './components/LikeWatched.js'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

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



function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}

let count = 0;
function App() {

let forceUpdate = useForceUpdate(); 

const [userId, setuserId] = useState(10);

const [movieId, setmovieId] = useState(22);

   

    return(
      
    
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
          <h1>{count++} times clicked</h1>

          <button onClick={forceUpdate}>Refresh</button>
      </div>

    
    <div>
      <nav style={nav}>
        <p style={navHeading}>Welcome to Octank Video!</p>
      </nav>
       
      

      <div style={container}>
        
        
         
      <input id="submit" name="submit" type="submit" value="User1" onclick={e => setuserId(13)}/>
      <input id="submit" name="submit" type="submit" value="User2" onclick={e => setuserId(25)}/>
      <input id="submit" name="submit" type="submit" value="User3" onclick={e => setuserId(45)}/>


   
      </div>
       
       <div>
         <TopPicks userId={this.state.userId} itemId={this.state.movieId}/>                                                                   
       </div>
         <div><br/></div> 
      <div><br/></div>                                                                         
      <div>
          <LikeX/>
      </div>
      <div><br/></div>
      <div><br/></div>                                                                         
       <div>                                                                       
          <LikeWatched/>
      </div>
     
                                                                                                                                                        
                                                                                
      </div>                                                                      
      <div className='sign-out'>
        <AmplifySignOut />
      </div>                                                                  
    </AmplifyAuthenticator>

     
  );
  
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App

