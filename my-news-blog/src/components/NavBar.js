import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as helpers from '../queries/api.queries';

class NavBar extends Component {

    state = {
        topics: []
    }

    componentDidMount() {
        helpers.getAllTopics()
        .then(allTopics => {
            this.setState({
                topics: allTopics.topics
            })
        })
        .catch(err => {            
            throw err;
        })
    }

    render() {
        return (            
            <div>
                <div className='navbar' style={{backgroundColor: '#105b74', color: 'white', padding:'1rem', display:'flex', justifyContent: 'space-between'}}>
                    <div className='navbar-item' style={{color: 'white'}}>
                        <h1 style={{fontSize: '24px'}}><Link to='/' style={{color: 'white'}}>Northcoders News</Link></h1>
                    </div>
                    <div className='navbar-item'>
                    {
                        this.state.topics.map(topic => {
                            return <NavButton key={topic._id} title={topic.title} slug={topic.slug}/>
                        })
                    }
                    </div>                    
                </div>    
            </div>            
        )
    }
}

const NavButton = props => {
    const slug = `/articles/${props.slug}`;  
    
    return (
        <div className='navbar-item'>
            <button className='button is-success'><NavLink to={slug} style={{color: 'white'}} activeStyle={{color:'red'}}>{props.title}</NavLink></button>            
        </div>
    )
}

export default NavBar;