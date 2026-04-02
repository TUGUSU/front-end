async function login() {
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
      <aut:LoginUserRequest>
         <aut:username>${username}</aut:username>
         <aut:password>${password}</aut:password>
      </aut:LoginUserRequest>
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

        const tokenMatch = text.match(/<[^>]*token>(.*?)<\/[^>]*token>/);

        if (tokenMatch && tokenMatch[1]) {
            localStorage.setItem("token", tokenMatch[1]);
            alert("Login successful. Token saved.");
            window.location.href = "profile.html";
        } else {
            alert("Login failed. Check username/password.");
        }
    } catch (error) {
        console.error("Login error:", error);
        alert("Error during login.");
    }
}