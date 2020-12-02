const { active, date } = require('../controller/utils')

const db = require('../config/db')

module.exports = {
    all(callback){
        
        db.query(`SELECT * FROM members`, function(err, results){
            if(err) return res.send("Database Error!")
            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO members (
                name_social,
                name,
                cnpj,
                address,
                name_contato,
                email,
                phone,
                vencimento,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        const values = [
            data.name_social,
            data.name,
            data.cnpj,
            data.address,
            data.name_contato,
            data.email,
            data.phone,
            date(data.vencimento).iso,
            date(Date.now()).iso

        ]

        db.query(query, values, function(err, results) {
           if(err) return res.send("Database Error!")

           callback(results.rows[0])
        })
    }
}