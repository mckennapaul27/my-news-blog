import React, { Component } from 'react';
import * as helpers from '../queries/api.queries';
import Loading from './Loading';
import Article from './Article';


class HomePage extends Component {
    state = {
        articles: [],
        loading: true
    }

    componentDidMount () {
        helpers.getAllArticles()
        .then(allArticles => {            
            this.setState({
                articles: allArticles.articles,
                loading: false
            })
        })        
    }

    render () {
        return (
            this.state.loading ? (
                <Loading />
            ) : 
            (
            <div style={{width: '50%', margin: '1rem'}}>
            <h1 style={{margin: '1rem'}} className='title is-3 is-spaced'>All Articles</h1>
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



export default HomePage;