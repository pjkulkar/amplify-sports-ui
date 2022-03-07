import React from 'react';
import axios from 'axios';
  
export default class LikeX extends React.Component {
  state = {
    itemsList: []
  }

  componentDidMount() {
   axios.get(`https://btv7vn2xd3.execute-api.us-west-2.amazonaws.com/test/likewatched?itemId=24&userId=10`)
      .then(res => {
        console.log(res.data.itemList)
        const itemsList = res.data.itemList;
        console.log(itemsList);
        this.setState({ itemsList });
      })
  }

  render() {
    return (
      <ul>
        {
          console.log("inside render")
          console.log(this.state.itemsList)
          this.state.itemsList
            .map(item =>
              <li key={item.itemId}></li>
            )
            console.log("done")
        }
      </ul>
    )
  }
}


