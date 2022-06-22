import mongoose, { Schema } from 'mongoose'

const Subscribe = new Schema(
	{
		subscriptionObject: { type: Object, required: true },
	},
	{ timestamps: true }
)

export default mongoose.model('subscribe', Subscribe)
