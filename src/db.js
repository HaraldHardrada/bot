const Pool = require('pg').Pool

// const connectionString = 'postgres://dmrmaexgsemhyp:09438fe2cdba06f72c8fb98e57807729967df4630aeaca50fd738a22df093be7@ec2-176-34-211-0.eu-west-1.compute.amazonaws.com:5432/d47ffvgnh0ut9k'
//
// const pool = new Pool({
//     connectionString,
//     ssl: {rejectUnauthorized: false}
// })

const pool = new Pool({
    user: 'postgres',
    password: 'root',
    port: 5432,
    host: 'localhost',
    database: "bot"
})

module.exports = pool

