import React from 'react';
import './App.css';
import {Route, Link, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import HomePage from './HomePage';
import TopicPage from './TopicPage';
import Post from './Post';
import Comments from './Comments';
import User from './User';

const App = () => {
  return (      
    <React.Fragment>
      <NavBar />  
      <Switch>        
        <Route exact path ='/' component={HomePage}/>
        {/* HomePage shows all articles */}
        <Route path='/articles/:topic' component={TopicPage} />  
        {/* TopicPage shows all articles for a particular Topic */}
        <Route exact path='/posts/:article_id' component={Post} /> 
        <Route path='/posts/:article_id/comments' component={Comments} /> 
        <Route path='/users/:user_id' component={User}/>
        <Route render={() => {
          return <NoMatch />
        }} />
      </Switch>
    </React.Fragment> 
  );
}
  
const NoMatch = () => {
  return (
    <div>
      <h2>404: Not Found</h2>
      <Link to='/'>Go back to home ---------></Link>
    </div>
  )
}

export default App;
