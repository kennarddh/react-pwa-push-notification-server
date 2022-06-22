import mongoose, { Schema } from 'mongoose'

const Subscribe = new Schema(
	{
		subscriptionObject: {
			endpoint: { type: String, required: true },
			keys: {
				p256dh: { type: String, required: true },
				auth: { type: String, required: true },
			},
		},
	},
	{ timestamps: true }
)

export default mongoose.model('subscribe', Subscribe)
