module.exports = {
	toAndroidDevice: function (deviceData,res) {
		const Package = require('../system/nodex/models/package-installer');
		const PushNotification = require('push-notification');

		Package.find({
			package_name: "push_notification"
		}, function (err, data_config) {
			credentials = JSON.parse(data_config[0]['package_config']);
			const pn = PushNotification({
					gcm:{
						apiKey: credentials['androidApiKey']
						}
				});
				
				const data = {
					title: deviceData.title,
					message: deviceData.message,
					badge: deviceData.badge,
					sound: deviceData.sound,
					payload: deviceData.payload
				   //deviceData.payload is object 
					// {
					// 	param1: 'additional data1',
					// 	param2: 'additional data2'
					// }
				};
				//deviceData.device_token is array ['token1', 'token2', 'token3']
				pn.pushToGCM(deviceData.device_token, data)
				.then(res => console.log(res))
				.catch(err => console.log(err));;



		});

	},


	toIOSDevice: function (res, deviceData) {
		const Package = require('../system/nodex/models/package-installer');
		const apn = require('apn');
		Package.find({
			package_name: "push_notification"
		}, function (err, data_config) {
			credentials = JSON.parse(data_config[0]['package_config']);
			
			var options = {
				token: {
				key: credentials['IOSApiKey'],
				keyId: credentials['IOSKeyId'],
				teamId: credentials['IOSTeamId']
				},
			production: true
			};

			var apnProvider = new apn.Provider(options);

			var note = new apn.Notification();
			note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
			note.badge = deviceData.badge;
			note.sound = deviceData.sound;
			note.alert = deviceData.alert;
			// note.payload = {'messageFrom': 'John Appleseed'};
			note.topic = deviceData.topic;
			apnProvider.send(note,deviceData.device_token)
			.then(res => console.log(res))
			.catch(err => console.log(err));;


		});

	},





};