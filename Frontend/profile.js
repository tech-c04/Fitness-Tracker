document.addEventListener('DOMContentLoaded', function() {
    // Load user profile data from localStorage or use defaults
    loadUserProfile();
    
    // Set up event listeners
    setupEventListeners();
});

function loadUserProfile() {
    // In a real application, this would be fetched from a server
    // For now, we'll use localStorage to simulate data persistence
    const userData = JSON.parse(localStorage.getItem('fitTrackUserProfile')) || {
        username: localStorage.getItem('fitTrackUsername') || 'FitTrack User',
        age: 30,
        gender: 'Male',
        height: 175,
        weight: 70,
        targetWeight: 65,
        stepGoal: 10000,
        fitnessGoal: 'Weight Loss',
        avatar: null
    };
    
    // Update the DOM with user data
    document.getElementById('profile-username').textContent = userData.username;
    document.getElementById('profile-age').textContent = userData.age;
    document.getElementById('profile-gender').textContent = userData.gender;
    document.getElementById('profile-height').textContent = `${userData.height} cm`;
    document.getElementById('profile-weight').textContent = `${userData.weight} kg`;
    document.getElementById('profile-target-weight').textContent = `${userData.targetWeight} kg`;
    document.getElementById('profile-step-goal').textContent = `${userData.stepGoal.toLocaleString()} steps`;
    document.getElementById('profile-fitness-goal').textContent = userData.fitnessGoal;
    
    // Calculate and display BMI
    const heightInMeters = userData.height / 100;
    const bmi = userData.weight / (heightInMeters * heightInMeters);
    document.getElementById('profile-bmi').textContent = bmi.toFixed(1);
    
    // Set avatar if available
    if (userData.avatar) {
        document.getElementById('profile-image').src = userData.avatar;
    }
}

function setupEventListeners() {
    // Avatar upload
    document.getElementById('avatar-upload').addEventListener('change', handleAvatarUpload);
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', () => openEditModal(button.dataset.field));
    });
    
    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    
    // Save and cancel buttons
    document.getElementById('save-edit-btn').addEventListener('click', saveEdit);
    document.getElementById('cancel-edit-btn').addEventListener('click', closeModal);
    
    // Account settings buttons
    document.getElementById('change-password-btn').addEventListener('click', () => {
        alert('Change password functionality would be implemented here.');
    });
    
    document.getElementById('notification-settings-btn').addEventListener('click', () => {
        alert('Notification settings would be implemented here.');
    });

    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        alert('Update profile functionality would be implemented here.');
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('edit-modal');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function() {
        // In a real app, perform actual logout
        localStorage.removeItem('fitTrackLoggedIn');
        window.location.href = 'index.html'; // Redirect to login page
    });
}

