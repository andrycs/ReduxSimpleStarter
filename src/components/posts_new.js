import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import { createPost } from '../actions/index';

import { Link } from 'react-router';


class PostsNew extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    onSubmit(props) {
        this.props.createPost(props)
        .then(() => {
            //blog post has been created, navigate user to index
            //we navigate by calling this.context.router.push with new path we navigate to
            this.context.router.push('/');

        });
    }


    render() {
        const { fields: {title, categories, content}, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>  
                <h3>Create new post</h3>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title} />
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className="form-group">
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea className="form-control" {...content} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'Enter a username';
    }
    
    return errors;
}

//connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
//reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate
}, null, { createPost })(PostsNew);