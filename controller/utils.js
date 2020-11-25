module.exports = {
    active: function(timestamp) {
        const today = new Date()
        const activeDate = new Date(timestamp)

    let active = today.getFullYear() - activeDate.getFullYear()
    const month = today.getMonth() - activeDate.getMonth()

    if (month < 0 ||
        month == 0 && 
        today.getDate() <= activeDate.getDate()){
        active = active - 1
    }

    return active
    }
}