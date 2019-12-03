//  1. bcrypt require
const bcrypt = require('bcrypt');

async function run() {
    //  2. salt
    const salt = await bcrypt.genSalt(10);
    //  3. hash
    const hash = await bcrypt.hash('data', salt)
    console.log(salt);
    console.log(hash);
}

run ();