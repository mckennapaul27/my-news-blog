import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom';
import Comments from './Comments';
import CommentForm from './CommentForm'; 

class Article extends Component {
    
    state = {
        showComments: false,
        showCommentForm: false
    }

    handleCommentClick = () => {        
        this.setState({
            showComments: !this.state.showComments
        })
    }

    handleFormClick = () => {
        this.setState({
            showCommentForm: !this.state.showCommentForm
        })
    }

    render () {
        const articleSectionStyle = {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems:'center', 
            padding: '1rem'
        }     
        
        const topicColorGuide = {
            'football': 'message is-primary',
            'coding': 'message is-warning',
            'cooking': 'message is-danger'
        } 
        
        const articleUrl = `/posts/${this.props.postUrl}`;
        const articleCommentsUrl = `/posts/${this.props.postUrl}/comments`;
        const userUrl = `/users/${this.props.username}`;

        
        return (        
            <div style={{margin: '1rem'}}>
                <article className={topicColorGuide[this.props.topic]} style={{marginBottom: '0.5rem'}} >
                    <div className="message-header">                    
                        <p><Link to={articleUrl}>{this.props.title}</Link></p>                  
                        <button className="delete" aria-label="delete"></button>
                    </div>
                    <div className="message-body"> 
                        {this.props.body}                  
                    </div>
                    <div style={articleSectionStyle}>
                        <div style={articleSectionStyle}> 
                            <p style={{display: 'inline-block',marginRight: '0.5rem',height: '100%'}}>{this.props.votes}</p>
                            <button className='button' style={{color: 'green', marginRight: '0.5rem'}}><i className='fa fa-chevron-circle-up'></i></button>
                            <button className='button' style={{color: 'red', marginRight: '0.5rem'}}><i className='fa fa-chevron-circle-down'></i></button>
                        </div> 
                        <div style={articleSectionStyle}>    
                            <button className='button' style={{color: 'blue', marginRight: '0.5rem'}}><Link to={articleCommentsUrl}><i className='fa fa-comments'></i></Link></button>
                            <p style={{display: 'inline-block', marginRight: '0.5rem',height: '100%'}}>{this.props.comments}</p>
                            <Link to={userUrl}>{this.props.username}</Link>
                        </div>                                                                        
                    </div>
                </article>    
                <Route path='/posts/:article_id/comments' component={Comments} /> 
                <div style={{display: 'flex', justifyContent: 'start'}}>
                {
                        this.state.showComments ? 
                        <div>
                            <button className='button is-danger is-small' style={{marginLeft:'1rem'}} onClick={this.handleCommentClick}>Hide comments</button>
                            <Comments articleUrl={this.props.postUrl}/>
                        </div>
                        :
                        <div>
                            <button className='button is-info is-small' style={{marginLeft:'1rem'}} onClick={this.handleCommentClick}>Show comments</button>
                        </div>
                }
                 {
                        this.state.showCommentForm ? 
                        <div>
                            <button className='button is-danger is-small' style={{marginLeft:'1rem'}} onClick={this.handleFormClick}>Hide comments</button>
                            <CommentForm articleUrl={this.props.postUrl} handleFormClick={this.handleFormClick} />
                        </div>
                        :
                        <div>
                            <button className='button is-success is-small' style={{marginLeft:'1rem'}} onClick={this.handleFormClick}><i className="fa fa-plus" style={{marginRight: '0.25rem'}}></i>Add comment</button>
                        </div>
                }

                </div>               
                    
                    
                               
            </div>
        )
    }
    
}


export default Article;