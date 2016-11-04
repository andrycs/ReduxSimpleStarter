import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }
    
    onDeleteClick() {
        this.props.deletePost(this.props.params.id)
        .then(() => {
            this.context.router.push('/');
        });
    }

    render () {
        // console.log(this.props.post);
        const { post } = this.props;
        
        if (!post) {
            return <div>Loading</div>;
        }
        
        return (
            <div>
            show post {this.props.params.id} 
            <br /> 
            <button 
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger pull-xs-right">
            delete post
            </button>
            <Link to="/">back</Link><br />
            <h3>{post.title}</h3>
            <h6>{post.categories}</h6>
            <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
