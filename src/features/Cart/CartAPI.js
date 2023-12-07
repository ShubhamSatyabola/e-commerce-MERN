// A function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchCartById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + id);
    const data = await response.json();
    // console.log(data)
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();

    resolve({ data });
  });
}

export function deleteCartItem(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + id, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();

    resolve({ data:{id:id} });
  });
}

export function deleteCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetchCartById(id)
     
  
    // console.log(response);
    const data =  response.data;

    data.forEach(async (element) => {
       await deleteCartItem(element.id)
    });
    
    resolve({ status: 'deleted' });
  });
}

