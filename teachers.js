const fs = require('fs')

const data = require('./data.json')

exports.post = function(req, res) {
    const keys = Object.keys(req.body)

    let { avatar_url, name, birth, degree, classes, services } = req.body

    birth = Date.parse(birth)
    const id = Number(data.teachers.length + 1)
    const created_at = Date.now()

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        degree,
        classes,
        services,
        created_at
    })

    for (key of keys) {
        if ( req.body[key] == "" )
            return res.send('Please, fill all the fields')
    }

    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {
        if ( err ) return res.send(`Write file error! ${err}`)

        return res.redirect('/teachers')
    })

}