import React, { Component } from 'react';
import * as helpers from '../queries/api.queries';

class User extends Component {
    state = {
        user: {},        
        loading: true
    }

    componentDidMount () {        
        const userId = this.props.match.params.user_id; 
        helpers.getUserByUsername(userId)
        .then(user => {
            this.setState({
                user: user,
                loading: false
            })
        })
        .catch(err => {
            console.log(err)
            this.props.history.push('/404'); 
        })
    }

    // the catch on the promise chain before is processing the 'throw new Error()' from api.queries
    // The actual function getUserByUsername(userId) returns the error and then this promise chain handles the error

    render() {        
        const { name, avatar_url, username } = this.state.user;
        return (
            <div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="card" style={{width: '30%', margin: '1rem'}}>

                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={avatar_url} alt={username}/>
                    </figure>
                </div>
                    
                <div className="card-content" style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48" style={{border: '0.05rem #4a4a4a dotted'}}>
                                <img src={avatar_url} alt={username} />
                            </figure>
                        </div>
                    </div>                    
                </div>

                <div className="media-content" >
                    <p className="title is-4" style={{textAlign: 'center'}}>{name}</p>
                    <p className="subtitle is-6" style={{textAlign: 'center'}}>@{username}</p>
                </div>                

                <div className="content" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <p style={{margin: '1rem', textAlign: 'center'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. </p>                  
                    <p style={{marginBottom: '1rem'}}>Registered: 1 Jan 2016</p> 
                </div>
               

                </div>
            </div>
            </div>
        )
    }
}

export default User;