async function uploadProfileImage() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file.");
        return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        return;
    }

    try {
        // ================= STEP 1: GET PRESIGNED URL =================
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

        if (!presignedResponse.ok) {
            throw new Error("Failed to get presigned URL");
        }

        const presignedData = await presignedResponse.json();

        const uploadUrl = presignedData.uploadUrl;
        const fileUrl = presignedData.fileUrl;

        console.log("Presigned URL:", presignedData);

        // ================= STEP 2: UPLOAD TO S3 =================
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

        console.log("Uploaded to S3 successfully");

        // ================= STEP 3: UPDATE UI =================
        document.getElementById("imageUrl").value = fileUrl;

        const preview = document.getElementById("imagePreview");
        preview.src = fileUrl;
        preview.style.display = "block";

        // ================= STEP 4: CALL BACKEND (SEND EMAIL) =================
        const notifyResponse = await fetch(
            CONFIG.FILE_BASE_URL + "/notify-upload-success",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileUrl: fileUrl
                })
            }
        );

        if (!notifyResponse.ok) {
            console.warn("Email notification failed");
        } else {
            console.log("Email sent successfully");
        }

        alert("Upload successful + Email sent!");

    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed.");
    }
}