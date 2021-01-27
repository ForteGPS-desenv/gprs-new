const db = require('../config/db')

module.exports = {

    all(callback){
            
        db.query(`
        SELECT COUNT(DISTINCT members.name) AS total_membros, count(chips) AS total_iot, SUM(chips.value_true) AS valor_total
        FROM members
        LEFT JOIN chips ON (chips.members_id =  members.id)
        ORDER BY total_iot DESC
        `, function(err, results){
            if(err) throw `Database Error ${err}`
            callback(results.rows)
        })
    }
}