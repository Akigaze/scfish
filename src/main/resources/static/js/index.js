window.onload = () =>{
    fetch("http://localhost:8088/scfish/v1/post?page=1", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then(response => {
        return response.json()
    })
}
