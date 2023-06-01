var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: "echchairz@gmail.com",
		pass: "@",
	},
})

export const config = { api: { bodyParser: { sizeLimit: "25mb" } } }
export default function handler(req, res) {
	const body = req.body
const email=JSON.parse(body)
	var mailOptions = {
		from: '"zakaria echchair" <echchairz@gmail.com>',
		to: email.to,
		subject: email.subject,
		html: email.text,
		// attachments: email.attachments,
	}
	if (req.method == "POST") {
		transporter.sendMail(mailOptions, function (error, info) {
			console.log(error)
			if (error) {
				res.status(503).json({ success: false })
			} else {
				res.status(200).json({ success: true })
			}
		})
	}
}
