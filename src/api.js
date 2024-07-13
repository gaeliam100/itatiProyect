
export const setInvitation= async (data)=>{
    const response= await fetch('https://invitacionesserver.onrender.com/insert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
    return response.json();
}