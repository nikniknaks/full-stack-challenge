import React from 'react'
import axios from 'axios'

import {
  Link
} from 'react-router-dom'

export default class Reviews extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			write_review_mode : false,
			review : {
				employeeId: this.props.id,
				copy : '',
			}
		}
		this.getReview()

		this.writeReviewModeOn = this.writeReviewModeOn.bind(this)
		this.writeReviewModeOff = this.writeReviewModeOff.bind(this)
		this.assignFeedbackRequest = this.assignFeedbackRequest.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.submitReview = this.submitReview.bind(this)
	}

	handleChange(event) {
		this.setState({
			review: {
				[event.target.name]: event.target.value,
				employeeId: this.props.id,
			}
		})
	}

	getReview() {
		axios.get('/api/review/' + this.props.id).then(r => {
			this.setState({
				review : {
					employeeId: this.props.id,
					copy : r.data.copy
				}
			})
		})
	}

	writeReviewModeOn(event) {
		event.preventDefault()
		this.setState({
			'write_review_mode': true
		})
	}

	writeReviewModeOff(event) {
		event.preventDefault()
		this.setState({
			'write_review_mode': false
		})
	}

	assignFeedbackRequest(event) {
		event.preventDefault()

	}

	submitReview(event) {
		event.preventDefault()
		this.writeReviewModeOff(event)
		axios.post('/api/review/add', this.state.review)
	}

	render() {
		let verb
		if (this.state.review && this.state.review.copy && this.state.review.copy.length > 0) {
	 		verb = <span>Edit</span>
 		} else {
	 		verb = <span>Write</span>
 		}

		if (this.state.write_review_mode) {
			return (
				<form>
					<h3>Review</h3>
					<textarea name="copy" type="text" value={this.state.review.copy} onChange={this.handleChange}></textarea>
				 	<button onClick={this.submitReview}>Submit Review</button>
				</form>
			)
		} else {
			return (
				<form>
					<h3>Review</h3>
				 	<button onClick={this.writeReviewModeOn}>
				 		{verb}
				 		<span> Review</span>
				 	</button>
				 	<Link to={'/feedback_request/' + this.props.id}>
				 		Assign Feedback Request
				 	</Link>
				 	<p>{this.state.review.copy}</p>
				</form>
			)
		}
	}	
}
