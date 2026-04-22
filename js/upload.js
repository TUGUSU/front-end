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
        // STEP 1: Request presigned URL from backend
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
            const errorText = await presignedResponse.text();
            throw new Error("Failed to get presigned URL: " + errorText);
        }

        const presignedData = await presignedResponse.json();
        const uploadUrl = presignedData.uploadUrl;
        const fileUrl = presignedData.fileUrl;

        console.log("Presigned URL:", presignedData);

        // STEP 2: Upload file directly to S3
        const uploadResult = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type
            },
            body: file
        });

        if (!uploadResult.ok) {
            const uploadText = await uploadResult.text();
            throw new Error("Upload to S3 failed: " + uploadText);
        }

        console.log("Uploaded to S3 successfully");

        // STEP 3: Update UI
        const profileImageUrlInput = document.getElementById("profileImageUrl");
        const preview = document.getElementById("imagePreview");

        if (profileImageUrlInput) {
            profileImageUrlInput.value = fileUrl;
        }

        if (preview) {
            preview.src = fileUrl;
            preview.style.display = "block";
        }

        // STEP 4: Notify backend to send email
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
            const notifyText = await notifyResponse.text();
            console.warn("Email notification failed:", notifyText);
        } else {
            console.log("Email sent successfully");
        }

        alert("Upload successful!");

    } catch (error) {
        console.error("Upload error:", error);
        alert("Upload failed.");
    }
}
