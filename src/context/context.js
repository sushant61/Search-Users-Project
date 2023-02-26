import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const resp = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (resp) {
      setGithubUser(resp.data);
      const { repos_url, followers_url } = resp.data;
      axios(`${repos_url}?per_page=100`).then((response) =>
        setRepos(response.data)
      );
      axios(`${followers_url}?per_page=100`).then((response) =>
        setFollowers(response.data)
      );
    } else {
      toggleError(true, "No user found");
    }
    checkRequest();
    setLoading(false);
  };
  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "you have exceeded the rate limit");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };
  useEffect(() => {
    checkRequest();
  }, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
export { GithubProvider, GithubContext };
