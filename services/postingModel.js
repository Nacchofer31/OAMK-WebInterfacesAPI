let postingData = [
    {
        _id: 1,
        title: "Teddy Bear",
        description: "A small teddy bear",
        category: "Toy",
        location: {
            city: "Valencia",
            country: "Spain",
        },
        images: [],
        askingPrice: "10",
        currency: "euro",
        dateOfPosting: "13.01.2020",
        deliveryType: "Shipping",
        sellerName: "admin",
        phoneNumber: "123456789",
        sellerEmail: "example@mail.com"
    }
    
]

module.exports = {
    addPosting: (posting) => { 
        postingData.push(posting)
        return postingData
    },
    getPostings: () => postingData,
    getPostingByCategory: (category) => {
        var result = postingData.filter(posting => posting.category == category)
        if(result.length > 0) {
            return result
        } else {
            return undefined
        }
    },
    getPostingByDate: (dateOfPosting) => {
        var result = postingData.filter(posting => posting.dateOfPosting == dateOfPosting)
        if(result.length > 0) {
            return result
        } else {
            return undefined
        }
    },
    getPostingByLocation: (location) => {
        var result = postingData.filter(posting => ((posting.location.country == location.country) && location.country !== "") ||
        ((posting.location.city == location.city) && location.city !== ""))

        if(result.length > 0) {
            return result
        } else {
            return undefined
        }
    },
    getSellerName: (_id) => {
        (result) = postingData.find(posting => posting._id === _id)
        if(result !== undefined) {
            return result.sellerName
        } else {
            return undefined
        }

    },
    getPostingById: (_id) => {
        (result) = postingData.find(posting => posting._id === _id)
        return result
    },
    deletePosting: (_id) => {
        const index = postingData.findIndex(posting => posting._id === _id)
        if(index !== undefined) { postingData.splice(index, 1)
            return postingData
        } else { undefined }

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
            return undefined
        }
    }
}
    
