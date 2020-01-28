window.onload = () => {
  const getAllUsersBtn = document.getElementById("get-all-users-btn")
  getAllUsersBtn.addEventListener("click", () => {
    fetch("http://localhost:8088/scfish/v1/user", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }).then(response => {
      return response.json()
    }).then(response => {
      document.getElementsByTagName("pre")[0].innerText = JSON.stringify(response, null, 2)
    })
  })
}