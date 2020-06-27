const fs = require('fs')
const Intl = require('intl')

const data = require('../../data.json')
const {age, date, studentGrade} = require('../../utils')

exports.index = (req, res) => {

    const students = []

    for (let student of data.students) {
        students.push({
            ...student,
            degree: studentGrade(student.degree)
        })
    }

    return res.render('students/index', { students })
}

exports.create = (req, res) => {
    return res.render('students/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(const key of keys) {
        if(req.body[key] === "" )
            return res.send('Please fill all the fields')
    }

    birth = Date.parse(req.body.birth)
    
    let id = 1
    const lastStudent = data.students[data.students.length - 1]

    if(lastStudent) {
        id = lastStudent.id + 1
    }

    data.students.push({
        id,
        ...req.body,
        birth
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send(`Write file error: ${err}`)

        return res.redirect('/students')
    })

}

exports.show = (req, res) => {
    const { id } = req.params

    const foundStudents = data.students.find(student => {
        return student.id == id
    })

    if(!foundStudents)
        res.send('Student not found!')


    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).birthDay,
        degree: studentGrade(foundStudents.degree)
    }


    return res.render('students/show', { student })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundStudents = data.students.find(student => {
        return student.id == id
    })

    if(!foundStudents)
        res.send('Student not found!')

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth).iso
    }


    res.render('students/edit', { student })
}

exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundStudent = data.students.find((student, foundIndex) => {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })

    console.log(req.body)

    if(!foundStudent)
        return res.send('Student not found!')

    const student = {
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if(err) return res.send(`Write file error: ${err}`)

        return res.redirect(`students/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filterdStudent = data.students.filter(student => {
        return student.id != id
    })

    data.students = filterdStudent

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if(err) return res.send(`Write file error: ${err}`)

        return res.redirect('/students')
    })

}