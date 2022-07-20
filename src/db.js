const Pool = require('pg').Pool

const pool = new Pool({
    user: "dmrmaexgsemhyp",
    password: "09438fe2cdba06f72c8fb98e57807729967df4630aeaca50fd738a22df093be7",
    host: "ec2-176-34-211-0.eu-west-1.compute.amazonaws.com",
    port: 5432,
    database: "d47ffvgnh0ut9k"
})

module.exports = pool