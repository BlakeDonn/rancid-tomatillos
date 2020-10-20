import React, {Component} from "react";
import postUserComment from "../api";
class CommentForm extends Component {
  constructor() {
    super()
    this.state = {
      comment: ""
    }
  }
  updateValue = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  // async submitComment = (e) => {
  //   e.preventDefault()
  //   try {
  //     const result = await postUserComment()
  //   }
  // }
  render() {
    return (
      <>
      I AM A COMMENT FORM
      <form className="comment-form">
        <h4>Your thoughts on movie:</h4>
        <input 
          placeholder="Your thoughts"
          name="comment"
          onChange={this.updateValue}
          value={this.state.comment}
        ></input>
        {/* <button onClick={this.submitComment}>Submit</button> */}
      </form>
      </>
    )
  }
}

export default CommentForm