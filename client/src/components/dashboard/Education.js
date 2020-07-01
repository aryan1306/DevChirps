import React, { Fragment } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile_actions'

const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td><Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {edu.to ? <Moment format='YYYY/MM/DD'>{edu.to}</Moment> : ' Now'}</td>
            <td><button onClick={() => deleteEducation(edu._id)} className='btn btn-outline-danger'>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="mg-2">Education Credentials</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <td >School</td>
                        <td >Degree</td>
                        <td >Years</td>
                        <td />
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
