import React, {Component, Fragment} from 'react';
import {deleteComment, fetchComment, fetchItem, postNewComment} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import NewsThumbnail from "../newsThumbnail/newsThumbnail";

class FullInfo extends Component {

    state = {
        id: '',
        name: '',
        comment: ''
    };

    componentDidMount() {

        console.log(this.props.match.params.id);
        this.props.fetchItem(this.props.match.params.id);
        this.props.fetchComment(this.props.match.params.id);
    };

    inputChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value,
            id: this.props.match.params.id
        });
    };

    submitFormHandler = e => {
        e.preventDefault();
        this.props.commentSubmit(this.state);
        console.log(this.state);
    };

    render() {
        console.log(this.props.news);

        return (
            <Fragment>
                {this.props.post ? <div className="fullInfo_div">
                    <NewsThumbnail image={this.props.post.image}/>
                    <p>{this.props.post.header}</p>
                    <p>{this.props.post.date}</p>
                    <p>{this.props.post.news_body}</p>
                </div> : null}
                <div className="comments_list">
                    <p>Comments</p>

                    {this.props.comment ? this.props.comment.map((item, ndx) => <div className="comment" key={ndx}>
                        <p>{item.author} wrote: </p>
                        <p>{item.comment}</p>
                        <button id={item.id} onClick={this.props.deleteComment}>Delete</button>
                    </div>) : <p>Write comment</p>}
                </div>
                    <form onSubmit={this.submitFormHandler}  className="add_comment_div">
                        <p>Add comment</p>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name" id="name"
                            placeholder="Your name"
                            value={this.state.name}
                            onChange={this.inputChangeHandler}/>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            required
                            name="comment" id="comment"
                            placeholder="Your comment"
                            value={this.state.comment}
                            onChange={this.inputChangeHandler}/>
                            <button onClick={this.submitFormHandler}>Comment</button>
                    </form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news.news,
    post: state.news.post,
    comment: state.news.comment
});

const mapDispatchToProps = dispatch => ({
    fetchItem: (id) => dispatch(fetchItem(id)),
    fetchComment: (id) => dispatch(fetchComment(id)),
    commentSubmit: (newComment) => dispatch(postNewComment(newComment)),
    deleteComment: (e) => dispatch(deleteComment(e.currentTarget.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullInfo);