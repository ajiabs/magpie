module.exports = {
	
	createStripeAccount: function(userDetails, res) {
		return new Promise((resolve, reject) => {

				const Package = require('../system/nodex/models/package-installer');
				Package.find({
					package_name: "stripe"
				}, function (err, data_config) {
					credentials = JSON.parse(data_config[0]['package_config']);
					var stripe = require("stripe")(credentials["secret_key"]);
					const customer = stripe.customers.create({
					  email: userDetails.email
					});
					customer
					  .then(function(result) {
						resolve(result);
					  })
					  .catch(err =>
						res.json({ success: false, msg: "Invalid stripe credentials" })
					  );
		

				});
		});



	},
	createStripeSource: function(userDetails, res) {

		return new Promise((resolve, reject) => {

			const Package = require('../system/nodex/models/package-installer');
			Package.find({
				package_name: "stripe"
			}, function (err, data_config) {
				credentials = JSON.parse(data_config[0]['package_config']);
				var stripe = require("stripe")(credentials["secret_key"]);
				const source = stripe.customers.createSource(userDetails.customer_id, {
					source: userDetails.token
					});
					source
					.then(function(result) {
						resolve(result);
					})
					.catch(err =>
						res.json({ success: false, msg: "Invalid stripe credentials" })
				);


			});
	});

	},
	subscribeStripePlan: function(userDetails,res) {
	  return new Promise((resolve, reject) => {
		const Package = require('../system/nodex/models/package-installer');
		Package.find({
			package_name: "stripe"
		}, function (err, data_config) {
			credentials = JSON.parse(data_config[0]['package_config']);
			var stripe = require("stripe")(credentials["secret_key"]);
				stripe.subscriptions
				.create({
					customer: userDetails.customer_id,
					items: [
					{
						plan: userDetails.plan_id
					}
					],
					trial_period_days: userDetails.trial_period
				})
				.then(function(result) {
					resolve(result);
				})
				.catch(err =>
					res.json({ success: false, msg: "Invalid stripe credentials" })
				);


		});

	 });
	}
  };
  