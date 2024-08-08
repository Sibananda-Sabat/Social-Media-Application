const io = require('socket.io')(8800,{
    cors: {
        origin: "http://localhost:3000"
    }
})

let activeUsers = []

io.on("connection", (socket)=>{
    //Add new user
    socket.on('new-user-add', (newUserId)=>{
        //If user is not add previously
        if(!activeUsers.some((user)=>user.userId === newUserId)){
            activeUsers.push({
                userId: newUserId,
                sockId: socket.id
            })
        }
        console.log("Connected users", activeUsers)
        io.emit('get-users', activeUsers)
    })

    //Send message
    socket.on('send-message', (data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user)=> user.userId === receiverId)
        console.log("Sending from socket to: ", receiverId)
        console.log("Data", data)
        if(user){
            io.to(user.sockId).emit('receive-message', data)
        }
    })

    socket.on("disconnect", ()=>{
        activeUsers = activeUsers.filter((user)=> user.sockId !== socket.id);
        console.log("User disconnected!!!", activeUsers)
        io.emit('get-users', activeUsers)
    })
})
