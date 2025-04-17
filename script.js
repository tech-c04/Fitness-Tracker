// // Add this to the top of your existing script.js or inline in index.html
// document.addEventListener('DOMContentLoaded', function() {
//     // Check if user is logged in
//     if (localStorage.getItem('fitTrackLoggedIn') !== 'true') {
//         // Redirect to login page if not logged in
//         window.location.href = 'login.html';
//         return;
//     }
    
//     // Set up the logout button
//     const logoutBtn = document.getElementById('logout-btn');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', function(e) {
//             e.preventDefault();
//             // Clear login data
//             localStorage.removeItem('fitTrackLoggedIn');
//             localStorage.removeItem('fitTrackUsername');
//             // Redirect to login page
//             window.location.href = 'login.html';
//         });
//     }
    
//     // Display username if you want to add this feature
//     const username = localStorage.getItem('fitTrackUsername');
//     if (username) {
//         // You could add a username display element in your HTML
//         // const userDisplay = document.getElementById('user-display');
//         // if (userDisplay) {
//         //     userDisplay.textContent = username;
//         // }
//     }
// });
// // Simulated user data
// const userData = {
//     username: "user",
//     password: "password",
//     steps: 7543,
//     nightSleep: 7,
//     noonNap: 0.5,
//     totalSleep: 7.5,
//     calories: 1856,
//     bmi: 0,
//     activityHistory: [
//         { day: "Sun", steps: 6320 },
//         { day: "Mon", steps: 8210 },
//         { day: "Tue", steps: 7546 },
//         { day: "Wed", steps: 9123 },
//         { day: "Thu", steps: 5872 },
//         { day: "Fri", steps: 7543 },
//         { day: "Sat", steps: 0 } // Today (no steps yet)
//     ]
// };

// // DOM Elements
// //const loginPage = document.getElementById('login-page');
// const dashboardPage = document.getElementById('dashboard-page');
// const loginBtn = document.getElementById('login-btn');
// const logoutBtn = document.getElementById('logout-btn');
// const username = document.getElementById('username');
// const password = document.getElementById('password');
// const bmiCalculateBtn = document.getElementById('calculate-bmi');
// const heightInput = document.getElementById('height');
// const weightInput = document.getElementById('weight');
// const bmiResult = document.getElementById('bmi-result');
// const stepsValue = document.getElementById('steps-value');
// const sleepValue = document.getElementById('sleep-value');
// const caloriesValue = document.getElementById('calories-value');
// const addStepsInput = document.getElementById('add-steps');
// const updateStepsBtn = document.getElementById('update-steps');
// const nightSleepInput = document.getElementById('night-sleep');
// const noonNapInput = document.getElementById('noon-nap');
// const updateSleepBtn = document.getElementById('update-sleep');
// const sleepStatus = document.getElementById('sleep-status');
// const workoutTabs = document.querySelectorAll('.workout-tab');
// const workoutContents = document.querySelectorAll('.workout-content');
// const activityChart = document.getElementById('activity-chart');

// // Event Listeners
// // loginBtn.addEventListener('click', handleLogin);
// // logoutBtn.addEventListener('click', handleLogout);
// // bmiCalculateBtn.addEventListener('click', calculateBMI);
// // updateStepsBtn.addEventListener('click', updateSteps);
// // updateSleepBtn.addEventListener('click', updateSleep);

// if (loginBtn) loginBtn.addEventListener('click', handleLogin);
// if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
// if (bmiCalculateBtn) bmiCalculateBtn.addEventListener('click', calculateBMI);
// if (updateStepsBtn) updateStepsBtn.addEventListener('click', updateSteps);
// if (updateSleepBtn) updateSleepBtn.addEventListener('click', updateSleep);


// // Setup workout tabs
// workoutTabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         // Remove active class from all tabs
//         workoutTabs.forEach(t => t.classList.remove('active'));
//         // Add active class to clicked tab
//         tab.classList.add('active');
        
//         // Hide all workout contents
//         workoutContents.forEach(content => content.classList.remove('active'));
//         // Show the selected workout content
//         const level = tab.getAttribute('data-level');
//         document.getElementById(`${level}-workouts`).classList.add('active');
//     });
// });

