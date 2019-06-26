const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	game: {
		type: Schema.Types.ObjectId,
		ref: 'game'
	},
	title: {
		type: String,
		default: 'Untitled Review',
		required: false
	},
	content: {
		type: String,
		required: false
	},
	date: {
		type: Date,
		default: Date.now
	},
	liked: {
		type: Boolean,
		required: true
	}
});

module.exports = mongoose.model('review', ReviewSchema);