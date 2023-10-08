import React from 'react';
import './ShowKeeper.css'

const ShowKeeper = () => {
  return (
    <div className="showKeeper row">
      <div className="keeperCard col-md-3">
        <h1 className="title">
          <i className="deleteIcon fa fa-trash"
            aria-hidden="true"  ></i>
        </h1>
        <textarea
          className="descriptionBox"
          value="wsqwswq sqs"
          readOnly />
      </div>
    </div>
  )
}

export default ShowKeeper