// // Login Handler
// // function handleLogin() {
// //     // Simple login validation (for demo purposes only)
// //     if (username.value === userData.username && password.value === userData.password) {
// //         loginPage.classList.add('hidden');
// //         dashboardPage.classList.remove('hidden');
// //         updateDashboard();
// //         renderActivityChart();
// //         updateSleepDisplay();
// //     } else {
// //         alert('Invalid username or password. Try using "user" and "password".');
// //     }
// // }

// // // Logout Handler
// // function handleLogout() {
// //     loginPage.classList.remove('hidden');
// //     dashboardPage.classList.add('hidden');
// //     username.value = '';
// //     password.value = '';
// // }

// // Calculate BMI
// function calculateBMI() {
//     const height = parseFloat(heightInput.value) / 100; // convert cm to meters
//     const weight = parseFloat(weightInput.value);
    
//     if (height && weight) {
//         const bmi = (weight / (height * height)).toFixed(1);
//         userData.bmi = bmi;
        
//         let category = '';
//         if (bmi < 18.5) {
//             category = 'Underweight';
//         } else if (bmi >= 18.5 && bmi < 25) {
//             category = 'Normal weight';
//         } else if (bmi >= 25 && bmi < 30) {
//             category = 'Overweight';
//         } else {
//             category = 'Obese';
//         }
        
//         bmiResult.textContent = `Your BMI: ${bmi} (${category})`;
//     } else {
//         alert('Please enter valid height and weight values.');
//     }
// }

// // Update Steps
// function updateSteps() {
//     const steps = parseInt(addStepsInput.value);
//     if (steps) {
//         userData.steps += steps;
//         userData.activityHistory[6].steps = userData.steps; // Update today's steps
//         stepsValue.textContent = userData.steps.toLocaleString();
//         // Calculate calories (simple approximation)
//         userData.calories = Math.round(userData.steps * 0.04);
//         caloriesValue.textContent = userData.calories.toLocaleString();
//         addStepsInput.value = '';
//         renderActivityChart(); // Re-render the chart with updated data
//     }
// }

// // Update Sleep with separate night and noon inputs
// function updateSleep() {
//     const nightHours = parseFloat(nightSleepInput.value) || 0;
//     const noonHours = parseFloat(noonNapInput.value) || 0;
    
//     if ((nightHours >= 0 && nightHours <= 12) && (noonHours >= 0 && noonHours <= 5)) {
//         userData.nightSleep = nightHours;
//         userData.noonNap = noonHours;
//         userData.totalSleep = nightHours + noonHours;
        
//         // Format sleep display
//         const totalHours = Math.floor(userData.totalSleep);
//         const totalMinutes = Math.round((userData.totalSleep - totalHours) * 60);
//         userData.sleep = `${totalHours}h ${totalMinutes}m`;
//         sleepValue.textContent = userData.sleep;
        
//         // Clear inputs
//         nightSleepInput.value = '';
//         noonNapInput.value = '';
        
//         updateSleepStatus();
//     } else {
//         alert('Please enter valid sleep hours. Night sleep should be between 0-12 hours and noon nap between 0-5 hours.');
//     }
// }

// // Update sleep status based on total sleep hours
// function updateSleepStatus() {
//     sleepStatus.className = 'sleep-status'; // Reset class
    
//     if (userData.totalSleep > 9) {
//         sleepStatus.textContent = 'You are oversleeping. Try to reduce sleep time for better health.';
//         sleepStatus.classList.add('status-oversleeping');
//     } else if (userData.totalSleep >= 7 && userData.totalSleep <= 9) {
//         sleepStatus.textContent = 'Your sleep duration is ideal. Keep it up!';
//         sleepStatus.classList.add('status-normal');
//     } else {
//         sleepStatus.textContent = 'You need more sleep. Try to get at least 7 hours for better health.';
//         sleepStatus.classList.add('status-undersleeping');
//     }
// }

// // Render the activity history chart
// function renderActivityChart() {
//     // Clear previous chart
//     activityChart.innerHTML = '';
    
//     // Find max steps to normalize chart heights
//     const maxSteps = Math.max(...userData.activityHistory.map(day => day.steps));
    
