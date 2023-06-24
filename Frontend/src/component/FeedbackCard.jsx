import React from 'react'

function FeedbackCard() {
    return (
        <div className="card">
          <div className="card-header">
            <h3 className="score">Score: {feedback.score}/10</h3>
            <p className="author">{feedback.author}</p>
          </div>
          <div className="card-body">
            <p className="message">{feedback.message}</p>
          </div>
        </div>
      );
}

export default FeedbackCard