var express = require('express');
const Watch = require('./Watch');

var app = express();
var db = require('./config/db')
var cors = require('cors')
app.use(cors())
// Connect to db
db.connect()

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.get('/api/watch', (req, res, next) => {
    Watch.find({}).lean()
        .then(watches => {
            res.json(watches)
        })
        .catch(next)
})

app.get('/api/watch/:id', (req, res, next) => {
    Watch.find({ _id: req.params.id }).lean()
        .then(watches => {
            res.json(watches)
        })
        .catch(next)
})
app.post('/api/watch', (req, res, next) => {
    const watch = new Watch(req.body)
    watch.save().then(() => res.json(req.body))
        .catch(next)
});


app.put('/api/watch/:id', (req, res, next) => {
    Watch.updateOne({ _id: req.params.id }, req.body).then(() => res.json(req.body))
});


app.delete('/api/watch/:id', (req, res) => {

    Watch.deleteOne({ _id: req.params.id }).then(() => res.json(req.body))
});
app.listen(process.env.PORT || 3000);


