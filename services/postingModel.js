let postingData = [
    {
        _id: 1,
        title: "Teddy Bear",
        description: "A small teddy bear",
        category: "Toy",
        location: {
            city: "",
            country: "",
            address: ""
        },
        images: [],
        askingPrice: "10",
        currency: "euro",
        dateOfPosting: "13/01/2020",
        deliveryType: "Shipping",
        contactInfo: {
            sellerName: "",
            phoneNumber: "",
            sellerEmail: ""
        }
    }
]

module.exports = {
    addPosting: (posting) => { 
        postingData.push(posting)
        return postingData
    },
    getPostings: () => postingData,
    getPostingByCategory: (category) =>
        postingData.filter(posting => posting.category == category),
    getPostingByDate: (dateOfPosting) =>
        postingData.filter(posting => posting.dateOfPosting == dateOfPosting),
    getPostingByLocation: (location) =>
        postingData.filter((posting.location.country == location.country) ||
        (postingData.location.city == location.city) ||
        (postingData.location.address == location.address)
    ),
    getPostingById: (_id) => postingData.filter(posting => posting._id == _id),
    deletePosting: (_id) => {
        postingData.splice(_id - 1, 1);
        return postingData
    },
    modifyPosting: (posting) => {

        if(postingData.find(oldPosting => oldPosting._id == posting._id) != undefined) {
            var objectLength = Object.keys(posting).length
            for(key in posting) {
                if(posting[key] != postingData[posting._id - 1][key]) {
                    postingData[posting._id - 1][key] = posting[key]
                }
            }
            return posting
        } else {
            return null
        }
    }
}
    
