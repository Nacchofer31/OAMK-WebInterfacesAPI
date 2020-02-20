let users = [
    {
        _id: 1,
        userName: "admin",
        name: "admin",
        password: "$2b$10$5HzmutperF3ltqwTfXqj4ulx4Z.lqHtiLT9VHdWEuIpRTW4T91MoO",
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
        password: "$2b$10$5HzmutperF3ltqwTfXqj4ulx4Z.lqHtiLT9VHdWEuIpRTW4T91MoO",
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
        return users;
    },
    changeUser: (user) => {
        let result = null;
        users.forEach((element, i) => {
            if (element.id == user.id) {
                users[i] = { 
                  id: user.id,
                  ...user
                }
                console.log('users[i]: ', users[i]);
                result = users[i] ;
            } 
        });
        return result;
    }
}