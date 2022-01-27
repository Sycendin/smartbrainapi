const handleProfile = (req, res, db) =>{
    const {id} = req.params;
    db.select('*').from('users').where({
        id:id
    })
    .then(user=>{
        // user will return [] on no match which is true so check length
        if(user.length){
        // grab first user of array return which is that profile
        res.json(user[0]);
        }
        else{
            res.status(400).json('user not found')
        }
        
    })
    .catch(err => res.status(400).json('error getting user'))
}


module.exports ={
    handleProfile: handleProfile
}
