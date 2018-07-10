import React, { Component } from 'react';
import * as helpers from '../queries/api.queries';
import Loading from './Loading';
import Comm from './Comm';
import moment from 'moment';

class Comments extends Component {
    
    state = {
        comments: [],        
        loading: true,
    }

    componentDidMount () {
        let articleId;
        if(this.props.match === undefined) {
            articleId = this.props.articleUrl;     
        } else {
            articleId = this.props.match.params.article_id;
        }                      
        helpers.getCommentsForArticle(articleId)
        .then(comments => {
            this.setState({
                comments: comments,
                loading: false
            })
        })
    }

    orderByVotes = () => {
        this.setState({
            comments: helpers.sortByDescOrder(this.state.comments)
        })
    }
    
    render () {
        return (
            this.state.loading ? (
                <Loading />
            ) : 
            (
            <div>
                <div style={{margin: '1rem', cursor: 'pointer', display: 'flex'}} onClick={this.orderByVotes}>
                    <h1>Order by votes</h1>
                    <div style={{marginLeft: '0.5rem', color: 'green'}}>
                    <i className='fa fa-arrow-up' style={{margin: 'auto'}}></i>
                    </div>                    
                </div>                
            {
                this.state.comments.map(comment => {  
                                 
                    return <Comm 
                    key={comment._id}
                    id={comment._id}
                    date={moment(comment.created_at, "x").fromNow()}
                    body={comment.body} 
                    votes={comment.votes}
                    user={comment.username}
                    />
                })
            }                    
            </div>
            )
        )
    }
}


export default Comments;