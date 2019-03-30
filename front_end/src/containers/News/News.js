import React, {Component, Fragment} from 'react';
import {postNewComment, fetchNews, fetchComment, selectPost, deletePost} from "../../store/actions/newsActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import NewsThumbnail from "../../components/newsThumbnail/newsThumbnail";

class News extends Component {

    componentDidMount() {
        this.props.onFetchNews();
    };

    render() {

        return (
           <Fragment>
               <div className="add_btn_div">
                   <Link to="/news/new" className="add_post_btn">
                        <button>
                            Add new post
                        </button>
                   </Link>
               </div>

               {this.props.news.map(item => (
                   <div key={item.id} style={{marginTop: '10px'}}>
                       <div className="thumbnail_div">
                           <NewsThumbnail image={item.image}/>
                           <div className="header_main_div">
                               <div className="header_div">
                           <strong>
                               {item.header}
                           </strong>
                               </div>
                               <p>{item.date}</p>
                               <Link to={'/news/' + item.id}>
                                   Read full post
                               </Link>
                               <button className="dlt_btn" id={item.id} onClick={this.props.deletePost}>Delete</button>
                           </div>

                       </div>
                   </div>
               ))}

           </Fragment>
        );
    }
}

const mapStateToProps = state => ({
   news: state.news.news,
});

const mapDispatchToProps = dispatch => ({
   onFetchNews: () => dispatch(fetchNews()),
    deletePost: (e) => dispatch(deletePost(e.currentTarget.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);