import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile_actions';
const ProfileGithub = ({ getGithubRepos, repos, username }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <Fragment>
      <div class='profile-github'>
        <h2 class='text-dark mg-1'>
          <i class='fab fa-github'></i> Github Repos
        </h2>
        {repos.map((repo) => (
          <div class='repo bg-white p-1 mg-1'>
            <div>
              <h4>
                <a
                  className='text-dark'
                  href={repo.html_url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li class='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li class='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li class='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

ProfileGithub.propTypes = {
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
