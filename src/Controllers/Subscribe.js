import webPush from 'web-push'

export const Subscribe = (req, res) => {
	const subscription = req.body

	res.status(201).json({})

	const payload = JSON.stringify({ title: 'Section.io Push Notification' })

	webPush
		.sendNotification(subscription, payload)
		.catch(err => console.error(err))
}
