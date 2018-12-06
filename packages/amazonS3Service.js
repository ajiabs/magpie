const Package = require('../system/nodex/models/package-installer');
const fs = require('fs');
var AWS = require('aws-sdk');

exports.uploadFile = (req, res, file) => {
    var async = require('async');
    async.waterfall([
        function getCredentials(done) {
            Package.find({ package_name: 'amazon_S3' }, function (err, result) {

                if (result) {

                    if (Object.keys(result).length > 0) {

                        var credentials = JSON.parse(result[0]['package_config']);
                        const s3 = new AWS.S3({
                            accessKeyId: credentials['accessKeyId'],
                            secretAccessKey: credentials['secretAccessKey']
                        });
                        var bucket = credentials['bucketName'];
                        done(null, s3, bucket);
                    }
                    else {
                        return res.json({ success: false, msg: 'Amazon S3 authentication failed' });
                    }
                }
            });

        },
        function uploadFiles(s3, bucket, done) {
            var responseData = [];
            Object.keys(file).forEach(k => {
                fs.readFile(file[k], (err, data) => {
                    if (err) throw err;
                    const params = {
                        Bucket: bucket,
                        Key: file[k],
                        Body: fs.createReadStream(file[k]),

                    };
                    s3.upload(params, function (err, data) {
                        // s3.getSignedUrl('putObject', params, function (err, data) {
                        if (err) throw err
                        console.log(data)
                        responseData.push(data);
                        if (responseData.length == file.length)
                            return res.json({ status: 'success', location: responseData });
                    });
                });
            });

        }
    ]);

};

exports.downloadFile = (req, res, key) => {
    var async = require('async');

    async.waterfall([
        function getCredentials(done) {
            Package.find({ package_name: 'amazon_S3' }, function (err, result) {

                if (result) {

                    if (Object.keys(result).length > 0) {

                        var credentials = JSON.parse(result[0]['package_config']);
                        const s3 = new AWS.S3({
                            accessKeyId: credentials['accessKeyId'],
                            secretAccessKey: credentials['secretAccessKey']
                        });
                        var bucket = credentials['bucketName'];
                        done(null, s3, bucket);
                    }
                    else {
                        return res.json({ success: false, msg: 'Amazon S3 authentication failed' });
                    }
                }
            });

        },
        function downloadObject(s3, bucket, done) {
            var params = {
                Bucket: bucket,
                Key: key
            };

            s3.getSignedUrl('getObject', params, function (err, data) {
                if (err) {
                    return res.send({ "error": err });
                }
                return res.json(data);
            });

            // s3.getObject(params, function (err, data) {

            //     if (err) {
            //         return res.send({ "error": err });
            //     }    

            //     return res.json(data);
            // });
        }
    ]);

}