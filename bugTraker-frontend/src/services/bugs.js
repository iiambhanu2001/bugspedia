function Getdata(){
  
  return fetch(`${import.meta.env.VITE_API_URL}/api/bug`)
  
  
  
}

export default Getdata;