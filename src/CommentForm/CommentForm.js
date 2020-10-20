import React, {Component} from "react";
import {postUserComment} from "../api";
class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: "",
      commentAdded: false
    }
  }
  updateValue = (e) => {
    this.setState({[e.target.name]: e.target.value})
    console.log(this)
  }
  submitComment = async (e) => {
    e.preventDefault()
    const result = await postUserComment(this.props.movieId, this.props.userName, this.state.comment)
    try {
      this.setState({comment: "", commentAdded: true})
    } catch (error) {
      throw error
    }
  }
  render() {
    return (
      <>
      <form className="comment-form">
        <h4>{this.props.userName}'s thoughts on movie:</h4>
        <input 
          placeholder="Your thoughts"
          name="comment"
          onChange={this.updateValue}
          value={this.state.comment}
        ></input>
        <button onClick={this.submitComment}>Submit</button>
        {this.state.commentAdded && <p>Refresh to see your comment</p>}
      </form>
      </>
    )
  }
}

export default CommentForm