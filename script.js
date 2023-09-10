async function displaydata(){
    let showdata = document.getElementById("output");
    const res = await fetch("https://6459e8fd65bd868e930b5825.mockapi.io/data",{
        method: 'GET',
        headers:{
        "Content-Type": "application/json"
        }
        })
    const data = await res.json();
    console.log(data);

    showdata.innerHTML="";

    data.forEach((element,index) => {
        showdata.innerHTML+=`
        <tr>
        <th>${index+1}</th>
        <th>${element.firstname}</th>
        <th>${element.lastname}</th>
        <th>${element.email}</th>
        <th>${element.age}</th>
        <th>${element.city
        }</th>
        <th>${element.country}</th>
        <th>
        <button onclick="edituser(${element.id})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button>
        <button onclick="deleteuser(${element.id})" class="btn btn-success">Delete</button>

        </th>
        </tr>

        
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit The User Details :</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body justify-content-center align-items-center text-center">
        <label>FirstName:</label>
        <input type="text" id="frstname" class="text-center m-1" placeholder="Enter Your Firstname"><br>
        <label>LastName:</label>
        <input type="text" id="lstname" class="text-center m-1" placeholder="Enter Your LastName"><br>
        <label>Email:</label>
        <input type="email" id="email" class="text-center m-2" placeholder="Enter Your email"><br>
        <label>Age:</label>
        <input type="number" id="age" class="text-center m-1" placeholder="Enter Your age"><br>
        <label>City:</label>
        <input type="text" id="city" class="text-center m-1" placeholder="Enter Your city"><br>
        <label>Country:</label>
        <input type="text" id="country" class="text-center m-1" placeholder="Enter Your country"><br>
    

        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onclick="savechanges(${element.id})" class="btn btn-primary"  data-bs-dismiss="modal">Save changes</button>
        </div>
        </div>
        </div>
        </div>
        `
        
    });
} 

displaydata();

//function to add the data
async function adddata(){
    const firstname = document.querySelector('#firstname1').value;
    const lastname = document.querySelector('#lastname1').value;
    const email = document.querySelector('#email1').value;
    const age = document.querySelector('#age1').value;
    const city = document.querySelector('#city1').value;
    const country = document.querySelector('#country1').value;

    let userdata={
        age:age,
        city:city,
        country:country,
        email:email,
        firstname:firstname,
        lastname:lastname,
    }

    let senddata = await fetch("https://6459e8fd65bd868e930b5825.mockapi.io/data",{
        method: 'post',
        body: JSON.stringify(userdata),
        headers:{
            "Content-Type": "application/json",
        }
    })
    // console.log(senddata);
    const input1 = document.querySelector('#firstname1');
    const input2 = document.querySelector('#lastname1');
    const input3 = document.querySelector('#email1');
    const input4 = document.querySelector('#age1');
    const input5 = document.querySelector('#city1');
    const input6 = document.querySelector('#country1');
    input1.value="";
    input2.value="";
    input3.value="";
    input4.value="";
    input5.value="";
    input6.value="";

    alert("User Added Succesfully");

    displaydata();
}



// function for delete the user details
async function deleteuser(id){
    console.log(id)
    let res = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/data/${id}`,{
        method: 'DELETE',
        headers:{
        "Content-Type":"application/json",
        }
    })

    console.log(res)
    let deluser=await res.json()

    console.log(deluser)
    displaydata();
}

// // function to edit the data
async function edituser(id){
    
    const res = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/data/${id}`,{
        method: 'GET',
        headers:{
            "Content-Type":"application/json",
        }
    })
    
    const data=await res.json();

    const firstname = document.querySelector('#frstname');
    const lastname = document.querySelector('#lstname');
    const email = document.querySelector('#email');
    const age = document.querySelector('#age');
    const city = document.querySelector('#city');
    const country = document.querySelector('#country');


    firstname.value=data.firstname;
    lastname.value=data.lastname;
    email.value=data.email;
    age.value=data.age;
    city.value=data.city;
    country.value=data.country;
}

// function to save the changes

async function savechanges(id){
    const firstname = document.querySelector('#frstname').value;
    const lastname = document.querySelector('#lstname').value;
    const email = document.querySelector('#email').value;
    const age = document.querySelector('#age').value;
    const city = document.querySelector('#city').value;
    const country = document.querySelector('#country').value;

    const newdata={
        firstname:firstname,
        lastname:lastname,
        age:age,
        city:city,
        country:country,
        email:email,
    }
    console.log(newdata);
    const data = await fetch(`https://6459e8fd65bd868e930b5825.mockapi.io/data/${id}`,{
        method: 'put',
        body: JSON.stringify(newdata),
        headers:{
            "Content-Type":"application/json",
        }
    })
    console.log(data);

    displaydata();
}

