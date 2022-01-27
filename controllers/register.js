const handleRegister = (req, res, db, bcrypt) =>{
    const {name, email, password} = req.body
    const saltRounds = 10;
    // const hash = bcrypt.hash(password, saltRounds, function
    //     (err, hash) {
    //     console.log(hash)
    // });
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, saltRounds);
    // create transaction
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            db('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
                
            })
            // in users, insert new user and return all columns of that user 
            .then(user => {
                res.json(user[0]);
            })
        })
        // if trx passes, commit it
        .then(trx.commit)
        .catch(trx.rollback)
    })

    // dont do .json(err) because giving client error information
    .catch(err => res.status(400).json('unable to register'))
    
}

module.exports ={
    handleRegister: handleRegister
}