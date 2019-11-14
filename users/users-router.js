const router = require("express").Router();

const Users = require("./user-model");





router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    Users.remove({ id })
    .then( delUser => { 
        res.status(200).json({message: `Successfully deleted user`});
    })
    .catch(error => {
        res.status(500).json({error: 'Error removing user from DB.'} ;
    })    

});

module.exports = router;