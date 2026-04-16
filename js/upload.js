async function uploadProfileImage() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const presignedResponse = await fetch(
            CONFIG.FILE_BASE_URL + "/presigned-url",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    fileName: file.name,
                    contentType: file.type
                })
            }
        );

        const presignedData = await presignedResponse.json();

        const uploadUrl = presignedData.uploadUrl;
        const fileUrl = presignedData.fileUrl;

        const uploadResult = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });

        if (!uploadResult.ok) {
            throw new Error("Upload to S3 failed");
        }

        document.getElementById("imageUrl").value = fileUrl;
        document.getElementById("imagePreview").src = fileUrl;
        document.getElementById("imagePreview").style.display = "block";

        alert("Upload successful via presigned URL!");

    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed.");
    }
}