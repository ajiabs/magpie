module.exports = {
	sendMailSES: function (res, mailParams) {
		const Package = require('../system/nodex/models/package-installer');
		var aws = require("aws-sdk");

		Package.find({
			package_name: "amazonSES"
		}, function (err, data_config) {
			credentials = JSON.parse(data_config[0]['package_config'])
			var ses = new aws.SES({
				"accessKeyId": credentials['accessKeyId'],
				"secretAccessKey": credentials['secretAccessKey'],
				"region": credentials['region']
			});
			var eparam = {
				Destination: {
					ToAddresses: mailParams['destination']
				},
				Message: {
					Body: {
						Html: {
							Data: "<p>Hello, this is a test email!</p>"
						},
						Text: {
							Data: "Hello, this is a test email!"
						}
					},
					Subject: {
						Data: mailParams['subject']
					}
				},
				Source: "sender@test.com",
				ReplyToAddresses: ["sender@test.com"],
				ReturnPath: "sender@test.com"
			};
			ses.sendEmail(eparam, function (err, data) {
				if (err) console.log(err);
				else console.log(data);
			});
			return res.json(data_config);
		});

	},


	sendMailSMTP: function (res, mailIds, templateName, replaceparams) {
		var nodemailer = require("nodemailer");
		var async = require('async');
		async.waterfall([
			function getMailTemplate(done) {
				var mail_templates = require('../system/nodex/models/mail-templates');
				mail_templates.find({
					template_name: templateName
				}).exec(function (err, result) {
					if (err)
						return {
							success: false,
							msg: err
						};
					else {
						done(null, result);
					}

				});

			},
			function getMailSettings(templateResult, done) {
				var setting = require('../system/nodex/models/general-settings');
				setting.find().exec(function (err, result) {
					if (err)
						return res.json({
							success: false,
							msg: err
						});
					else {
						done(null, templateResult, result);
					}
				});

			},

			function sendMessage(templateResult, settingResult, done) {

				var body = templateResult[0].template_body;
				var adminEmail = settingResult[3].value;
				var host = settingResult[4].value;
				var port = settingResult[5].value;
				var smtpUser = settingResult[6].value;
				var smtpPassword = settingResult[7].value;

				if (replaceparams['mail-subject'] != null)
					var subject = replaceparams['mail-subject'];
				else
					var subject = templateResult[0].template_subject;

				var email = mailIds;

				if (Object.keys(replaceparams).length > 0) {
					Object.keys(replaceparams).forEach(function (key) {
						body = body.replace(new RegExp('{'+key+'}', 'g'), replaceparams[key]);
					});
				}


				nodemailer.createTestAccount((err, account) => {

					let transporter = nodemailer.createTransport({
						host: host,
						port: port,
						secure: true,
						auth: {
							user: smtpUser,
							pass: smtpPassword
						},
						tls: {

							rejectUnauthorized: false
						}
					});


					let mailOptions = {
						from: adminEmail,
						to: email,
						subject: subject,
						//text: 'Hello world?', // plain text body
						html: body
					};


					transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log(error);
						} else {
							done(null, 'done');
						}

					});
				});

			}
		], function (err) {
			if (err) throw new Error(err);
		});
	}

};