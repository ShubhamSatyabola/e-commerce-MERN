// A mock function to mimic making an async request for data
export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/auth/signup',{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'},
        })
        //  console.log(response);
    const data = await response.json()
   
    resolve({data})}
  );
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve,reject) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({data})
  });
}


export function logoutUser(userId) {
  return new Promise(async (resolve) => {
    
    resolve({ data:'success' });
  });
}
