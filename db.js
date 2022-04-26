const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).then(console.log('MongoDB connected'))
.catch((err) => console.log(err))