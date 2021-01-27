const { active, date } = require('../controller/utils')

const db = require('../config/db')

module.exports = {
    all(callback){
        
        db.query(`
        SELECT chips.*, members.name_social AS member_name 
        FROM chips
        LEFT JOIN members ON (chips.members_id = members.id)
        `, function(err, results){
            if(err) throw `Database Error ${err}`
            callback(results.rows)
        })
    },
    create(data, callback){
        const query = `
            INSERT INTO chips (
                operadora,
                iccid,
                number,
                active,
                status,
                members_id,
                value_true,
                value,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        data.value_true = data.value_true.replace(/\D/g, "")
        data.value = data.value.replace(/\D/g, "")

        const values = [
            data.operadora,
            data.iccid,
            data.number,
            date(data.active).iso,
            data.status,
            data.member,
            data.value_true,
            data.value,
            date(Date.now()).iso

        ]

        db.query(query, values, function(err, results) {
           if(err) throw `Database Error ${err}`

           callback(results.rows[0])
        })
    },
    find(id, callback){
        db.query(`
        SELECT chips.*, members.name_social AS member_name
        FROM chips 
        LEFT JOIN members ON (chips.members_id = members.id)
        WHERE chips.id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT chips.*
        FROM chips
        INNER JOIN members ON (members.id = chips.members_id)
        WHERE number ILIKE '%${filter}%'
        OR operadora ILIKE '%${filter}%'
        OR iccid ILIKE '%${filter}%'
        GROUP BY chips.id
        ORDER BY chips.id DESC
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    update(data, callback){
        const query = `
            UPDATE chips SET
                operadora = ($1),
                iccid = ($2),
                number = ($3),
                status = ($4),
                members_id = ($5),
                value_true = ($6),
                value = ($7),
                active = ($8)
            WHERE id = ($9)
       ` 
    
        const values = [
            data.operadora,
            data.iccid,
            data.number, 
            data.status,
            data.member,
            data.value_true,
            data.value,
            date(data.active).iso,
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
        FROM chips 
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`
            callback()
        })
    },
    membersSelectOptions(callback) {
        db.query(`SELECT name_social, id FROM members`, function(err, results){
            if (err) throw 'Database error!'

            callback(results.rows)
        })
    }
}