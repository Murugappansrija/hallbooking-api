const express = require("express")
const nodeapp = express()

const env = require("dotenv").config()
nodeapp.use(express.json())



var data = [
    {
        id: 1,
        numberOfSeats: 1000,
        amenities: ["Ac", "chairs", "catering services","accomendation","decoration","car parking"],
        RoomId: 11,
        ifBooked: "false",
       customerdetails: "",
        date: "",
        startTime: "",
        endTime: "",
        price: 95000,
        Hallname: "SS Marriage hall commercial ",
        Landmark:" ponnamaravathi road,pudukkottai"

      },
    {
      id: 2,
      numberOfSeats: 250,
      amenities: ["Ac", "chairs", "discolights","audio-video equpment","sofa","open bar"],
      RoomId: 11,
      ifBooked: "true",
     customerdetails: ["murugappan","1/36 annanagar","pudukkottai","adharno:1234 5678 91234"],
      date: "22-may-2023",
      startTime: "25-may-2023 at 1PM",
      endTime: "11-may-2023 at 4pm",
      price: 60000,
      Hallname: "RKS elite",
      Landmark: "near to sona meena theatre , trichy",
               
    },
    {
        id: 3,
        numberOfSeats: 50,
        amenities: ["non-Ac", "chairs"],
        price: 3000,
        ifBooked: "false",
       customerdetails: "",
        date: "",
        startTime: "",
        endTime: "",
        RoomId: 12,
        Hallname: "lakshmi budjet",
        Landmark:"lakshmi complex, vayaloor, trichy"
      },
 
    {
      id: 4,
      numberOfSeats: 100,
      amenities: ["Ac", "chairs","catering","bar"],
      RoomId: 13,
      ifBooked: "true",
     customerdetails: ["abisheik","2/36 periyarnagar","trichy","adharno:6634 5678 91234"],
      date: "25-may-2023",
      startTime: "28-may-2023 at 12PM",
      endTime: "30-may-2023 at 10am",
      
      price: 12000,
      Hallname: "mayura function hall",
      Landmark:"opp of sathram busstand, tichy"
    },
    {
        id: 5,
        numberOfSeats: 150,
        amenities: ["Ac", "chairs", "discolights","bar","swimming pool"],
        RoomId: 14,
        ifBooked: "true",
       customerdetails: ["balan kk","3/36 gandhiarnagar","trichy","adharno:6634 8878 91234"],
        date: "18-may-2023",
        startTime: "20-may-2022 at 1PM",
        endTime: "21-may-2023 at 5pmm",
      
        price: 35000,
        Hallname: "paradaise elite",
        Landmark:"duraiyur road, kknagar,trichy"
      },
      {
        id: 6,
        numberOfSeats: 80,
        amenities: ["non-Ac", "chairs"],
        price: 3000,
        ifBooked: "false",
       customerdetails: "",
        date: "",
        startTime: "",
        endTime: "",
        RoomId: 15,
        Hallname: "lakshmi budjet",
        Landmark:"venkat hall, srirangam, trichy"
      },
      {
        id: 7,
        numberOfSeats: 150,
        amenities: ["Ac", "chairs", "bar","discolights"],
        RoomId: 16,
        ifBooked: "true",
       customerdetails: ["reka","4/36 nehruarnagar","keeranoor","adharno:7734 5678 91234"],
        date: "11-may-2023",
        startTime: "15-may-2022 at 1PM",
        endTime: "16-may-2023 at 5pmm",
      
        price: 30000,
        Hallname: "rkp hall",
        Landmark:"trichy road , pudukkottai"
      }
  
  ];
  
  var editableData = data

  nodeapp.get("/hallbookingapi/customerdetail",(req,res)=>{

    try {
        const date = editableData
        const list = date.filter(halls=>halls.ifBooked == 'true')
        const bookedcustomerslist=[]
        if(list.length !== 0){
            list.map((data)=>{
                const customerdetails={
                   customerdetails: data.customerdetails,
                    Hallname: data.Hallname,
                    date: data.date,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    BookingId: data.id,
                    BookingDate: data.date,
                    BookingStatus: data.ifBooked
                }
                bookedcustomerslist.push(customerdetails)
            })
            res.status(200).send(bookedcustomerslist)
        }else{
            res.status(200).send({message : "data not available"})
        }
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})
  

nodeapp.get("/hallbookingapi/bookedhalls",(req,res)=>{

    try {
       const halldetails = editableData
       const list = halldetails.filter(halls=>halls.ifBooked == 'true')
       const halllist =[]
        if(list.length !== 0){
            list.map((data)=>{
               const customerdetails={
                    Hallname: data.Hallname,
                    ifBooked: data.ifBooked,
                   customerdetails: data.customerdetails,
                    date: data.date,
                  duration:{  startTime: data.startTime,
                    endTime: data.endTime},
                    halllandmark: data.Landmark
                }
                halllist.push(customerdetails)
            })
            res.status(200).send(halllist)
        }else{
            res.status(200).send({message : "all  rooms are available"})
        }
        
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

nodeapp.put("/hallbookingapi/roombooking",(req,res)=>{
    try {
        let roomId =req.body.RoomId
        let bookingRoom = editableData.find(data => data.RoomId == roomId)
        let idNum =bookingRoom.id
        if(req.body.ifBooked){
            res.status(400).send({message:"Room is already Booked"})
        }else{
            editableData[idNum-1].ifBooked="true",
            editableData[idNum-1].customerdetails = req.body.customerdetails,
            editableData[idNum-1].date =  req.body.date,
            editableData[idNum-1].startTime =  req.body.startTime,
            editableData[idNum-1].endTime =  req.body.endTime,
            res.status(200).send({message:"Sucessfully Room Booked"})
        }
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})

nodeapp.post("/hallbookingapi/Createroom",(req,res)=>{
    try {
        let room ={
            id: data.length+1,
            numberOfSeats: req.body.numberOfSeats,
            amenities: req.body.amenities,
            price: req.body.price,
            ifBooked: "false",
            customerdetails: "",
            date: "",
            startTime: "",
            endTime: "",
            RoomId: editableData.length+201,
            Hallname: req.body.Hallname
          }
          editableData.push(room)
          res.status(200).send({message:"Sucessfully Room Created"})
    } catch (error) {
        res.status(500).send({message : "Internal Server Error",error})
    }
})
const port = 4000

nodeapp.listen(port,()=>{
    console.log("server started at port ", port)
})