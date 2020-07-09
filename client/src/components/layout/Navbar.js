import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth_actions';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/profiles'>
          <i className='fab fa-connectdevelop'></i> Developers{' '}
          <span className='sr-only'>(current)</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login <i className='fas fa-sign-in-alt'></i>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Sign Up <i className='fas fa-user-plus'></i>
        </Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul className='navbar-nav mr-auto'>
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard'>
          <svg
            width='1.5rem'
            height='1.3rem'
            viewBox='0 0 16 16'
            className='bi bi-person'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'
            />
          </svg>{' '}
          Dashboard
          <span className='sr-only'>(current)</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/profiles'>
          <i className='fab fa-connectdevelop'></i> Developers{' '}
          <span className='sr-only'>(current)</span>
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/posts'>
          <i className='far fa-file-alt'></i> Posts
          <span className='sr-only'>(current)</span>
        </Link>
      </li>
      <li>
        <Link className='nav-link' onClick={logout} to='/'>
          Logout <i className='fas fa-sign-out-alt'></i>
          <span className='sr-only'>(current)</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        {isAuthenticated ? (
          <Link
            className='navbar-brand'
            style={{ fontSize: '2rem', marginRight: '2.75rem' }}
            to='/dashboard'
          >
            DevChirps <i className='fas fa-code'></i>
          </Link>
        ) : (
          <Link
            className='navbar-brand'
            style={{ fontSize: '2rem', marginRight: '2.75rem' }}
            to='/'
          >
            DevChirps <i className='fas fa-code'></i>
          </Link>
        )}

        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarColor01'
          aria-controls='navbarColor01'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarColor01'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
