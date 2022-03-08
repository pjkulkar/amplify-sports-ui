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

const thumbs_up = require('./assets/thumbs_up.png');
const thumbs_down = require('./assets/thumbs_down.png');

Amplify.configure(awsConfig) 

  
class VideoPlayer extends React.Component {

  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      
      <div data-vjs-player style={{
          width: 540, height: 320
        }}>
        <video  ref={(node) => { this.videoNode = node; }} className="video-js" />
      </div>
      

    );
  }
}


const useFetchData = (url) => {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  useEffect(() => {
    //let isMounted = true;  
    axios.get(url)
      .then((res) => {
        console.log(res.data.Items.length)
        if(res.data.Items.length === 3){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]}], 
            error: null });
        } else if (res.data.Items.length === 4){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[3].filepath.S}]}], 
            error: null });
        } else if (res.data.Items.length === 5){
          setState(
          { isLoading: false, data: [
            {autoplay: false, controls: true,sources: [{src: res.data.Items[0].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[1].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[2].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[3].filepath.S}]},
            {autoplay: false, controls: true,sources: [{src: res.data.Items[4].filepath.S}]}], 
            error: null });
        }
      })
      .catch((error) => {
        setState({ isLoading: false, data: null, error });
      });
  }, [url]);
  return state;
};

function populateDate(username,video,vote){
    console.log(username,video,vote);
    axios.post('https://dcyxom2xcc.execute-api.us-east-1.amazonaws.com/prod/updaterecord', {
      username: username,
      video: video,
      vote: vote
    })
  };


class App extends Component { 
  
  constructor(){
  super()
  this.userIdTemp = 10;
  this.itemIdTemp = 24;
  this.state = {
    userId:10,
    itemId:10,
    
   }
    console.log("in constructor log")
    console.log("this.userIdTemp")
    console.log(this.userIdTemp)
    console.log("this.state.userId")
    console.log(this.state.userId)
    
 } 

changeState(userId,itemId)
{
    console.log("in changeState")
  this.state.userId = userId
  this.state.itemId = itemId
  

    console.log("this.userIdTemp")
    console.log(this.userIdTemp)
    console.log("this.state.userId")
    console.log(this.state.userId)
    
}


 handleUserChange(e){
    console.log("in handleUserChange")
   this.userIdTemp = e.target.value;

    console.log("this.userIdTemp")
    console.log(this.userIdTemp)
    console.log("this.state.userId")
    console.log(this.state.userId)
    
}


handleItemChange(e){
   console.log("in handleItemChange")
  this.itemIdTemp = e.target.value;

    console.log("this.userIdTemp")
    console.log(this.userIdTemp)
    console.log("this.state.userId")
    console.log(this.state.userId)
    
}
  
  render(){
    console.log("in render")
    console.log("this.userIdTemp")
    console.log(this.userIdTemp)
    console.log("this.state.userId")
    console.log(this.state.userId)
    
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
      <nav style={nav}>
        <p style={navHeading}>Welcome to Octank Video!</p>
      </nav>
     
      <div style={container}>
        
                                                                                
          <input
          type="text"
          value={this.userIdTemp}
          placeholder="userId"
          onChange={(e) => {this.handleUserChange(e)}}
        />
        <input
          type="text"
          value={this.itemIdTemp}
          placeholder="movieId"
          onChange={(e) => {this.handleItemChange(e)}}
        />
         
         <input id="submit" name="submit" type="submit" value="Submit" onclick={this.changeState(this.userIdTemp,this.itemIdTemp)}/>

   
      </div>
      <div><br/></div> 
      <div><br/></div>                                                                         
      <div>
          <LikeX userId={this.state.userId} itemId={this.state.itemId}/>
      </div>
      <div><br/></div>
      <div><br/></div>                                                                         
      <div>
          <TopPicks/> 
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
}

const nav = { padding: '0px 40px', height: 60, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }
const container = { paddingTop: 40, width: 960, margin: '0 auto' }
const navHeading = { margin: 0, fontSize: 18 }

export default App

