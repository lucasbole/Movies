//Clase 5
class Login {
    constructor() {  
      const loginForm = document.querySelector('#login-form');
      if (loginForm) {
          this.doLogin = this.doLogin.bind(this);
          loginForm.addEventListener('submit', this.doLogin);
          console.log("Login form found and event listener registered");
      } else {
          console.log("Login form not found");
      }
    }

    doLogin(event) {
        event.preventDefault();
        const user = document.querySelector("#username").value;
        const pass = document.querySelector("#password").value;
        const key = "River Plate"; // Clave privada de encriptacion
const encryptedLoginUsername = CryptoJS.AES.encrypt(user, key).toString();
const encryptedLoginPassword = CryptoJS.AES.encrypt(pass, key).toString();
        
    const loginBody = {
      username: encryptedLoginUsername,
      password: encryptedLoginPassword
        };

        const fetchOptions = {
           method: 'POST',
           headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
           body: JSON.stringify(loginBody)
        };
        
        console.log(loginBody);
        
        return fetch('/login/', fetchOptions)
            .then(user =>   window.location.href = '/');
    }
}
// Init app
new Login();

