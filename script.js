document.getElementById('calculate-btn').addEventListener('click', calculateAge);


function animateValue(id, start, end, duration) {
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const obj = document.getElementById(id);
    
    const timer = setInterval(() => {
        current += increment;
        obj.textContent = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}
function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const errorMessage = document.getElementById('error-message');

    if (!day || !month || !year) {
        errorMessage.textContent = 'All fields are required';
        return;
    }

    const inputDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    if (inputDate > currentDate) {
        errorMessage.textContent = 'Date must be in the past';
        return;
    }

    if (inputDate.getDate() !== day || inputDate.getMonth() !== month - 1 || inputDate.getFullYear() !== year) {
        errorMessage.textContent = 'Invalid date';
        return;
    }

    let ageYears = currentDate.getFullYear() - inputDate.getFullYear();
    let ageMonths = currentDate.getMonth() - inputDate.getMonth();
    let ageDays = currentDate.getDate() - inputDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById('years').textContent = ageYears;
    document.getElementById('months').textContent = ageMonths;
    document.getElementById('days').textContent = ageDays;

    errorMessage.textContent = '';

    if (!errorMessage.textContent) {
        animateValue('years', 0, ageYears, 2000);
        animateValue('months', 0, ageMonths, 2000);
        animateValue('days', 0, ageDays, 2000);
    }
}
