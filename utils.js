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

        return {
            day,
            month,
            year,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`
        }
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

    },

    studentGrade(degree) {
        switch (degree) {
            case '5fundamental':
                return '5° ano ensino fundamental'
                break;

            case '6fundamental':
                return '6° ano ensino fundamental'
                break;

            case '7fundamental':
                return '7° ano ensino fundamental'
                break;

            case '8fundamental':
                return '8° ano ensino fundamental'
                break;

            case '1medio':
                return '1° ano ensino médio'
                break;

            case '2medio':
                return '2° ano ensino médio'
                break;

            case '3medio':
                return '3° ano ensino médio'
                break;
                
            default:
                break;
        }
    }
}
