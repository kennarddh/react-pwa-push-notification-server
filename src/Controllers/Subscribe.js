import webpush from 'web-push'

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

export const Send = (req, res) => {
	const { title, message } = req.body

	SubscribeModel.find({})
		.exec()
		.then(subscriptions => {
			subscriptions.forEach(subscription => {
				webpush
					.sendNotification(subscription, {
						title,
						message,
					})
					.catch(async err => {
						if (err.statusCode === 404 || err.statusCode === 410) {
							console.log(
								'Subscription has expired or is no longer valid: ',
								err
							)

							await SubscribeModel.deleteOne({
								_id: subscriptions._id,
							})
						} else {
							throw err
						}
					})
			})

			res.status(500).json({ success: true })
		})
		.catch(() => {
			res.status(500).json({ success: false })
		})
}
