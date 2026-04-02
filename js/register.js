async function registerUser() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Username and password are required.");
        return;
    }

    const soapRequest = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:aut="http://example.com/auth">
   <soapenv:Header/>
   <soapenv:Body>
      <aut:RegisterUserRequest>
         <aut:username>${username}</aut:username>
         <aut:password>${password}</aut:password>
      </aut:RegisterUserRequest>
   </soapenv:Body>
</soapenv:Envelope>`;

    try {
        const response = await fetch(CONFIG.SOAP_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "text/xml;charset=UTF-8"
            },
            body: soapRequest
        });

        const text = await response.text();
        document.getElementById("result").innerText = text;
        alert("Register request sent.");
    } catch (error) {
        console.error("Register error:", error);
        alert("Error during register.");
    }
}