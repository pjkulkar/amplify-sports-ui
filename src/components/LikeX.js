import React from 'react';
import axios from 'axios';
  
export default class LikeX extends React.Component {
  state = {
    itemsList: []
  }

  componentDidMount() {
   axios.get(`https://btv7vn2xd3.execute-api.us-west-2.amazonaws.com/test/likewatched?itemId=24&userId=10`)
      .then(res => {
        const itemsList = res.data;
        this.setState({ itemsList });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.itemsList
            .map(item =>
              <li key={item.id}></li>
            )
        }
      </ul>
    )
  }
}


