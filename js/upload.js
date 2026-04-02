async function uploadProfileImage() {
    const fileInput = document.getElementById("profileImageFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(CONFIG.FILE_BASE_URL + "/upload", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + getToken()
            },
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("profileImageUrl").value = result.url;
            document.getElementById("uploadedImagePreview").src = result.url;
            document.getElementById("uploadedImagePreview").style.display = "block";
            showResult(result);
            alert("Image uploaded successfully.");
        } else {
            showResult(result);
            alert("Image upload failed.");
        }
    } catch (error) {
        console.error("Upload error:", error);
        alert("Error uploading image.");
    }
}