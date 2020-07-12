const {date, studentGrade} = require('../../lib/utils')

const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        Student.all(allStudents => {
            allStudents.map(students => {
                students.degree = studentGrade(students.degree)
            })
            
            const myStudents = [
                ...allStudents,
            ]
            
            return res.render('students/index', { students: myStudents })
        })
    },

    create(req, res) {
        Student.selectOptions(options => {
            return res.render('students/create', { options })
        })
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

            Student.selectOptions(options => {
                return res.render('students/edit', { student, options })
            })
        })
    },

    update(req, res) {
        const keys = Object.keys(req.body)
        
        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please, fill all the fields!!")
            }
        }

        Student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`)
        })
    },

    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect('students')
        })
    }
}