form.addEventListener("submit", () =>{
    const register = {
        user: user.value,
        password: password.value
    }
    fetch("/api/register", {
        mathod: "POST",
        body: JSON.stringify(register),
        header: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error"){
                success.style.display="none"
                error.style.display="block"
                error.innerHTML=data.error;
            }
            else{
                error.style.display="none"
                success.style.display="block"
                success.innerHTML=data.error;
            }
        })
})