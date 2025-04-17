// //document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is already logged in
//     // if (localStorage.getItem('fitTrackLoggedIn') === 'true') {
//     //     // Redirect to dashboard if already logged in
//     //     window.location.href = 'index.html';
//     //     return;
//     // }
//     document.addEventListener('DOMContentLoaded', function() {
//         // Force logout when reaching the login page
//             localStorage.removeItem('fitTrackLoggedIn');
//             localStorage.removeItem('fitTrackUsername');
    
//     const loginBtn = document.getElementById('login-btn');
//     const usernameInput = document.getElementById('username');
//     const passwordInput = document.getElementById('password');
//     const errorMessage = document.getElementById('error-message');
    
//     // Set focus on username input when page loads
//     usernameInput.focus();
    
//     // Login button click handler
//     loginBtn.addEventListener('click', handleLogin);
    
//     // Enter key press handler
//     passwordInput.addEventListener('keypress', function(event) {
//         if (event.key === 'Enter') {
//             handleLogin();
//         }
//     });
    
//     // Login function
//     function handleLogin() {
//         const username = usernameInput.value.trim();
//         const password = passwordInput.value.trim();
        
//         // Simple validation
//         if (!username || !password) {
//             showError('Please enter both username and password');
//             return;
//         }
        
//         // For demo purposes: accept any username/password
//         // In a real app, you would verify credentials against a server
        
//         // Store login information
//         localStorage.setItem('fitTrackLoggedIn', 'true');
//         localStorage.setItem('fitTrackUsername', username);
        
//         // Redirect to dashboard
//         window.location.href = 'index.html';
//     }
    
//     function showError(message) {
//         errorMessage.textContent = message;
//         errorMessage.style.visibility = 'visible';
        
//         // Shake effect for error
//         loginBtn.classList.add('shake');
//         setTimeout(() => {
//             loginBtn.classList.remove('shake');
//         }, 500);
//     }
// });

document.addEventListener('DOMContentLoaded', function() {
    // Force logout when reaching the login page
    localStorage.removeItem('fitTrackLoggedIn');
    localStorage.removeItem('fitTrackUsername');
    localStorage.removeItem('fitTrackToken'); // Add this to also clear token

    const loginBtn = document.getElementById('login-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const API_URL = 'http://localhost:5000/api'; // Add your API URL
    
    // Set focus on username input when page loads
    usernameInput.focus();
    
    // Login button click handler
    loginBtn.addEventListener('click', handleLogin);
    
    // Enter key press handler
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleLogin();
        }
    });
    
    // Login function with backend integration
    async function handleLogin() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Simple validation
        if (!username || !password) {
            showError('Please enter both username and password');
            return;
        }
        
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                showError(data.msg || 'Login failed');
                return;
            }
            
            // Save the token and login information
            localStorage.setItem('fitTrackToken', data.token);
            localStorage.setItem('fitTrackLoggedIn', 'true');
            localStorage.setItem('fitTrackUsername', username);
            
            // Redirect to dashboard
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Login error:', error);
            showError('Server error. Please try again later.');
        }
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.visibility = 'visible';
        
        // Shake effect for error
        loginBtn.classList.add('shake');
        setTimeout(() => {
            loginBtn.classList.remove('shake');
        }, 500);
    }
});