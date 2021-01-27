const { active, date } = require('../controller/utils')

const db = require('../config/db')

module.exports = {
    all(callback){
        
        db.query(`
        SELECT members.*, count(chips) AS total_iot, SUM(chips.value_true) AS valor_total
        FROM members
        LEFT JOIN chips ON (chips.members_id =  members.id)
        GROUP BY members.id
        ORDER BY total_iot DESC
        `, function(err, results){
            if(err) throw `Database Error ${err}`
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
           if(err) throw `Database Error ${err}`

           callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT members.*, count(chips) AS total_iot 
        FROM members 
        LEFT JOIN chips ON (members.id = chips.members_id)
        WHERE members.id = $1
        GROUP BY members.id`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT members.*,  count(chips) AS total_iot
        FROM members
        LEFT JOIN chips ON (members.id = chips.members_id)
        WHERE members.name_social ILIKE '%${filter}%'
        OR members.name_contato ILIKE '%${filter}%'
        GROUP BY members.id
        ORDER BY total_iot DESC
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE members SET
                name_social = ($1),
                name = ($2),
                cnpj = ($3),
                address = ($4),
                name_contato = ($5),
                email = ($6),
                phone = ($7),
                vencimento = ($8)
            WHERE id = ($9)
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
            data.id
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error ${err}`
            
            callback()
        })
    },
    delete(id, callback){
        db.query(`
        DELETE 
        FROM members 
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`
            callback()
        })
    }
}