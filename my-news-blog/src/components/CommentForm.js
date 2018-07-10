import React, {Component} from 'react';
import * as helpers from '../queries/api.queries';

class CommentForm extends Component {
    state = {
        username: '',
        topic: '',
        message: ''
    }

    handleChange = (e) => {       
        this.setState({
            username: e.target.value
        })
    }

    handleSelect = (e) => {       
        this.setState({
            topic: e.target.value
        })
    }

    handleMsgChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit = (e) => {        
        helpers.addNewCommentToArticle(this.props.articleUrl, this.state)
        alert('Your comment was successfully added');       
    }

    render () {
        return (
            <div style={{backgroundColor: 'white', border: '0.1rem dotted black', padding: '4rem', position: 'relative',zIndex: '1000', width: '500px',marginTop: '-250px'}}>   
                <form onSubmit={this.handleSubmit}>
                <div className='field'>
                    <label className='label'>Username</label>
                    <div className='control'>
                        <input className='input is-success' type='text' placeholder='Enter username' onChange={this.handleChange}/>
                    </div>
                    <p className='help is-success'></p>
                </div> 
    
                <div className='field'>
                    <label className='label'>Subject</label>
                    <div className='control'>
                        <div className='select' onChange={this.handleSelect}>
                            <select name='topic'>
                                <option>Select topic</option>
                                <option value='coding'>coding</option>
                                <option value='football'>football</option>
                                <option value='cooking'>cooking</option>
                            </select>
                        </div>
                    </div>
                </div>
    
                <div className='field'>
                    <label className='label'>Message</label>
                    <div className='control'>
                        <textarea className='textarea' placeholder='Enter your comment' onChange={this.handleMsgChange}></textarea>
                    </div>
                </div>
    
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link" type='submit'>Submit</button>
                    </div>
                    <div className="control">
                        <button onClick={this.props.handleFormClick} className="button is-text">Cancel</button>
                    </div>
                </div>
                </form>
            </div> 
        )
    }
}





export default CommentForm;