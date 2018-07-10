const _ = require('underscore');

export const getAllTopics = () => {
    return fetch('https://powerful-brook-89800.herokuapp.com/api/topics')
        .then(res => {
            if (res.status === 404) {
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        })
}

export const getAllArticles = () => {
    return fetch('https://powerful-brook-89800.herokuapp.com/api/articles')
        .then(res => {
            if (res.status === 404) {
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        })
}

export const getAllUsers = () => {
    return fetch('https://powerful-brook-89800.herokuapp.com/api/users/')
        .then(res => {
            if (res.status === 404) {
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        })
}

export const getCommentsForArticleId = (article_id) => {    
    return fetch(`https://powerful-brook-89800.herokuapp.com/api/articles/${article_id}/comments`)
        .then(comments => {
            if (comments.status === 404) {
                throw new Error(comments.statusText);
            } else {
                return comments.json();
            }
        })
}   

export const getUserByUsername = (username) => {
    return fetch(`https://powerful-brook-89800.herokuapp.com/api/users/${username}`)
    .then(user => {
        if (user.status === 404) {            
            throw new Error(user.statusText);
        } else {           
            return user.json();
        }
    })
}

export const updateCommentVotes = (comment_id, upOrDown) => {    
    return fetch(`https://powerful-brook-89800.herokuapp.com/api/comments/${comment_id}?vote=${upOrDown}`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'put'
    })
    .then(function (response) {
        return response.json();
    })
}

export const addNewCommentToArticle = (article_id, commentObj) => {
    return fetch(`https://powerful-brook-89800.herokuapp.com/api/articles/${article_id}/comments`, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({body: commentObj.message}),
        method: 'POST'
    })
    .then(function (response) {       
        return response.json();
    })
}

export const getAllArticlesByTopicId = async (selectedTopic) => {
    const topicsRes = await getAllTopics()
    const topicResult = await topicsRes.topics.filter(topic => topic.slug === selectedTopic)
    const topicId = await topicResult[0]._id;
    const articlesRes = await getAllArticles();
    const articleResult = await articlesRes.articles.filter(article => article.belongs_to === topicId);
    return articleResult;
}

export const sortByDescOrder = (arr) => {
    const sortedArr = _.sortBy(arr, 'votes').reverse();
    return sortedArr;
}

export const getUserByUserId = async (selectedUser) => {
    const userRes = await getAllUsers();
    const userResult = await userRes.users.filter(user => user._id === selectedUser);    
    return userResult[0].username;
}

export const getTopicByTopicId = async (selectedTopic) => {
    const topicRes = await getAllTopics();
    const topicResult = await topicRes.topics.filter(topic => topic._id === selectedTopic); 
    return topicResult[0].slug;
}

export const getArticleByArticleId = async (selectedArticle) => {
    const articleRes = await getAllArticles();
    const articleResult = await articleRes.articles.filter(article => article._id === selectedArticle);
    return articleResult[0];
}

export const getCommentsForArticle = async (selectedArticle) => {
    const commentRes = await getCommentsForArticleId(selectedArticle) 
    return commentRes.comments;
}

// export const renderMergedProps = (component, ...rest) => {
//     const finalProps = Object.assign({}, ...rest);
//     return (
//       React.createElement(component, finalProps)
//     );
// } 
// export const PropsRoute = ({ component, ...rest }) => {
//     return (
//       <Route {...rest} render={routeProps => {
//         return renderMergedProps(component, routeProps, rest);
//       }}/>
//     );
// }  