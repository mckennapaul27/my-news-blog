import React, {Component} from 'react';
import Article from './Article';
import * as helpers from '../queries/api.queries';
import Loading from './Loading';

class Post extends Component {
    
    state = {
        article: {},        
        loading: true
    }

    componentDidMount () {        
        const articleId = this.props.match.params.article_id;        
        helpers.getArticleByArticleId(articleId)
        .then(article => {
            this.setState({
                article: article,
                loading: false
            })
        })
    }
    
    render() {            
        const {_id, topic, body, comments, username, title, votes} = this.state.article;               
        return (
            this.state.loading ? (
                <Loading />
            ) : (
            <div>                
                <Article topic={topic} postUrl={_id} username={username} votes={votes} title={title} body={body} comments={comments} />
            </div>
            )
        )
    }
}



export default Post;