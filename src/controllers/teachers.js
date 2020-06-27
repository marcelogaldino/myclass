const fs = require('fs')
const Intl = require('intl')

const data = require('../../data.json')
const {age, date, graduation} = require('../../utils')

exports.index = (req, res) => {
    return res.render('teachers/index', { teachers: data.teachers })
}

exports.create = (req, res) => {
    return res.render('teachers/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(const key of keys) {
        if(req.body[key] === "" )
            return res.send('Please fill all the fields')
    }

    let { avatar_url, name, birth, degree, classType, services } = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = data.teachers.length + 1

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        classType,
        services,
        created_at
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 4), (err) => {
        if (err) return res.send(`Write file error: ${err}`)

        return res.redirect('/teachers')
    })


    // return res.send(req.body)
}

exports.show = (req, res) => {
    const { id } = req.params

    const foundTeachers = data.teachers.find(teacher => {
        return teacher.id == id
    })

    if(!foundTeachers)
        res.send('Teacher not found!')


    const teacher = {
        ...foundTeachers,
        birth: age(foundTeachers.birth),
        degree: graduation(foundTeachers.degree),
        services: foundTeachers.services.split(','),
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeachers.created_at)
    }


    return res.render('teachers/show', { teacher })
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundTeachers = data.teachers.find(teacher => {
        return teacher.id == id
    })

    if(!foundTeachers)
        res.send('Teacher not found!')

    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
    }


    res.render('teachers/edit', { teacher })
}

exports.update = (req, res) => {
    const { id } = req.body
    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })

    console.log(req.body)

    if(!foundTeacher)
        return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if(err) return res.send(`Write file error: ${err}`)

        return res.redirect(`teachers/${id}`)
    })
}

exports.delete = (req, res) => {
    const { id } = req.body

    const filterdTeacher = data.teachers.filter(teacher => {
        return teacher.id != id
    })

    data.teachers = filterdTeacher

    fs.writeFile('data.json', JSON.stringify(data, null, 4), err => {
        if(err) return res.send(`Write file error: ${err}`)

        return res.redirect('/teachers')
    })

}