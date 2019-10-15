'use strict';

var ApiContracts = require("authorizenet").APIContracts;
var ApiControllers = require("authorizenet").APIControllers;
const Package = require('../system/nodex/models/package-installer');

function createSubscription(req, res, callback) {

    Package.find({ package_name: 'authorize_net' }, function (err, result) {

        if (result) {

            if (Object.keys(result).length > 0) {

                var credentials = JSON.parse(result[0]['package_config']);
                var apiLoginKey = credentials['YOUR_API_LOGIN_ID'];
                var transactionKey = credentials['YOUR_TRANSACTION_KEY'];
                var paymentInterval = req.body.paymentInterval;
                var paymentType = req.body.paymentType;
                var total_payments = req.body.totalPayments;
                var trial_payments = req.body.trialPayments;
                var card_expiry = req.body.cardExpiry;
                var card_number = req.body.cardNumber;
                var customer_id = req.body.customerId;
                var customer_email = req.body.customerEmail;
                var customer_phone = req.body.customerPhone;
                var company_name = req.body.companyName;
                var first_name = req.body.firstname;
                var last_name = req.body.lastname;
                var invoice_number = req.body.invoice_num;
                var order_description = req.body.orderDescription;
                var subscription_name = req.body.subscriptionName;
                var subscription_amt = req.body.subscriptionAmount;
                var subscription_trial_amt = req.body.subscriptionTrialAmount;

                var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
                merchantAuthenticationType.setName(apiLoginKey);
                merchantAuthenticationType.setTransactionKey(transactionKey);

                var interval = new ApiContracts.PaymentScheduleType.Interval();
                interval.setLength(paymentInterval);//length of 30 days or 6 months
                interval.setUnit(ApiContracts.ARBSubscriptionUnitEnum.MONTHS);//days or months

                var paymentScheduleType = new ApiContracts.PaymentScheduleType();
                paymentScheduleType.setInterval(interval);
                paymentScheduleType.setStartDate((new Date()).toISOString().substring(0, 10));
                paymentScheduleType.setTotalOccurrences(total_payments);//Number of toal payements
                paymentScheduleType.setTrialOccurrences(trial_payments);
var creditCard = new ApiContracts.CreditCardType();
                creditCard.setExpirationDate(card_expiry);
                creditCard.setCardNumber(card_number);

                var payment = new ApiContracts.PaymentType();
                payment.setCreditCard(creditCard);

                var orderType = new ApiContracts.OrderType();
                orderType.setInvoiceNumber(invoice_number);
                orderType.setDescription(order_description);

                var customer = new ApiContracts.CustomerType();
                customer.setType(ApiContracts.CustomerTypeEnum.INDIVIDUAL);// Individual or business
                customer.setId(customer_id);
                customer.setEmail(customer_email);
                customer.setPhoneNumber(customer_phone);

                var nameAndAddressType = new ApiContracts.NameAndAddressType();
                nameAndAddressType.setFirstName(first_name);
                nameAndAddressType.setLastName(last_name);
                nameAndAddressType.setCompany(company_name);

                var arbSubscription = new ApiContracts.ARBSubscriptionType();
                arbSubscription.setName(subscription_name);
                arbSubscription.setPaymentSchedule(paymentScheduleType);
                arbSubscription.setAmount(subscription_amt);
                arbSubscription.setTrialAmount(subscription_trial_amt);
                arbSubscription.setPayment(payment);
                arbSubscription.setOrder(orderType);
                arbSubscription.setCustomer(customer);
                arbSubscription.setBillTo(nameAndAddressType);

                var createRequest = new ApiContracts.ARBCreateSubscriptionRequest();
                createRequest.setMerchantAuthentication(merchantAuthenticationType);
                createRequest.setSubscription(arbSubscription);

                var ctrl = new ApiControllers.ARBCreateSubscriptionController(createRequest.getJSON());

                ctrl.execute(function () {

                    var apiResponse = ctrl.getResponse();

                    var response = new ApiContracts.ARBCreateSubscriptionResponse(apiResponse);


                    if (response != null) {
                        return res.json(response);
                    }
                    else {
                        return res.json({ success: false, msg: 'Payment failed' });
                    }
                    callback(response);
                });
            }
            else {
                return res.json({ success: false, msg: 'Authorized Net authentication failed' });
            }

        }

    });
    
}

if (require.main === module) {
    createSubscription(function (a) {
        console.log('createSubscription call complete.');
    });
}

module.exports.createSubscription = createSubscription;