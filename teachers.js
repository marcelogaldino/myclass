const fs = require('fs')
const intl = require('Intl')

const data = require('./data.json')

const { age, date } = require('./utils')

exports.post = function (req, res) {
    const keys = Object.keys(req.body)

    let { avatar_url, name, birth, degree, modality, classes, services } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        modality,
        classes,
        services,
        created_at
    })

    for (key of keys) {
        if (req.body[key] == "")
            return res.send('Please, fill all the fields')
    }

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
        if (err) return res.send(`Write file error! ${err}`)

        return res.redirect('/teachers')
    })

}

exports.show = function (req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeachers) return res.send('Teacher not found :(')

    let { birth, services, created_at } = foundTeachers

    birth = age(birth)
    created_at = intl.DateTimeFormat('pt-BR').format(created_at)

    const teacher = {
        ...foundTeachers,
        birth,
        services: services.split(','),
        created_at
    }

    return res.render('teachers/show', { teacher })
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundTeachers = data.teachers.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeachers) return res.send('Teacher not found :(')

    let { birth } = foundTeachers

    const teachers = {
        ...foundTeachers,
        birth: date(birth)
    }

    res.render('teachers/edit', { teachers })
}

exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundTeachers = data.teachers.find(function (teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    let { birth } = req.body

    const teacher = {
        ...foundTeachers,
        ...req.body,
        birth: Date.parse(birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) res.send(`Write file error: ${err}`)

        res.redirect(`/teachers/${id}`)

    })

}

exports.delete = function (req, res) {
    const { id } = req.body

    const filteredTeacher = data.teachers.filter(function(teacher) {
        return teacher.id != id
    })

    data.teachers = filteredTeacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
        if (err) res.send(`Write file error: ${err}`)

        res.redirect('/teachers')
    })
}