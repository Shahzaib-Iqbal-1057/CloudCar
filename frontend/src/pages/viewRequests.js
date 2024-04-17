import React from 'react'
import '../styles/viewRequests.css'



const ViewCarRequests = ({socket}) => {


    const [carRequests,setCarRequests] = React.useState([])

    React.useEffect(() => {
        const plateNumber = window.location.href.split('=')[1];
        socket.emit("viewCarRequests",plateNumber)
    },[])

    React.useEffect(()=>{

        socket.on("viewCarRequests",(data)=>{
            console.log("data : ",data)
            setCarRequests(data)
        })

        socket.on("acceptRequest",(data)=>{
            if (data === "successfull") {
                alert("Request accepted successfully")
            } else {
                alert("Request could not be accepted")
            }
        })

        return (()=>{
            socket.off("viewCarRequests")
            socket.off("acceptRequest")
        })

    },[socket])

    
    function handleApprove(rentalId,renter) {
        //sending the accept car request to the backend
        socket.emit("acceptRequest",{rentalId:rentalId,car:window.location.href.split('=')[1]})
        window.location.href = `/chat?to=${renter}`
    }

    function handleRemove(e) {
      // removing the car request from the array
      const index = e.target.parentElement.parentElement.parentElement.getAttribute('key');
      const newCarRequests = carRequests.filter((_, i) => i !== index);
      setCarRequests(newCarRequests);
    }

    const Card = ({ request, message }) => (
        <div className="card" style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '300px' }}>
          <h2>Request from : {request.renter}</h2>
          <p>Amount : {request.amount}</p>
          <div className="buttongroup" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={()=>{handleApprove(request.rentalId,request.renter)}}>Approve</button>
            <button style={{ padding: '5px 10px', cursor: 'pointer' }} onClick={handleRemove}>Remove</button>
          </div>
        </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-5">
        {carRequests.map((request, index) => (
        <Card key={index} request = {request}/>
        ))}
    </div>
  )
}

export default ViewCarRequests