import webPush from 'web-push'

import SubscribeModel from '../Models/Subscribe'

export const Subscribe = (req, res) => {
	const { subscriptionObject } = req.body

	const subscription = new SubscribeModel({
		subscriptionObject: {
			endpoint: subscriptionObject.endpoint,
			keys: {
				p256dh: subscriptionObject.p256dh,
				auth: subscriptionObject.auth,
			},
		},
	})

	subscription
		.save()
		.then(() => {
			res.status(201).json({ success: true })
		})
		.catch(() => {
			res.status(500).json({ success: false })
		})
}
