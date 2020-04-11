module.exports = {
    
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if ( month < 0 || month == 0 && today.getDate() < birthDate.getDate() ) {
            age = age - 1
        }

        return age
    },

    date: function(timestamp) {
        const dateCreated = new Date()

        const year = dateCreated.getUTCFullYear()
        const month = `0${dateCreated.getUTCMonth() + 1}`.slice(-2)
        const day = `0${dateCreated.getUTCDay()}`.slice(-2)

        return `${year}-${month}-${day}`
    }
}