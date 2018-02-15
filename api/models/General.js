import connectMongo from '../lib/connectMongo';
import AppVersion from '../lib/AppVersion';

const General = (() => {
    return {
        getVersion(req, res) {
            const respObj = {
                error: false,
                message: '',
                data: {
                    version: ''
                }
            };
            res.send(respObj);

            connectMongo.init();

            AppVersion.paginate({}, { limit: 5000, sort: { timestamp: 'desc' } }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    const respObj2 = {
                        error: false,
                        message: '',
                        data: {
                            version: ''
                        }
                    };
                    if (data.docs && data.docs.length > 0) {
                        respObj2.data.version = data.docs[0].timestamp.toString();
                        res.send(respObj2);
                    } else {
                        res.send(respObj2);
                    }
                }
            });
        },
        setVersion(req, res) {
            connectMongo.init();
            const versionObj = {
                date: new Date(),
                timestamp: Date.now()
            };
            const version = new AppVersion(versionObj);

            version.save((err) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log('version posted successfully');
                }
            });

            const respOb = {
                error: false,
                message: '',
                data: versionObj
            };
            res.send(respOb);
        }
    };
})();

module.exports = General;
