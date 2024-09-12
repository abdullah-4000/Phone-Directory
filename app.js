var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    lastName = document.getElementById("lastName"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    profession = document.getElementById("profession"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeLastName}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeeProfession}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeLastName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeProfession}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeLastName}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeProfession}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, name, lastName, city, email, phone, profession, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showLastName").value = lastName,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showProfession").value = profession,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, LastName, City, Email, Phone, Profession, Sdate){
    isEdit = true,
    editId = index,
    imgInput.src = pic,
    userName.value = name,
    lastName.value = LastName,
    city.value =City,
    email.value = Email,
    phone.value = Phone,
    profession.value = Profession,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeLastName: lastName.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeeProfession: profession.value,
        
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})

function searchEmployees() {
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();

    let filteredEmployees = getData.filter(employee => {
        let fullName = (employee.employeeName + " " + employee.employeeLastName).toLowerCase();
        return fullName.includes(searchTerm) || 
               employee.employeePhone.includes(searchTerm) || 
               employee.employeeEmail.toLowerCase().includes(searchTerm);
    });

    // Clear existing employee details
    userInfo.innerHTML = "";

    // Display filtered employee details
    filteredEmployees.forEach((employee, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${employee.picture}" alt="" width="50" height="50"></td>
            <td>${employee.employeeName}</td>
            <td>${employee.employeeLastName}</td>
            <td>${employee.employeeCity}</td>
            <td>${employee.employeeEmail}</td>
            <td>${employee.employeePhone}</td>
            <td>${employee.employeeProfession}</td>
            <td>${employee.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${employee.picture}', '${employee.employeeName}', '${employee.employeeLastName}', '${employee.employeeCity}', '${employee.employeeEmail}', '${employee.employeePhone}', '${employee.employeeProfession}', '${employee.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${employee.picture}', '${employee.employeeName}', '${employee.employeeLastName}', '${employee.employeeCity}', '${employee.employeeEmail}', '${employee.employeePhone}', '${employee.employeeProfession}', '${employee.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}