function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const userData = JSON.parse(localStorage.getItem('fitTrackUserProfile')) || {};
            userData.avatar = e.target.result;
            localStorage.setItem('fitTrackUserProfile', JSON.stringify(userData));
            
            document.getElementById('profile-image').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function openEditModal(field) {
    const modal = document.getElementById('edit-modal');
    const modalTitle = document.getElementById('modal-title');
    const inputContainer = document.getElementById('modal-input-container');
    
    // Clear previous content
    inputContainer.innerHTML = '';
    
    // Set current field being edited
    modal.dataset.editingField = field;
    
    // Get current value (without units)
    let currentValue;
    let fieldLabel;
    
    switch(field) {
        case 'age':
            currentValue = document.getElementById('profile-age').textContent;
            fieldLabel = 'Age';
            createNumberInput(inputContainer, currentValue, 'years', 1, 120);
            break;
            
        case 'gender':
            currentValue = document.getElementById('profile-gender').textContent;
            fieldLabel = 'Gender';
            createSelectInput(inputContainer, currentValue, ['Male', 'Female', 'Other']);
            break;
            
        case 'height':
            currentValue = parseInt(document.getElementById('profile-height').textContent);
            fieldLabel = 'Height';
            createNumberInput(inputContainer, currentValue, 'cm', 50, 250);
            break;
            
        case 'weight':
            currentValue = parseInt(document.getElementById('profile-weight').textContent);
            fieldLabel = 'Weight';
            createNumberInput(inputContainer, currentValue, 'kg', 20, 300);
            break;
            
        case 'targetWeight':
            currentValue = parseInt(document.getElementById('profile-target-weight').textContent);
            fieldLabel = 'Target Weight';
            createNumberInput(inputContainer, currentValue, 'kg', 20, 300);
            break;
            
        case 'stepGoal':
            currentValue = parseInt(document.getElementById('profile-step-goal').textContent.replace(/,/g, ''));
            fieldLabel = 'Daily Step Goal';
            createNumberInput(inputContainer, currentValue, 'steps', 1000, 50000, 500);
            break;
            
        case 'fitnessGoal':
            currentValue = document.getElementById('profile-fitness-goal').textContent;
            fieldLabel = 'Fitness Goal';
            createSelectInput(inputContainer, currentValue, [
                'Weight Loss', 
                'Muscle Gain', 
                'Improve Fitness', 
                'Maintain Weight', 
                'Training for Event'
            ]);
            break;
    }
    
    // Set modal title
    modalTitle.textContent = `Edit ${fieldLabel}`;
    
    // Show modal
    modal.style.display = 'flex';
}

function createNumberInput(container, value, unit, min, max, step = 1) {
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'modal-input';
    input.id = 'edit-field-input';
    input.value = value;
    input.min = min;
    input.max = max;
    input.step = step;
    
    const unitLabel = document.createElement('span');
    unitLabel.className = 'input-unit';
    unitLabel.textContent = unit;
    
    inputGroup.appendChild(input);
    container.appendChild(inputGroup);
}

function createSelectInput(container, value, options) {
    const select = document.createElement('select');
    select.className = 'modal-select';
    select.id = 'edit-field-input';
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        if (option === value) {
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
    
    container.appendChild(select);
}

function saveEdit() {
    const modal = document.getElementById('edit-modal');
    const field = modal.dataset.editingField;
    const input = document.getElementById('edit-field-input');
    const newValue = input.value;
    
    // Get stored user data
    const userData = JSON.parse(localStorage.getItem('fitTrackUserProfile')) || {};
    
    // Update user data based on the field
    switch(field) {
        case 'age':
            userData.age = parseInt(newValue);
            document.getElementById('profile-age').textContent = newValue;
            break;
            
        case 'gender':
            userData.gender = newValue;
            document.getElementById('profile-gender').textContent = newValue;
            break;
            
        case 'height':
            userData.height = parseInt(newValue);
            document.getElementById('profile-height').textContent = `${newValue} cm`;
            // Update BMI
            updateBMI(userData.height, userData.weight);
            break;
            
        case 'weight':
            userData.weight = parseInt(newValue);
            document.getElementById('profile-weight').textContent = `${newValue} kg`;
            // Update BMI
            updateBMI(userData.height, userData.weight);
            break;
            
        case 'targetWeight':
            userData.targetWeight = parseInt(newValue);
            document.getElementById('profile-target-weight').textContent = `${newValue} kg`;
            break;
            
        case 'stepGoal':
            userData.stepGoal = parseInt(newValue);
            document.getElementById('profile-step-goal').textContent = `${parseInt(newValue).toLocaleString()} steps`;
            break;
            
        case 'fitnessGoal':
            userData.fitnessGoal = newValue;
            document.getElementById('profile-fitness-goal').textContent = newValue;
            break;
    }
    
    // Save updated user data
    localStorage.setItem('fitTrackUserProfile', JSON.stringify(userData));
    
    // Close modal
    closeModal();
}

function updateBMI(height, weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    document.getElementById('profile-bmi').textContent = bmi.toFixed(1);
}

function closeModal() {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
}