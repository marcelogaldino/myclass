const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`
        SELECT * 
        FROM students `, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows)
        })
    },

    create(data, callback) {
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                birth,
                email,
                degree,
                hours,
                teacher_id
            ) VALUES ( $1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.degree,
            data.hours,
            data.teacher_id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`
            SELECT students.*, teachers.name AS teachers_name  
            FROM students
            LEFT JOIN teachers ON (students.teacher_id = teachers.id)
            WHERE students.id = $1`, [id], (err, results) => {
                if(err) throw `Database error: ${err}`

                callback(results.rows[0])
            })
    },

    update(data, callback) {
        const query = `
            UPDATE students SET
                avatar_url = ($1),
                name = ($2),
                birth = ($3),
                email = ($4),
                degree = ($5),
                hours = ($6),
                teacher_id = ($7)
            WHERE id = $8      
            `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.degree,
            data.hours,
            data.teacher_id,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database error: ${err}`

            callback()
        })
    },

    delete(id, callback) {
        db.query(`
            DELETE
            FROM students
            WHERE id = $1`, [id], (err, results) => {
                if(err) throw `Database error: ${err}`

                callback()
            })
    },

    selectOptions(callback) {
        db.query(`
            SELECT id, name
            FROM teachers`, (err, results) => {
                if(err) throw `Database error: ${err}`

                callback(results.rows)
            })
    }
}