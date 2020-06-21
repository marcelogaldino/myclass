module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if(month < 0 || month == 0 && today.getDate() < birthDate.getDate() ) {
            age = age - 1
        }
    
        return age
    },

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDay()}`.slice(-2)

        return `${year}-${month}-${day}`
    },

    graduation(degree) {
        
        if(degree === 'medio')
            return degree = 'Ensino Médio Completo'
        
        if(degree === 'superior')
            return degree = 'Ensino Superior Completo'

        if(degree === 'mestrado')
            return degree = 'Mestrado'

        if(degree === 'doutorado')
            return degree = 'Doutorado'

    }
}
