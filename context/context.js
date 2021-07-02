import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()
const GithubProvider = ({ children }) => {
        const [githubUser, setGithubUser] = useState(mockUser)
        const [repos, setRepos] = useState(mockRepos)
        const [followers, setFollowers] = useState(mockFollowers)

        // requests loading
        const [request, setRequest] = useState(0)
        const [loading, setIsloading]= useState(false)

        //error
        const [error, setError]= useState({show:false, msg:''})

        // check rate
        const checkRequest = () =>{
                axios(`${rootUrl}/rate_limit`)
                .then(({data}) =>{
                      let {rate: {remaining}} =  data
                   
                      setRequest(remaining)
                       
                      if(remaining === 0){
                        toggleError(true,'sorry you have exceeded your hourly rate limit!')

                }
                })
                .catch((err)=> console.log(err))
        } 
        
        function toggleError (show = false,msg = 'ç'){
                setError({show,msg})
        }
        
        useEffect(checkRequest,[]) 


        return (
                <GithubContext.Provider value={{githubUser,repos,followers,request, error}}>
                        {children}

                </GithubContext.Provider>)
}

export { GithubProvider, GithubContext }