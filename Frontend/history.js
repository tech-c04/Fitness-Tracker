// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Remove hidden class from history content since we're on the history page
    const historyContent = document.getElementById('history-content');
    if (historyContent) {
        historyContent.classList.remove('hidden');
    }

    // Initialize the history charts
    initializeHistoryCharts();
    populateWorkoutHistory();

    // Logout functionality
    document.getElementById('logout-btn').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Month filter for workout history
    const workoutMonthSelect = document.getElementById('workout-history-month');
    if (workoutMonthSelect) {
        workoutMonthSelect.addEventListener('change', () => {
            populateWorkoutHistory(parseInt(workoutMonthSelect.value));
        });
    }
});

// ----- History Data Storage and Charts -----

// Sample data generation for history charts
function generateRandomData(count, min, max, trend = 0) {
    const data = [];
    let value = Math.floor(Math.random() * (max - min) + min);
    
    for (let i = 0; i < count; i++) {
        // Add some random variation with a slight trend
        value = Math.max(min, Math.min(max, value + (Math.random() * 10 - 5) + trend));
        data.push(Math.floor(value));
    }
    
    return data;
}

// Generate dates for the last 30 days
function getLast30Days() {
    const dates = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dates.push(`${date.getMonth() + 1}/${date.getDate()}`);
    }
    
    return dates;
}

// Initialize charts
let stepsChart, sleepChart, caloriesChart;

function initializeHistoryCharts() {
    const dates = getLast30Days();
    
    // Generate some initial data if none exists
    if (!localStorage.getItem('stepsHistory')) {
        const initialStepsData = generateRandomData(30, 5000, 12000, 50);
        const initialData = dates.map((date, i) => {
            return { date: new Date(new Date().setDate(new Date().getDate() - (29 - i))).toISOString(), steps: initialStepsData[i] };
        });
        localStorage.setItem('stepsHistory', JSON.stringify(initialData));
    }
    
    if (!localStorage.getItem('sleepHistory')) {
        const initialSleepData = generateRandomData(30, 6, 9, 0);
        const initialData = dates.map((date, i) => {
            return { date: new Date(new Date().setDate(new Date().getDate() - (29 - i))).toISOString(), hours: initialSleepData[i] / 10 + 6 };
        });
        localStorage.setItem('sleepHistory', JSON.stringify(initialData));
    }
    
    if (!localStorage.getItem('caloriesHistory')) {
        const initialCaloriesData = generateRandomData(30, 1500, 2500, 10);
        const initialData = dates.map((date, i) => {
            return { date: new Date(new Date().setDate(new Date().getDate() - (29 - i))).toISOString(), calories: initialCaloriesData[i] };
        });
        localStorage.setItem('caloriesHistory', JSON.stringify(initialData));
    }
    
    // Create charts
    createStepsChart();
    createSleepChart();
    createCaloriesChart();
    
    // Generate workout history
    if (!localStorage.getItem('workoutHistory')) {
        generateWorkoutHistory();
    }
}

