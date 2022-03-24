const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//?meterNum=xxxxxxxxxx&value=xx.xxxx&timestamp=2222-22-22.22:22:22:2222
app.get('/', function (req, res) {
    const meterNum = req.query.meterNum;
    const value = req.query.value;
    const timestamp = req.query.timestamp;

    if (meterNum != null && value != null && timestamp != null) {
        let data = meterNum + "," + value + "," + timestamp + "\n";
        let fs = require('fs');
        fs.appendFile('Data.txt', data, (err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(200).send();
            }
        });
    }

    res.status(500).send();
});

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));