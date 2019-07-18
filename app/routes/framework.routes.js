module.exports = (app) => {
    const frameworks = require('../controllers/framework.controller.js');


app.post('/frameworks', frameworks.create);

app.get('/frameworks', frameworks.findAll);

app.get('/frameworks/:frameworkId', frameworks.findOne);

app.put('/frameworks/:frameworkId', frameworks.update);

app.delete('/frameworks/:frameworkId', frameworks.delete);

}