const {date, studentGrade} = require('../../lib/utils')

const Student = require('../models/Student')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 4
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return res.render('students/index', { students, pagination, filter })
            }
        }

        Student.paginate(params)
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