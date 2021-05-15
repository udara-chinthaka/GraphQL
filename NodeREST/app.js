const express = require('express');
const projects = require('./projects.json');
const app = express();
const port = process.env.PORT || 3000;


// about page
app.get('/projects', (req, res) => {
    res.send(projects);
});
app.get('/projects/:id', (req, res) => {
    if (req.params.id) {
        var projectId = req.params.id
        res.send(projects.find(function (projects) {
            return projects.id == projectId;
        }));
    }
});

app.listen(port, () => {
    console.log('Node server starts on port ' + port);
});