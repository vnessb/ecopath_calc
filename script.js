// script.js
let currentQuestionIndex = 0;
const questions = document.querySelectorAll('.question');
const nextButton = document.querySelector('#nextButton');

function nextQuestion() {
    // Store the current question's answer
    currentQuestionIndex++;

    // If the last question is reached, calculate the result
    if (currentQuestionIndex >= questions.length) {
        calculateFootprint();
        return;
    }

    // Hide current question and show next
    questions[currentQuestionIndex - 1].classList.remove('active');
    questions[currentQuestionIndex].classList.add('active');
}

function calculateFootprint() {
    let totalFootprint = 0;

    // Energy Use
    const appliances = document.getElementById('appliances').value;
    totalFootprint += appliances ? parseInt(appliances) : 0;

    // Renewable Energy
    const renewable = document.querySelector('input[name="renewable"]:checked');
    if (renewable) {
        totalFootprint += renewable.value === "yes" ? -500 : 0; // Reduction if renewable
    }

    // Transportation
    const transport = document.getElementById('transport').value;
    totalFootprint += transport ? parseInt(transport) : 0;

    // Diet
    const diet = document.getElementById('diet').value;
    totalFootprint += diet ? parseInt(diet) : 0;

    // Consumption
    const shopping = document.getElementById('shopping').value;
    totalFootprint += shopping ? parseInt(shopping) : 0;

    const shoppingFrequency = document.getElementById('shoppingFrequency').value;
    totalFootprint += shoppingFrequency ? parseFloat(shoppingFrequency) * 100 : 0;

    // Water Usage
    const shower = document.getElementById('shower').value;
    totalFootprint += shower ? parseInt(shower) : 0;

    const waterTemp = document.querySelector('input[name="waterTemp"]:checked');
    if (waterTemp) {
        totalFootprint += waterTemp.value === "yes" ? 200 : 0;
    }

    // Display the result
    displayResult(totalFootprint);
}

function displayResult(totalFootprint) {
    // Show the result in the result div
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Your ecological footprint is approximately ${totalFootprint} kg CO₂ per year.`;
    resultDiv.style.display = "block"; // Show result when calculation is done

    // Call assessFootprint function to assess and give feedback
    const assessment = assessFootprint(totalFootprint);
    const assessmentDiv = document.getElementById('assessment');
    assessmentDiv.innerHTML = assessment;
    assessmentDiv.style.display = "block";
}

function assessFootprint(totalFootprint) {
    let assessment, feedback;

    if (totalFootprint > 5000) {
        assessment = "High";
        feedback = "Your ecological footprint is high, indicating a significant impact on the environment. Here are some suggestions to reduce it:<br>" +
            "- Consider reducing car travel or switching to a more sustainable mode of transportation.<br>" +
            "- Try to buy second-hand or thrift more often to lower clothing consumption.<br>" +
            "- Reduce the number of plugged-in appliances or switch to renewable energy if possible.<br>" +
            "- Shorten shower times and try using cold water occasionally to reduce water usage.";
    } else if (totalFootprint >= 2500 && totalFootprint <= 5000) {
        assessment = "Average";
        feedback = "Your ecological footprint is average, meaning you're doing some things well but could still improve. Consider making a few adjustments to lower your impact.";
    } else {
        assessment = "Low";
        feedback = "Great job! Your ecological footprint is low. Keep up the sustainable practices!";
    }

    return `${assessment} footprint.<br><br>${feedback}`;
}

// Handle page-specific functionality like navigation between tabs
document.addEventListener('DOMContentLoaded', () => {
    // Example: Handling "Go to Calculator" button click on home page
    const calcBtn = document.getElementById('goToCalculator');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            window.location.href = 'eco_calculator.html'; // Redirect to the eco_calculator page
        });
    }

    // Add event listener to "Next" button to show next question
    if (nextButton) {
        nextButton.addEventListener('click', nextQuestion);
    }
});

// Tab functionality
function openTab(event, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tabContent => {
        tabContent.classList.remove('active');
    });

    // Remove active class from all tab links
    const tabLinks = document.querySelectorAll('.nav-tabs a');
    tabLinks.forEach(tabLink => {
        tabLink.classList.remove('active-tab');
    });

    // Show the clicked tab content and add active class to the clicked tab
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active-tab');
}
// Array of fun facts
const funFacts = [
    "Did you know? Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
    "Switching to a plant-based diet can reduce your carbon footprint by up to 50%.",
    "The transportation sector is responsible for about 25% of global CO2 emissions.",
    "Reducing food waste is one of the most effective ways to combat climate change.",
    "One tree can absorb about 48 pounds of carbon dioxide per year."
];

// Show a random fun fact
document.getElementById('fun-fact-btn').addEventListener('click', function() {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    document.getElementById('fun-fact-text').textContent = randomFact;
    document.getElementById('fun-fact-popup').style.display = 'block';
});

// Close the pop-up
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('fun-fact-popup').style.display = 'none';
});