const {age, date, graduation} = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render('teachers/index', { teachers: data.teachers })
    },

    create(req, res) {
        return
    },

    post(req, res) {
        const keys = Object.keys(req.body)

        for(const key of keys) {
            if(req.body[key] === "" )
                return res.send('Please fill all the fields')
        }

        let { avatar_url, name, birth, degree, classType, services } = req.body

        return
    },

    show(req, res) {
        return
    },

    edit(req, res) {
        return
    },

    update(req, res) {
        return
    },

    delete(req, res) {
        return
    }
}