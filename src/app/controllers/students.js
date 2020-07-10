const {date, studentGrade} = require('../../lib/utils')

const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(students => {
            return res.render('students/index', { students })
        })
    },

    create(req, res) {
        return res.render('students/create')
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(const key of keys) {
            if(req.body[key] === "" )
                return res.send('Please fill all the fields')
        }

        Student.create(req.body, student => {
            return res.redirect(`students/${student.id}`)
        })

    },

    show(req, res) {
        Student.find(req.params.id, student => {

            student.birth = date(student.birth).birthDay
            student.degree = studentGrade(student.degree)
            
            return res.render('students/show', { student })
        })
    },

    edit(req, res) {
        Student.find(req.params.id, student => {

            student.birth = date(student.birth).birthDay
            
            return res.render('students/edit', { student })
        })
    },

    update(req, res) {
        return res.redirect(`student/${req.body.id}`)
    },

    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect('students')
        })
    }
}