const { Pool } = require("pg")

module.exports = new Pool({
    user: 'qlwysghqnqziln',
    password: '1e9b0e0f33e0943c9dd7c547973e2e8d6dc6a90dc47de3d760784fd447ae4cc5',
    host: 'ec2-52-72-162-207.compute-1.amazonaws.com',
    port: 5432,
    database: 'd8lb6qo2dmnev4'
})