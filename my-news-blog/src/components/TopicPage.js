import React, { Component } from 'react';
import * as helpers from '../queries/api.queries';
import Loading from './Loading';
import Article from './Article';


class Topic extends Component {
    state = {
        articles: [],
        loading: true
    }

    componentDidMount () {        
        const selectedTopic = this.props.match.params.topic;        
        helpers.getAllArticlesByTopicId(selectedTopic)        
        .then(allArticles => {            
            this.setState({
                articles: allArticles,
                loading: false
            })
        })       
    }
    componentDidUpdate (prevProps) {
        if(this.props !== prevProps) {
            this.setState({loading: true}, () => {
                const selectedTopic = this.props.match.params.topic;        
                helpers.getAllArticlesByTopicId(selectedTopic)        
                .then(allArticles => {            
                    this.setState({
                        articles: allArticles,
                        loading: false
                    })
                })                
            })
        }          
    }

    render () {        
        return (
            this.state.loading ? (
                <Loading />
            ) : 
            (
            <div style={{width: '50%', margin: '1rem'}}>
            <h1 className='title is-3 is-spaced' style={{margin: '1rem'}}>Articles about {this.props.match.params.topic}</h1>
            {
                this.state.articles.map(article => {
                    return <Article key={article._id} postUrl={article._id} topic={article.topic} username={article.username} votes={article.votes} title={article.title} body={article.body} comments={article.comments} />                    
                })
            }            
            </div>
            )
        )
    }
}


export default Topic;


