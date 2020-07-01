import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile_actions';

const Experience = ({ experience, deleteExperience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td><Moment format='YYYY/MM/DD'>{exp.from}</Moment> - {exp.to ? <Moment format='YYYY/MM/DD'>{exp.to}</Moment> : ' Now'}</td>
            <td><button onClick={() => deleteExperience(exp._id)} className='btn btn-outline-danger'>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="mg-2">Experience Credentials</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <td>Company</td>
                        <td>Title</td>
                        <td>Years</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, { deleteExperience })(Experience)
