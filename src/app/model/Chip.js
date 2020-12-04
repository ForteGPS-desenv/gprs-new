const { active, date } = require('../controller/utils')

const db = require('../config/db')

module.exports = {
    all(callback){
        
        db.query(`SELECT * FROM chips`, function(err, results){
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
                location,
                value_true,
                value,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING id
        `
        const values = [
            data.operadora,
            data.iccid,
            data.number,
            date(data.active).iso,
            data.status,
            data.location,
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
        SELECT * 
        FROM chips 
        WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE chips SET
                operadora = ($1),
                iccid = ($2),
                number = ($3),
                status = ($4),
                location = ($5),
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
            data.location,
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
    }
}