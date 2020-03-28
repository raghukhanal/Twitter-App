let db = {
    users: [
        {
            userId: 'jUhU18ZmhOhuu8xvQN3d7jjsawv2',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2020-03-27T01:25:59.706Z',
            imageUrl: 'image/this/that',
            bio: 'Hello, This is user. Nice to meet you!',
            website: 'http://www.user.com',
            location: 'Atlanta, GA'
        }
    ],
    screams: [
        {
            userHandle: 'user',
            body: 'body',
            createdAt: '2020-03-27T01:25:59.706Z',
            likeCount: 5,
            commentCount: 3
        }
    ],
    comments: [
        {
            userHandle: 'user',
            screamId: 'sdjfalsdfrwlf',
            body: 'hello world',
            createdAt: '2020-03-27T06:25:59.706Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'joe',
            read: 'true | false',
            screamId: 'ssdherggtedfgsdfgdfgf',
            type: 'like | comment',
            createdAt: '2020-03-27T06:25:59.706Z'
        }
    ]
};

const userDetails = {
    //redux data
    "credentials": {
        "website": "https://facebook.com",
        "handle": "user2",
        "userId": "wtslJ10Uw7YPR3p7E63nMsK83Dg2",
        "email": "new2@email.com",
        "bio": "Hello, world!",
        "imageUrl": "https://firebasestorage.googleapis.com/v0/b/twitterapp-b20ba.appspot.com/o/22901038355.jpg?alt=media",
        "createdAt": "2020-03-27T01:25:59.706Z",
        "location": "Athens, GA"
    },
    "likes": []
};