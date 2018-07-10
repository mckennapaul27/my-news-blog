import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as helpers from '../queries/api.queries';

class Comm extends  Component {

    state = {
        votes: this.props.votes 
    }
   
    voteUp = () => {        
        helpers.updateCommentVotes(this.props.id, 'up')
        this.setState({
            votes: this.state.votes +1
        })
    }

    voteDown = () => {        
        helpers.updateCommentVotes(this.props.id, 'down')
        this.setState({
            votes: this.state.votes -1
        })
    }

    
    render () {
        const userUrl = `/users/${this.props.user}`;
      
        return (
            <div className="card" style={{width: '90%', margin: '1rem'}}>
                <header className="card-header" style={{display: 'flex', alignItems:'center'}}>
                    <p className="card-header-title"><Link to={userUrl}>@{this.props.user}</Link></p>
                    <button className='button' style={{marginRight: '0.5rem', color: 'green'}} onClick={this.voteUp}><i className='fa fa-chevron-circle-up'></i></button>
                    <button className='button' style={{marginRight: '0.5rem', color: 'red'}} onClick={this.voteDown}><i className='fa fa-chevron-circle-down'></i></button>
                    <p style={{display: 'inline-block',marginRight: '0.5rem',height: '100%'}}>{this.state.votes}</p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{this.props.body}</p>                    
                        <br/>                   
                        <time style={{color: '#767676'}}>{this.props.date}</time>
                    </div>
                </div>            
            </div>
        )
    }
}


export default Comm;