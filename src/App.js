import React, { useState, useEffect, useMemo } from 'react'
import './App.css'
import Table from "./Table";
import Amplify from 'aws-amplify'
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


function getPopularList () { 
   console.log("inside getPopularList")
  axios.get(`https://ekqv0wytwf.execute-api.us-west-2.amazonaws.com/test/popularlist?itemId=24&userId=10`)
    .then(res => {
          console.log(res.data.itemList)
          console.log("called lambdA")
          }).catch(err =>{
      console.log(err);
    })
  }



function getLikeWatchedList () { 
   console.log("inside getLikeWatched")
  axios.get(`https://btv7vn2xd3.execute-api.us-west-2.amazonaws.com/test/likewatched?itemId=24&userId=10`)
    .then(res => {
          console.log(res.data.itemList)
          console.log("called lambdA")
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


const useFetchData = (url) => {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });
  useEffect(() => {
    //let isMounted = true;
    getLikeWatchedList();
    getTopPickedList ();
   // getLikeXList ();
    getPopularList ();
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



function App() {
  
  const [userId, setuserId] = useState("");
  const [movieId, setmovieId] = useState("");
  
  
  const { isLoading, data, error } = useFetchData("https://56lor2kfz8.execute-api.us-east-1.amazonaws.com/test/videos");
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>There was an error: {error}</div>;

  return (
    
    
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText='AnyCompany video team, Sign-In with Your E-Mail Address'
        slot='sign-in'
      />
      <AmplifySignUp
        headerText='AnyCompany video team, Sign-Up with Your E-Mail Address'
        slot='sign-up'
      />
    

    <div>
      <nav style={nav}>
        <p style={navHeading}>AnyCompany Sports Streaming</p>
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

        <table>
          <tbody>
            <tr>
              <th>Video</th>
              <th>Vote</th>
            </tr>
          </tbody>
        </table>


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