function createStepsChart() {
    const stepsHistory = JSON.parse(localStorage.getItem('stepsHistory') || '[]');
    const ctx = document.getElementById('steps-history-chart').getContext('2d');
    
    const dates = stepsHistory.map(entry => {
        const date = new Date(entry.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const stepsData = stepsHistory.map(entry => entry.steps);
    
    if (stepsChart) {
        stepsChart.destroy();
    }
    
    stepsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dates,
            datasets: [{
                label: 'Steps',
                data: stepsData,
                backgroundColor: 'rgba(110, 142, 251, 0.7)',
                borderColor: 'rgba(110, 142, 251, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Steps'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

function createSleepChart() {
    const sleepHistory = JSON.parse(localStorage.getItem('sleepHistory') || '[]');
    const ctx = document.getElementById('sleep-history-chart').getContext('2d');
    
    const dates = sleepHistory.map(entry => {
        const date = new Date(entry.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const sleepData = sleepHistory.map(entry => entry.hours);
    
    if (sleepChart) {
        sleepChart.destroy();
    }
    
    sleepChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Sleep Hours',
                data: sleepData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

function createCaloriesChart() {
    const caloriesHistory = JSON.parse(localStorage.getItem('caloriesHistory') || '[]');
    const ctx = document.getElementById('calories-history-chart').getContext('2d');
    
    const dates = caloriesHistory.map(entry => {
        const date = new Date(entry.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    });
    
    const caloriesData = caloriesHistory.map(entry => entry.calories);
    
    if (caloriesChart) {
        caloriesChart.destroy();
    }
    
    caloriesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Calories Burned',
                data: caloriesData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calories'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

// Workout history generation and display
function generateWorkoutHistory() {
    const workoutTypes = [
        'Full Body', 'Upper Body', 'Lower Body', 'Cardio', 'HIIT', 
        'Core', 'Yoga', 'Stretching', 'Chest & Triceps', 'Back & Biceps'
    ];
    
    const intensities = ['Low', 'Medium', 'High'];
    
    const workoutHistory = [];
    const today = new Date();
    
    // Generate 4 months of workout data (3-5 workouts per week)
    for (let month = 0; month < 4; month++) {
        const daysInMonth = new Date(today.getFullYear(), today.getMonth() - month + 1, 0).getDate();
        
        // Generate 12-20 workouts for the month
        const workoutsThisMonth = Math.floor(Math.random() * 8) + 12;
        
        for (let w = 0; w < workoutsThisMonth; w++) {
            const day = Math.floor(Math.random() * daysInMonth) + 1;
            const workoutType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
            const intensity = intensities[Math.floor(Math.random() * intensities.length)];
            const duration = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
            const calories = Math.floor((duration / 60) * (intensity === 'Low' ? 300 : intensity === 'Medium' ? 500 : 700));
            
            const date = new Date(today.getFullYear(), today.getMonth() - month, day);
            
            workoutHistory.push({
                date: date.toISOString(),
                type: workoutType,
                duration: duration,
                intensity: intensity,
                calories: calories
            });
        }
    }
    
    // Sort by date (newest first)
    workoutHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
}

function populateWorkoutHistory(month = null) {
    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    const tableBody = document.getElementById('workout-history-data');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    const today = new Date();
    const filteredHistory = month ? 
        workoutHistory.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate.getMonth() + 1 === month && workoutDate.getFullYear() === today.getFullYear();
        }) : 
        workoutHistory;
    
    if (filteredHistory.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" style="text-align: center;">No workout data available for this period</td>`;
        tableBody.appendChild(row);
        return;
    }
    
    filteredHistory.forEach(workout => {
        const workoutDate = new Date(workout.date);
        const formattedDate = `${workoutDate.getMonth() + 1}/${workoutDate.getDate()}/${workoutDate.getFullYear()}`;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${workout.type}</td>
            <td>${workout.duration} mins</td>
            <td><span class="intensity-${workout.intensity.toLowerCase()}">${workout.intensity}</span></td>
            <td>${workout.calories}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Add functions to handle data from the main page
function saveStepsData(steps) {
    const stepsHistory = JSON.parse(localStorage.getItem('stepsHistory') || '[]');
    stepsHistory.push({ date: new Date().toISOString(), steps });
    
    // Keep only the last 30 entries
    if (stepsHistory.length > 30) {
        stepsHistory.shift();
    }
    
    localStorage.setItem('stepsHistory', JSON.stringify(stepsHistory));
}

function saveSleepData(hours) {
    const sleepHistory = JSON.parse(localStorage.getItem('sleepHistory') || '[]');
    sleepHistory.push({ date: new Date().toISOString(), hours });
    
    if (sleepHistory.length > 30) {
        sleepHistory.shift();
    }
    
    localStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));
}

function saveCaloriesData(calories) {
    const caloriesHistory = JSON.parse(localStorage.getItem('caloriesHistory') || '[]');
    caloriesHistory.push({ date: new Date().toISOString(), calories });
    
    if (caloriesHistory.length > 30) {
        caloriesHistory.shift();
    }
    
    localStorage.setItem('caloriesHistory', JSON.stringify(caloriesHistory));
}

// Add a function to refresh charts if needed
function refreshHistoryCharts() {
    createStepsChart();
    createSleepChart();
    createCaloriesChart();
    populateWorkoutHistory(parseInt(document.getElementById('workout-history-month').value) || null);
}