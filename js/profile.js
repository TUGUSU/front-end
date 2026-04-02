function getToken() {
    return localStorage.getItem("token");
}

function headers() {
    return {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    };
}

function showResult(data) {
    try {
        if (typeof data === "string") {
            document.getElementById("result").innerText = data;
        } else {
            document.getElementById("result").innerText = JSON.stringify(data, null, 2);
        }
    } catch (e) {
        document.getElementById("result").innerText = data;
    }
}

async function createUser() {
    const user = {
        id: parseInt(document.getElementById("createId").value),
        name: document.getElementById("createName").value,
        email: document.getElementById("createEmail").value,
        bio: document.getElementById("createBio").value,
        phone: document.getElementById("createPhone").value,
        profileImageUrl: document.getElementById("profileImageUrl").value || null
    };

    const response = await fetch(CONFIG.JSON_BASE_URL, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(user)
    });

    const text = await response.text();

    try {
        showResult(JSON.parse(text));
    } catch {
        showResult(text);
    }
}

async function getUser() {
    const id = document.getElementById("getUserId").value;

    const response = await fetch(CONFIG.JSON_BASE_URL + "/" + id, {
        method: "GET",
        headers: headers()
    });

    const text = await response.text();

    try {
        showResult(JSON.parse(text));
    } catch {
        showResult(text);
    }
}

async function updateUser() {
    const id = document.getElementById("updateId").value;

    const user = {
        id: parseInt(id),
        name: document.getElementById("updateName").value,
        email: document.getElementById("updateEmail").value,
        bio: document.getElementById("updateBio").value,
        phone: document.getElementById("updatePhone").value,
        profileImageUrl: document.getElementById("profileImageUrl").value || null
    };

    const response = await fetch(CONFIG.JSON_BASE_URL + "/" + id, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(user)
    });

    const text = await response.text();

    try {
        showResult(JSON.parse(text));
    } catch {
        showResult(text);
    }
}

async function deleteUser() {
    const id = document.getElementById("deleteId").value;

    const response = await fetch(CONFIG.JSON_BASE_URL + "/" + id, {
        method: "DELETE",
        headers: headers()
    });

    const text = await response.text();

    try {
        showResult(JSON.parse(text));
    } catch {
        showResult(text);
    }
}