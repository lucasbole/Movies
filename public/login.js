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
  
      const registerForm = document.querySelector('#register-form');
      if (registerForm) {
          this.doRegister = this.doRegister.bind(this);
          registerForm.addEventListener('submit', this.doRegister);
          console.log("Register form found and event listener registered");
      } else {
          console.log("Register form not found");
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

    doRegister(event) {
      event.preventDefault();
      const user = document.querySelector("#registerusername").value;
      const pass = document.querySelector("#registerpassword").value;
      const key = "River Plate"; // Clave privada de encriptacion
const encryptedLoginUsername = CryptoJS.AES.encrypt(user, key).toString();
const encryptedLoginPassword = CryptoJS.AES.encrypt(pass, key).toString();
    
      const registerBody = {
        username: encryptedLoginUsername,
        password: encryptedLoginPassword
      };

      const fetchOptions = {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
         body: JSON.stringify(registerBody)
      };
      
      console.log("Register body:",registerBody);
      
      return fetch('/register/', fetchOptions)
      .then(response => {
          console.log("Response:", response);
          if (response.ok) {
              console.log("Registration successful, redirecting to login");
              window.location.href = '/login';
          } else {
              console.error('Error during registration:', response.statusText);
          }
      })
      .catch(error => {
          console.error('Fetch error:', error);
      });;
  }
}
// Init app
new Login();

