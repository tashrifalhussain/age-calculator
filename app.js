// Select DOM elements
const calculateAgeBtn = document.getElementById('calculateAgeBtn');
const birthdateInput = document.getElementById('birthdate');
const ageOutput = document.getElementById('ageOutput');
const birthdayCountdown = document.getElementById('birthdayCountdown');
const resultDiv = document.getElementById('result');

// Function to calculate age in years, months, and days
function calculateAge(birthdate) {
    const currentDate = new Date();
    let ageYears = currentDate.getFullYear() - birthdate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthdate.getMonth();
    let ageDays = currentDate.getDate() - birthdate.getDate();

    // Adjust months and days if current date is before the birthdate
    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    return { ageYears, ageMonths, ageDays };
}

// Function to calculate the countdown to the next birthday
function getBirthdayCountdown(birthdate) {
    const currentDate = new Date();
    let nextBirthday = new Date(birthdate);
    nextBirthday.setFullYear(currentDate.getFullYear());

    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1); // If birthday has passed, calculate for next year
    }

    const timeDifference = nextBirthday - currentDate;
    const daysUntilBirthday = Math.ceil(timeDifference / (1000 * 3600 * 24));

    return daysUntilBirthday;
}

// Event listener for calculating age and birthday countdown
calculateAgeBtn.addEventListener('click', () => {
    const birthdate = new Date(birthdateInput.value);
    if (birthdate && !isNaN(birthdate)) {
        const { ageYears, ageMonths, ageDays } = calculateAge(birthdate);

        // Get birthday countdown
        const daysUntilBirthday = getBirthdayCountdown(birthdate);

        // Determine age category
        let category = "";
        if (ageYears < 13) {
            category = "You are a child.";
        } else if (ageYears >= 13 && ageYears <= 19) {
            category = "You are a teenager.";
        } else if (ageYears >= 20 && ageYears <= 59) {
            category = "You are an adult.";
        } else {
            category = "You are a senior.";
        }

        ageOutput.textContent = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old. ${category}`;
        birthdayCountdown.textContent = `Your next birthday is in ${daysUntilBirthday} day(s).`;
        resultDiv.style.display = "block"; // Show result
    } else {
        ageOutput.textContent = "Please enter a valid birthdate.";
        resultDiv.style.display = "block"; // Show result
    }
});
