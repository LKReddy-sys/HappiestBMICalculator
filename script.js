document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultDiv = document.getElementById('result');
    const unitRadios = document.querySelectorAll('input[name="unit"]');

    const weightUnitSpan = document.getElementById('weight-unit');
    const heightUnitSpan = document.getElementById('height-unit');

    // Update placeholders and units when system changes
    const updateUnits = () => {
        const selectedUnit = document.querySelector('input[name="unit"]:checked').value;
        if (selectedUnit === 'metric') {
            weightUnitSpan.textContent = 'kg';
            heightUnitSpan.textContent = 'cm';
            weightInput.placeholder = 'Enter weight in kg';
            heightInput.placeholder = 'Enter height in cm';
        } else {
            weightUnitSpan.textContent = 'lbs';
            heightUnitSpan.textContent = 'in';
            weightInput.placeholder = 'Enter weight in lbs';
            heightInput.placeholder = 'Enter height in inches';
        }
    };

    unitRadios.forEach(radio => radio.addEventListener('change', updateUnits));

    calculateBtn.addEventListener('click', () => {
        const unit = document.querySelector('input[name="unit"]:checked').value;
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);

        // Input validation
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            displayResult('Please enter valid positive numbers for weight and height.', 'error');
            return;
        }

        let bmi;
        // BMI Calculation
        if (unit === 'metric') {
            // Formula: weight (kg) / [height (m)]^2
            const heightInMeters = height / 100;
            bmi = weight / (heightInMeters * heightInMeters);
        } else { // Imperial
            // Formula: 703 x weight (lbs) / [height (in)]^2
            bmi = 703 * (weight / (height * height));
        }

        const { category, className } = getBmiCategory(bmi);
        const resultMessage = `Your BMI is <strong>${bmi.toFixed(2)}</strong>.<br>This is considered <strong>${category}</strong>.`;
        
        displayResult(resultMessage, className);
    });

    const getBmiCategory = (bmi) => {
        if (bmi < 18.5) {
            return { category: 'Underweight', className: 'underweight' };
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            return { category: 'Normal weight', className: 'normal' };
        } else if (bmi >= 25 && bmi <= 29.9) {
            return { category: 'Overweight', className: 'overweight' };
        } else {
            return { category: 'Obese', className: 'obese' };
        }
    };

    const displayResult = (message, className) => {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = message;
        // Reset classes and add the new one
        resultDiv.className = 'result'; 
        if (className) {
            resultDiv.classList.add(className);
        }
    };

    // Initialize units on page load
    updateUnits();
});