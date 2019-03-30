import React, {Component, Fragment} from 'react';
import {fetchComment, fetchItem, fetchNews, postNewComment} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
        console.log(e.target);
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (this.state[key] !== null) {
                formData.append(key, this.state[key]);
                console.log(key, this.state[key])
            }
            formData.append(this.state.id, this.props.match.params.id);
        });

        this.props.commentSubmit(formData);
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
                        <button>Delete</button>
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
    commentSubmit: (newComment) => dispatch(postNewComment(newComment))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullInfo);