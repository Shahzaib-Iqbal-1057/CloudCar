import React from 'react'

const ListedCars = ({socket}) => {
    const [cars,setCars] = React.useState([]);
   
    React.useEffect( ()=> {
        socket.emit("listedcars","need cars now!")
    },[])
  
    React.useEffect( ()=> {
        socket.on('listedcars', (data) => {
            setCars(data);
            console.log("listedcars",data)
        })
        return () => {
            socket.off('listedcars');
        }
    },[socket])



    const ProductObject = (props) => {

        return (
          <div className="bg-cover bg-center bg-no-repeat h-48 relative rounded-md shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-110" style={{ backgroundImage: `url(${props.product.imageUrl})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50 p-4 text-white flex flex-col justify-between rounded-md">
            <div>
              <h3 className="text-lg font-semibold mb-2">{props.product.make}</h3>
              <div className='flex flex-col'>
                <span className="text-green-600 font-semibold">{props.product.model}</span>
                <span className="text-green-600 font-semibold">Owner : {props.product.owner}</span>
              </div>
              {/* <p className="text-gray-300 text-sm mt-1">Item Id: {props.product.itemId}</p> */}
            </div>
          </div>
        </div>
        );
      };

    return (
        <div className="flex flex-col bg-grey-100 min-h-screen bg-gradient-to-t from-blue-900">
        <main className="flex-grow container mx-auto mt-8">
        <h2 className="text-2xl text-black font-semibold mb-4 text-white">Cars Listed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-5">
            {cars.map((product) => (
            <ProductObject product={product} key={product.id} />
            ))}
        </div>
        </main>
        <div className="flex justify-around p-4">
        {/* <button
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none"
            onClick={handleSignout}
        >
            Sign Out
        </button>
        <button
            className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none"
            
        >
            {showTakenorders ? "Show orders available" : "Show your orders"}
        </button> */}
        </div>
        </div>

    )
}

export default ListedCars