module.exports.useMiddlewares = async( express, app ) =>{
    const allowCrossDomain = function(req, res, next){
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','*');
        next();
    }   
    app.use(allowCrossDomain)
    app.use(require('morgan')('dev'))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/employee', require('./routes/employee'))
    app.use('/api/role', require('./routes/role'))
    app.use('/api/partner', require('./routes/partner'))
    app.use('/api/branch', require('./routes/branch'))
    app.use('/api/article', require('./routes/article'))
    app.use('/api/reward', require('./routes/reward'))
    app.use('/api/test', require('./routes/test'))
    app.use('/api/result', require('./routes/result'))
    app.use('/api/slider', require('./routes/slider'))
    app.use('/api/prezentation', require('./routes/prezen'))
    app.use('/api/comfort', require('./routes/comfort'))
    app.use('/api/question', require('./routes/question'))
    app.use(express.static('public/uploads'));
    app.use('/', express.static(__dirname + '/views'))
    app.use('/admin', express.static(__dirname + '/admin'))
    app.use('/uploads', express.static(__dirname + '/public/uploads'))
}