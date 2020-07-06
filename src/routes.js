const express = require('express')

const teachers = require('./src/app/controllers/teachers')
const students = require('./src/app/controllers/students')

const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('teachers')
})
routes.get('/teachers', teachers.index)
routes.post('/teachers', teachers.post)
routes.put('/teachers', teachers.update)
routes.delete('/teachers', teachers.delete)
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)


routes.get('/students', students.index)
routes.post('/students', students.post)
routes.put('/students', students.update)
routes.delete('/students', students.delete)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)

module.exports = routes