//     // Create bars for each day
//     userData.activityHistory.forEach(day => {
//         // Calculate height percentage based on max steps
//         const heightPercentage = maxSteps > 0 ? (day.steps / maxSteps) * 100 : 0;
        
//         // Create chart bar element
//         const barElement = document.createElement('div');
//         barElement.className = 'chart-bar';
//         barElement.style.height = `${heightPercentage}%`;
        
//         // Add label (day)
//         const labelElement = document.createElement('div');
//         labelElement.className = 'chart-bar-label';
//         labelElement.textContent = day.day;
//         barElement.appendChild(labelElement);
        
//         // Add value (steps)
//         const valueElement = document.createElement('div');
//         valueElement.className = 'chart-bar-value';
//         valueElement.textContent = day.steps > 0 ? day.steps.toLocaleString() : '-';
//         barElement.appendChild(valueElement);
        
//         // Add to chart
//         activityChart.appendChild(barElement);
//     });
// }

// // Update Dashboard with user data
// function updateDashboard() {
//     stepsValue.textContent = userData.steps.toLocaleString();
//     sleepValue.textContent = userData.sleep;
//     caloriesValue.textContent = userData.calories.toLocaleString();
// }

// // Update the sleep display initially
// function updateSleepDisplay() {
//     updateSleepStatus();
// }

// document.addEventListener('DOMContentLoaded', function() {
//     // Remove login check temporarily
//     updateDashboard();
//     updateSleepDisplay();
//     renderActivityChart();
// });


