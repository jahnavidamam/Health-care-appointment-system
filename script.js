// ===============================
// DEFAULT DATA
// ===============================

let doctors = JSON.parse(localStorage.getItem("doctors")) || [

    {
        name: "Dr. Priya",
        specialization: "Cardiologist",
        experience: "10 Years"
    },

    {
        name: "Dr. Rahul",
        specialization: "Dermatologist",
        experience: "8 Years"
    },

    {
        name: "Dr. Ananya",
        specialization: "Pediatrician",
        experience: "7 Years"
    }

];


let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];


// ===============================
// SHOW SECTION
// ===============================

function showSection(id) {

    document.getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// LOGIN
// ===============================

function login() {

    let role =
        document.getElementById("role").value;

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;


    if (username === "" || password === "") {

        document.getElementById("loginMessage").innerText =
            "Please enter username and password.";

        return;
    }


    document.getElementById("loginMessage").innerText =
        "Login successful!";


    if (role === "admin") {

        document.getElementById("adminModule").style.display =
            "block";

        document.getElementById("userModule").style.display =
            "none";

        loadAdminData();

    } else {

        document.getElementById("userModule").style.display =
            "block";

        document.getElementById("adminModule").style.display =
            "none";

        loadDoctors();

        loadUserAppointments();

    }


    document.getElementById("adminModule")
        .scrollIntoView({
            behavior: "smooth"
        });

    if (role === "user") {

        document.getElementById("userModule")
            .scrollIntoView({
                behavior: "smooth"
            });

    }

}


// ===============================
// DISPLAY DOCTORS
// ===============================

function loadDoctors() {

    let doctorList =
        document.getElementById("doctorList");

    let appointmentDoctor =
        document.getElementById("appointmentDoctor");


    doctorList.innerHTML = "";

    appointmentDoctor.innerHTML =
        '<option value="">Select Doctor</option>';


    doctors.forEach(function(doctor) {

        doctorList.innerHTML += `

            <div class="doctor-card">

                <h3>${doctor.name}</h3>

                <p>${doctor.specialization}</p>

                <p>Experience:
                    ${doctor.experience}
                </p>

            </div>

        `;


        appointmentDoctor.innerHTML += `

            <option value="${doctor.name}">
                ${doctor.name} -
                ${doctor.specialization}
            </option>

        `;

    });

}


// ===============================
// BOOK APPOINTMENT
// ===============================

function bookAppointment() {

    let name =
        document.getElementById("patientName").value;

    let email =
        document.getElementById("patientEmail").value;

    let phone =
        document.getElementById("patientPhone").value;

    let doctor =
        document.getElementById("appointmentDoctor").value;

    let date =
        document.getElementById("appointmentDate").value;

    let time =
        document.getElementById("appointmentTime").value;

    let reason =
        document.getElementById("reason").value;


    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        doctor === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please fill all required fields.");

        return;
    }


    let appointment = {

        name: name,

        email: email,

        phone: phone,

        doctor: doctor,

        date: date,

        time: time,

        reason: reason

    };


    appointments.push(appointment);


    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );


    alert("Appointment booked successfully!");


    document.getElementById("patientName").value = "";
    document.getElementById("patientEmail").value = "";
    document.getElementById("patientPhone").value = "";
    document.getElementById("appointmentDoctor").value = "";
    document.getElementById("appointmentDate").value = "";
    document.getElementById("appointmentTime").value = "";
    document.getElementById("reason").value = "";


    loadUserAppointments();

    loadAdminData();

}


// ===============================
// USER APPOINTMENTS
// ===============================

function loadUserAppointments() {

    let table =
        document.getElementById("userAppointments");

    table.innerHTML = "";


    appointments.forEach(function(appointment, index) {

        table.innerHTML += `

            <tr>

                <td>${appointment.name}</td>

                <td>${appointment.doctor}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="cancelAppointment(${index})">

                        Cancel

                    </button>

                </td>

            </tr>

        `;

    });

}


// ===============================
// CANCEL APPOINTMENT
// ===============================

function cancelAppointment(index) {

    if (
        confirm("Are you sure you want to cancel?")
    ) {

        appointments.splice(index, 1);


        localStorage.setItem(
            "appointments",
            JSON.stringify(appointments)
        );


        loadUserAppointments();

        loadAdminData();

    }

}


// ===============================
// ADD DOCTOR - ADMIN
// ===============================

function addDoctor() {

    let name =
        document.getElementById("doctorName").value;

    let specialization =
        document.getElementById("specialization").value;

    let experience =
        document.getElementById("experience").value;


    if (
        name === "" ||
        specialization === "" ||
        experience === ""
    ) {

        alert("Please enter all doctor details.");

        return;
    }


    doctors.push({

        name: name,

        specialization: specialization,

        experience: experience

    });


    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );


    alert("Doctor added successfully!");


    document.getElementById("doctorName").value = "";

    document.getElementById("specialization").value = "";

    document.getElementById("experience").value = "";


    loadDoctors();

    loadAdminData();

}


// ===============================
// ADMIN DATA
// ===============================

function loadAdminData() {

    document.getElementById("doctorCount")
        .innerText = doctors.length;


    document.getElementById("appointmentCount")
        .innerText = appointments.length;


    loadAdminDoctors();

    loadAdminAppointments();

}


// ===============================
// ADMIN DOCTOR LIST
// ===============================

function loadAdminDoctors() {

    let table =
        document.getElementById("adminDoctors");

    table.innerHTML = "";


    doctors.forEach(function(doctor, index) {

        table.innerHTML += `

            <tr>

                <td>${doctor.name}</td>

                <td>${doctor.specialization}</td>

                <td>${doctor.experience}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteDoctor(${index})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}


// ===============================
// DELETE DOCTOR
// ===============================

function deleteDoctor(index) {

    if (
        confirm("Delete this doctor?")
    ) {

        doctors.splice(index, 1);


        localStorage.setItem(
            "doctors",
            JSON.stringify(doctors)
        );


        loadDoctors();

        loadAdminData();

    }

}


// ===============================
// ADMIN APPOINTMENTS
// ===============================

function loadAdminAppointments() {

    let table =
        document.getElementById("adminAppointments");

    table.innerHTML = "";


    appointments.forEach(function(appointment, index) {

        table.innerHTML += `

            <tr>

                <td>${appointment.name}</td>

                <td>${appointment.email}</td>

                <td>${appointment.phone}</td>

                <td>${appointment.doctor}</td>

                <td>${appointment.date}</td>

                <td>${appointment.time}</td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="cancelAppointment(${index})">

                        Cancel

                    </button>

                </td>

            </tr>

        `;

    });

}


// ===============================
// INITIAL LOAD
// ===============================

loadDoctors();

loadAdminData();