import React from 'react';
import axios from 'axios';
  
export default class LikeX extends React.Component {
  state = {
    itemsList: []
    isLoading:true;
    error:false;
  }

  componentDidMount() {
   axios.get(`https://btv7vn2xd3.execute-api.us-west-2.amazonaws.com/test/likewatched?itemId=24&userId=10`)
      .then(res => {
        console.log(res.data.itemList)
        const itemsList = res.data.itemList;
        console.log(itemsList);
        this.setState({ itemsList });
        if(itemsList){
          this.setState(isLoading:false, error:false);
          console.log("inside mount after setstate")
          console.log(this.state.itemsList);
          console.log("inside mount after list")
        }
      })
     .catch((error) => {
        setState({ isLoading: false, error:true });
      });
  }

  render() {
    console.log('in render: ' + this.state.isLoading)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>There was an error: {error}</div>;
    
    console.log("inside render")
    console.log(this.state.itemlist);
        console.log("inside render before return")
    return (
      <ul>
        {
           this.state.itemsList
            .map(item =>
              <li key={item.itemId}></li>
            )
        }
      </ul>
    )
  }
}


