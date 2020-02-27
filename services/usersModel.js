let users = [
    {
        _id: 1,
        userName: "admin",
        name: "admin",
        password: "$2b$10$qSIgVzuGagsuirGeBE4ZzuciNeJ4n8xiNJTqXf3VfHfdaP9eNd0Ty",
        city: "Valencia",
        country: "Spain",
        email: "example@mail.com",
        isAdmin: true,
        postings: [
            1,
        ]
    },
    {
        _id: 2,
        userName: "User1",
        name: "User1",
        password: "$2b$10$qSIgVzuGagsuirGeBE4ZzuciNeJ4n8xiNJTqXf3VfHfdaP9eNd0Ty",
        city: "Oulu",
        country: "Finland",
        email: "example@mail.com",
        isAdmin: false,
        postings: [
            2,
            3,
            4,
            5,
            6
        ]
    },
]

module.exports = {

    getUserById: (_id) => users.find(user => user._id === _id),

    getByUserName: (userName) => users.find(user => user.userName === userName),

    getUsers: () => users,

    addUser: (user) => {
        users.push(user);
        return users
    },

    changeUser: (user) => {
        let result = null;
        users.forEach((element, e) => {
            if (element._id == user._id) {
                users[e] = { 
                  _id: user._id,
                  ...user
                }
                console.log('users[e]: ', users[e]);
                result = users[e]
            } 
        });
        return result
    },

    loginUser: (loggedUser) => {
        users.forEach((element, e) => {
            if(element._id == loggedUser._id) {
                users[e] = {
                    _id: loggedUser._id,
                    ...loggedUser,
                }
                console.log(users[e])
                result = users[e]
            }
        })
    }
}