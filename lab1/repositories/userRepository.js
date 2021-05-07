const User = require('../models/user.js');
const JsonStorage = require('../JsonStorage.js');


class UserRepository
{
        constructor(filePath)
        {
            this.storage = new JsonStorage(filePath);
        }
    getAllUsers()
    {
         const items = this.storage.readItems().items;
         let users = [];
         for( const item of items)
         {
             let user = new User(item.id , item.login , item.fullname);
             users.push(user);

         }
         return users;

    }
    getUserById(id)
    {
        const items = this.storage.readItems().items;
        for(const item of items)
        {
            if(item.id === id)
            {
                return new User(item.id,item.login,item.fullname,item.role,item.registeredAt,item.avaUrl,item.isEnabled)
            }
        }
    }

    
}


module.exports = UserRepository;