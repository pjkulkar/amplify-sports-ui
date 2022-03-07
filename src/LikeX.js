import React from 'react';
import axios from 'axios';
  
export default class LikeX extends React.Component {
  state = {
    itemsList: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
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
