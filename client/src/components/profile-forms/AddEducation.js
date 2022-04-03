import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {addEducation} from "../../actions/profile";

const AddEducation = ({addEducation}) => {
    const [formData, setFormData] = useState({
      school : "",
      degree : "",
      fieldOfStudy : "",
      from : "",
      to : "",
      current : false,
      description : ""
    });

    const navigate = useNavigate();

    const [toDateDisable, toggleToDateVal] = useState(false);

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      addEducation(formData, navigate);
    }

    return (
        <Fragment>
        <h1 className="large text-primary">
          Add Your Education
        </h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, college or university that
          you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit = {onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              value = {school}
              onChange = {onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              value = {degree}
              onChange = {onChange}
              required
            />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field Of Study" name="fieldOfStudy"
            value = {fieldOfStudy}
            onChange = {onChange}
            required/>
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" value = {from}
            onChange = {onChange}
            required/>
          </div>
          <div className="form-group">
            <p>
              <input type="checkbox" name="current" value={current} checked={current}
              onChange= {(e) => {
                setFormData({...formData, current : !current});
                toggleToDateVal(!current);
              }}/>{' '} Current School/College/University
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input type="date" name="to" value = {to} onChange = {onChange} disabled = {toDateDisable ? "disabled" : ""}/>
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              value = {description}
              onChange = {onChange}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
  addEducation : PropTypes.func.isRequired
}

export default connect(null, {addEducation})(AddEducation);
