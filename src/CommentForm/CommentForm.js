import React, {Component} from "react";

class CommentForm extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render() {
    return (
      <>
      I AM A COMMENT FORM
      <form className="comment-form">
        <h4>Your thoughts on movie:</h4>
        <input 
          placeholder="Your thoughts"
          name="comment-input"
          onChange={this.updateValue}
          value={this.state.comment}
        ></input>
        <button onClick={this.submitComment}>Submit</button>
      </form>
      </>
    )
  }
}

export default CommentForm