document.addEventListener('DOMContentLoaded', function () {
    // Skip login logic for now

    const bmiCalculateBtn = document.getElementById('calculate-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiResult = document.getElementById('bmi-result');
    const stepsValue = document.getElementById('steps-value');
    const sleepValue = document.getElementById('sleep-value');
    const caloriesValue = document.getElementById('calories-value');
    const addStepsInput = document.getElementById('add-steps');
    const updateStepsBtn = document.getElementById('update-steps');
    const nightSleepInput = document.getElementById('night-sleep');
    const noonNapInput = document.getElementById('noon-nap');
    const updateSleepBtn = document.getElementById('update-sleep');
    const sleepStatus = document.getElementById('sleep-status');
    const workoutTabs = document.querySelectorAll('.workout-tab');
    const workoutContents = document.querySelectorAll('.workout-content');
    const activityChart = document.getElementById('activity-chart');

    const userData = {
        steps: 0,
        nightSleep: 0,
        noonNap: 0.0,
        totalSleep: 0.0,
        calories: 0,
        activityHistory: [
            { day: "Sun", steps: 6320 },
            { day: "Mon", steps: 8210 },
            { day: "Tue", steps: 7546 },
            { day: "Wed", steps: 9123 },
            { day: "Thu", steps: 5872 },
            { day: "Fri", steps: 7543 },
            { day: "Sat", steps: 0 }
        ]
    };

    async function getTodayActivity() {
        const token = localStorage.getItem('fitTrackToken');
      
        try {
          const response = await fetch('http://localhost:5000/api/activities/today', {
            method: 'GET',
            headers: {
              'x-auth-token': token
            }
          });
      
          const data = await response.json();
          console.log('Today\'s activity:', data);
      
          // Fill in activity data
          document.getElementById('steps-value').textContent = data.steps?.toLocaleString() || '0';
          document.getElementById('calories-value').textContent = data.calories?.toLocaleString() || '0';
      
          const totalSleep = (data.nightSleep || 0) + (data.noonNap || 0);
          const sleepText = `${Math.floor(totalSleep)}h ${Math.round((totalSleep % 1) * 60)}m`;
          document.getElementById('sleep-value').textContent = sleepText;
      
          // Update sleep status
          const sleepStatus = document.getElementById('sleep-status');
          sleepStatus.className = 'sleep-status';
      
          if (totalSleep > 9) {
            sleepStatus.textContent = 'You are oversleeping.';
            sleepStatus.classList.add('status-oversleeping');
          } else if (totalSleep >= 7) {
            sleepStatus.textContent = 'Your sleep is ideal.';
            sleepStatus.classList.add('status-normal');
          } else {
            sleepStatus.textContent = 'Try to sleep more.';
            sleepStatus.classList.add('status-undersleeping');
          }
        } catch (err) {
          console.error('Failed to fetch activity:', err);
        }
      }
      
      if (bmiCalculateBtn)
        bmiCalculateBtn.addEventListener('click', function () {
            const height = parseFloat(heightInput.value) / 100;
            const weight = parseFloat(weightInput.value);
    
            if (height > 0 && weight > 0) {
                const bmi = (weight / (height * height)).toFixed(1);
                let category = '';
    
                if (bmi < 18.5) category = 'Underweight';
                else if (bmi < 25) category = 'Normal weight';
                else if (bmi < 30) category = 'Overweight';
                else category = 'Obese';
    
                bmiResult.textContent = `Your BMI: ${bmi} (${category})`;
                saveBmi(height, weight);
            } else {
                alert('Please enter valid (positive) height and weight.');
            }
        });
    
    // if (bmiCalculateBtn)
    //     bmiCalculateBtn.addEventListener('click', function () {
    //         const height = parseFloat(heightInput.value) / 100;
    //         const weight = parseFloat(weightInput.value);

    //         if (height && weight) {
    //             const bmi = (weight / (height * height)).toFixed(1);
    //             let category = '';

    //             if (bmi < 18.5) category = 'Underweight';
    //             else if (bmi < 25) category = 'Normal weight';
    //             else if (bmi < 30) category = 'Overweight';
    //             else category = 'Obese';

    //             bmiResult.textContent = `Your BMI: ${bmi} (${category})`;
    //             saveBmi(height, weight);
    //         } else {
    //             alert('Please enter valid height and weight.');
    //         }
    //     });

  //   updateStepsBtn.addEventListener('click', function () {
  //     const steps = parseInt(addStepsInput.value);
  //     if (steps > 0 || steps % 1 == 0) {
  //         userData.steps += steps;
  //         userData.calories = Math.round(userData.steps * 0.04);
  //         stepsValue.textContent = userData.steps.toLocaleString();
  //         caloriesValue.textContent = userData.calories.toLocaleString();
  //         addStepsInput.value = '';
  //         renderActivityChart();
  //         saveSteps(60, userData.calories, userData.steps);
  //     } else {
  //         alert('Please enter a valid (positive) whole number of steps.');
  //     }
  // });
  
  updateStepsBtn.addEventListener('click', function () {
    const stepsInput = addStepsInput.value.trim();
    const steps = Number(stepsInput);

    const stepsError = document.getElementById('steps-error');
    stepsError.textContent = ''; // Clear previous error

    if (!stepsInput || isNaN(steps) || steps <= 0 || !Number.isInteger(steps)) {
        stepsError.textContent = 'Please enter a valid positive whole number for steps.';
        return;
    }

    userData.steps += steps;
    userData.calories = Math.round(userData.steps * 0.04);
    stepsValue.textContent = userData.steps.toLocaleString();
    caloriesValue.textContent = userData.calories.toLocaleString();
    addStepsInput.value = '';
    renderActivityChart();
    saveSteps(60, userData.calories, userData.steps);
});


    // if (updateStepsBtn)
        
    //     updateStepsBtn.addEventListener('click', function () {
    //         const steps = parseInt(addStepsInput.value);
    //         if (steps) {
    //             userData.steps += steps;
    //             userData.calories = Math.round(userData.steps * 0.04);
    //             stepsValue.textContent = userData.steps.toLocaleString();
    //             caloriesValue.textContent = userData.calories.toLocaleString();
    //             addStepsInput.value = '';
    //             console.log('user data = '+JSON.stringify(userData));
    //             renderActivityChart();
    //             saveSteps(60, userData.calories, userData.steps);
    //         }
    //     });

    updateSleepBtn.addEventListener('click', function () {
      const night = parseFloat(nightSleepInput.value) || 0;
      const noon = parseFloat(noonNapInput.value) || 0;
  
      if (night < 0 || noon < 0) {
          alert('Please enter valid (non-negative) sleep values.');
          return;
      }
  
      userData.totalSleep = night + noon;
  
      const hours = Math.floor(userData.totalSleep);
      const minutes = Math.round((userData.totalSleep - hours) * 60);
      sleepValue.textContent = `${hours}h ${minutes}m`;
  
      nightSleepInput.value = '';
      noonNapInput.value = '';
  
      sleepStatus.className = 'sleep-status';
      if (userData.totalSleep > 9) {
          sleepStatus.textContent = 'You are oversleeping.';
          sleepStatus.classList.add('status-oversleeping');
      } else if (userData.totalSleep >= 7) {
          sleepStatus.textContent = 'Your sleep is ideal.';
          sleepStatus.classList.add('status-normal');
      } else {
          sleepStatus.textContent = 'Try to sleep more.';
          sleepStatus.classList.add('status-undersleeping');
      }
      saveSleep(night, noon);
  });
  

    // if (updateSleepBtn)
    //     updateSleepBtn.addEventListener('click', function () {
    //         const night = parseFloat(nightSleepInput.value) || 0;
    //         const noon = parseFloat(noonNapInput.value) || 0;
    //         userData.totalSleep = night + noon;

    //         const hours = Math.floor(userData.totalSleep);
    //         const minutes = Math.round((userData.totalSleep - hours) * 60);
    //         sleepValue.textContent = `${hours}h ${minutes}m`;

    //         nightSleepInput.value = '';
    //         noonNapInput.value = '';

    //         sleepStatus.className = 'sleep-status';
    //         if (userData.totalSleep > 9) {
    //             sleepStatus.textContent = 'You are oversleeping.';
    //             sleepStatus.classList.add('status-oversleeping');
    //         } else if (userData.totalSleep >= 7) {
    //             sleepStatus.textContent = 'Your sleep is ideal.';
    //             sleepStatus.classList.add('status-normal');
    //         } else {
    //             sleepStatus.textContent = 'Try to sleep more.';
    //             sleepStatus.classList.add('status-undersleeping');
    //         }
    //         saveSleep(night, noon);
    //     });

    // Tab switching
    workoutTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            workoutTabs.forEach(t => t.classList.remove('active'));
            workoutContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const target = document.getElementById(`${tab.dataset.level}-workouts`);
            if (target) target.classList.add('active');
        });
    });

    function renderActivityChart() {
        if (!activityChart) return;

        activityChart.innerHTML = '';
        const max = Math.max(...userData.activityHistory.map(d => d.steps));
        userData.activityHistory.forEach(d => {
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${(d.steps / max) * 100}%`;

            const label = document.createElement('div');
            label.className = 'chart-bar-label';
            label.textContent = d.day;
            bar.appendChild(label);

            const val = document.createElement('div');
            val.className = 'chart-bar-value';
            val.textContent = d.steps.toLocaleString();
            bar.appendChild(val);

            activityChart.appendChild(bar);
        });
    }

    async function saveSteps(duration, calories, steps) {
      const token = localStorage.getItem('fitTrackToken');
      steps_request = {
        "type": "Steps",
        "duration": duration,  
        "calories": calories,     
        "steps": steps         
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/activities/steps', {
          method: 'PUT',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(steps_request)
        });
    
        const data = await response.json();
        console.log('Steps response:', data);
      }
      catch (err) {
        console.error('Failed to store steps:', err);
      }
    }

    async function saveSleep(night, noon) {
      const token = localStorage.getItem('fitTrackToken');
      sleep_request = {
        "type": "Sleep",  
        "nightSleep": night,
        "noonNap": noon
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/activities/sleep', {
          method: 'PUT',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sleep_request)
        });
    
        const data = await response.json();
        console.log('Sleep response:', data);
      }
      catch (err) {
        console.error('Failed to store sleep:', err);
      }
    }

    async function saveBmi(height, weight) {
      const token = localStorage.getItem('fitTrackToken');
      sleep_request = {
        "type": "BMI",  
        "height": height,
        "weight": weight
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/bmi', {
          method: 'POST',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sleep_request)
        });
    
        const data = await response.json();
        console.log('BMI response:', data);
      }
      catch (err) {
        console.error('Failed to store BMI:', err);
      }
    }

    //Initial load
    stepsValue.textContent = userData.steps.toLocaleString();
    sleepValue.textContent = `${Math.floor(userData.totalSleep)}h ${Math.round((userData.totalSleep % 1) * 60)}m`;
    caloriesValue.textContent = userData.calories.toLocaleString();
    renderActivityChart();
    getTodayActivity();

});
