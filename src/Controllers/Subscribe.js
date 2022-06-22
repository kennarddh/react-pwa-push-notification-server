import webpush from 'web-push'

import SubscribeModel from '../Models/Subscribe'

export const Subscribe = (req, res) => {
	const { subscriptionObject } = req.body

	const subscription = new SubscribeModel({
		subscriptionObject: {
			endpoint: subscriptionObject.endpoint,
			keys: {
				p256dh: subscriptionObject.keys.p256dh,
				auth: subscriptionObject.keys.auth,
			},
		},
	})

	subscription
		.save()
		.then(() => {
			res.status(201).json({ success: true })
		})
		.catch(err => {
			console.error(err)
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
					.sendNotification(
						subscription.subscriptionObject,
						JSON.stringify({
							title,
							message,
						})
					)
					.catch(async err => {
						if (err.statusCode === 404 || err.statusCode === 410) {
							console.log(
								'Subscription has expired or is no longer valid: ',
								err
							)

							SubscribeModel.deleteOne({
								_id: subscription._id,
							})
								.exec()
								.then(() =>
									console.log(
										`success deleted subscriptions id: ${subscription._id}`
									)
								)
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
