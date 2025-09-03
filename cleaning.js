// =============================
// Navigation toggle
// =============================
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('show');
});

window.addEventListener('scroll', () => {
  if (menu.classList.contains('show')) menu.classList.remove('show');
});

// =============================
// Update progress bar
// =============================
function updateProgressBar(step) {
  const steps = document.querySelectorAll('.progress-step');
  steps.forEach((s, index) => {
    if (index < step) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });
}

// =============================
// Navigate to specific step
// =============================
function goToStep(stepNumber) {
  const allSteps = [1, 2, 3, 4]; // Step 4 is payment
  allSteps.forEach(num => {
    const el = document.getElementById('step' + num);
    if (el) el.style.display = 'none';
  });

  const stepEl = document.getElementById('step' + stepNumber);
  if (stepEl) stepEl.style.display = 'block';

  updateProgressBar(stepNumber);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =============================
// Step 1 Validation
// =============================
function validateStep1() {
  let isValid = true;
  const fields = ['cleaners', 'hours', 'frequency', 'materials'];

  fields.forEach(field => {
    const element = document.getElementById(field);
    const formGroup = element.parentElement;

    if (!element.value) {
      formGroup.classList.add('error');
      isValid = false;
    } else {
      formGroup.classList.remove('error');
    }
  });

  if (isValid) goToStep(2);
}

// =============================
// Step 2 Validation
// =============================
function validateStep2() {
  let isValid = true;
  const date = document.getElementById('date');
  const time = document.getElementById('time');

  if (!date.value) {
    date.parentElement.classList.add('error');
    isValid = false;
  } else {
    date.parentElement.classList.remove('error');
  }

  if (!time.value) {
    time.parentElement.classList.add('error');
    isValid = false;
  } else {
    time.parentElement.classList.remove('error');
  }

  if (isValid) goToStep(3); // Show summary step
}

// =============================
// Generate booking summary
// =============================
function generateSummary() {
  const cleaners = parseInt(document.getElementById('cleaners').value) || 0;
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const frequency = document.getElementById('frequency').value || '';
  const materials = document.getElementById('materials').value || '';
  const date = document.getElementById('date').value || '';
  const time = document.getElementById('time').value || '';

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : '';

  let basePrice = materials === "Yes" ? 97 : 81;
  const extraRate = materials === "Yes" ? 35 : 27;
  const vatRate = 0.05;
  let serviceCharge = basePrice;

  if (cleaners > 1) serviceCharge += (cleaners - 1) * extraRate;
  if (hours > 2) serviceCharge += (hours - 2) * extraRate;

  const subTotal = serviceCharge;
  const vat = subTotal * vatRate;
  const totalPay = subTotal + vat;

  // Update summary fields
  document.getElementById('summaryCleaners').textContent = cleaners ? cleaners + (cleaners > 1 ? " Cleaners" : " Cleaner") : '';
  document.getElementById('summaryHours').textContent = hours ? hours + (hours > 1 ? " Hours" : " Hour") : '';
  document.getElementById('summaryFrequency').textContent = frequency;
  document.getElementById('summaryMaterials').textContent = materials;
  document.getElementById('summaryDateTime').textContent = formattedDate && time ? formattedDate + " at " + time : '';
  document.getElementById('serviceCharge').textContent = serviceCharge ? "AED " + serviceCharge.toFixed(2) : '';
  document.getElementById('subTotal').textContent = subTotal ? "AED " + subTotal.toFixed(2) : '';
  document.getElementById('vat').textContent = vat ? "AED " + vat.toFixed(2) : '';
  document.getElementById('totalPay').textContent = totalPay ? "AED " + totalPay.toFixed(2) : '';

  // Store values for payment section
  window.bookingDetails = { serviceCharge, vat, totalPay };
}

// =============================
// Real-time summary update
// =============================
function initRealTimeSummary() {
  const fields = ['cleaners', 'hours', 'frequency', 'materials', 'date', 'time'];
  fields.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.addEventListener('change', generateSummary);
  });
}

// Initialize real-time summary
initRealTimeSummary();

// =============================
// Step 3 Validation (Customer Details)
// =============================
function validateStep3() {
  let isValid = true;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const confirmEmail = document.getElementById('confirmEmail');
  const phone = document.getElementById('phone');
  const terms = document.getElementById('terms');

  if (!name.value) { name.parentElement.classList.add('error'); isValid = false; } else { name.parentElement.classList.remove('error'); }
  if (!email.value || !isValidEmail(email.value)) { email.parentElement.classList.add('error'); isValid = false; } else { email.parentElement.classList.remove('error'); }
  if (!confirmEmail.value || confirmEmail.value !== email.value) { confirmEmail.parentElement.classList.add('error'); isValid = false; } else { confirmEmail.parentElement.classList.remove('error'); }
  if (!phone.value) { phone.parentElement.classList.add('error'); isValid = false; } else { phone.parentElement.classList.remove('error'); }
  if (!terms.checked) { terms.parentElement.classList.add('error'); isValid = false; } else { terms.parentElement.classList.remove('error'); }

  if (isValid) goToStep(4);
}

// =============================
// Email validation helper
// =============================
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// // =============================
// // Payment form functionality
// // =============================
// document.getElementById('paymentForm').addEventListener('submit', function(e) {
//   e.preventDefault();
//   let isValid = true;
//   const cardNumber = document.getElementById('card-number');
//   const expiryMonth = document.getElementById('expiry-month');
//   const expiryYear = document.getElementById('expiry-year');
//   const cvv = document.getElementById('cvv');
//   const cardholder = document.getElementById('cardholder');

//   if (!cardNumber.value || cardNumber.value.replace(/\s/g,'').length !== 16) { cardNumber.parentElement.classList.add('error'); isValid=false; } else { cardNumber.parentElement.classList.remove('error'); }
//   if (!expiryMonth.value) { expiryMonth.parentElement.classList.add('error'); isValid=false; } else { expiryMonth.parentElement.classList.remove('error'); }
//   if (!expiryYear.value) { expiryYear.parentElement.classList.add('error'); isValid=false; } else { expiryYear.parentElement.classList.remove('error'); }
//   if (!cvv.value || cvv.value.length!==3) { cvv.parentElement.classList.add('error'); isValid=false; } else { cvv.parentElement.classList.remove('error'); }
//   if (!cardholder.value) { cardholder.parentElement.classList.add('error'); isValid=false; } else { cardholder.parentElement.classList.remove('error'); }

//   if (isValid) alert('Payment processed successfully! Your cleaning service has been booked.');
// });

// // =============================
// // Input formatting
// // =============================
// document.getElementById('card-number').addEventListener('input', e => {
//   let value = e.target.value.replace(/\D/g,'');
//   if(value.length>0) value = value.match(/.{1,4}/g).join(' ');
//   e.target.value = value;
// });

// document.getElementById('cvv').addEventListener('input', e => {
//   e.target.value = e.target.value.replace(/\D/g,'').substring(0,3);
// });

// // =============================
// // Date restriction
// // =============================
// const dateInput = document.getElementById('date');
// const today = new Date().toISOString().split('T')[0];
// dateInput.setAttribute('min', today);

// // =============================
// // Initialize progress bar
// // =============================
// updateProgressBar(1);

// // =============================
// // Toggle payment method accordion
// // =============================
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('.payment-option').forEach(option => {
//     const header = option.querySelector('.option-header');
//     const radio = header.querySelector('input[type="radio"]');

//     const toggleOption = () => {
//       const isSelected = option.classList.contains('selected');

//       document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));

//       if (!isSelected) {
//         option.classList.add('selected');
//         radio.checked = true;
//       }
//     };

//     header.addEventListener('click', toggleOption);
//     radio.addEventListener('change', toggleOption);
//   });

//   // Set default selected
//   const defaultOption = document.querySelector('.payment-option input[type="radio"]:checked');
//   if (defaultOption) {
//     defaultOption.closest('.payment-option').classList.add('selected');
//   }
// });








// // Card form validation
// document.getElementById('cardForm').addEventListener('submit', e => {
//   e.preventDefault();
//   let valid = true;
//   const cardNumber = document.getElementById('card-number');
//   const expiryMonth = document.getElementById('expiry-month');
//   const expiryYear = document.getElementById('expiry-year');
//   const cvv = document.getElementById('cvv');
//   const cardholder = document.getElementById('cardholder');

//   // Reset errors
//   [cardNumber, expiryMonth, expiryYear, cvv, cardholder].forEach(el => el.parentElement.classList.remove('error'));

//   // Validate
//   if (!cardNumber.value || cardNumber.value.replace(/\s/g,'').length !== 16) {
//     cardNumber.parentElement.classList.add('error'); valid=false;
//   }
//   if (!expiryMonth.value) { expiryMonth.parentElement.classList.add('error'); valid=false; }
//   if (!expiryYear.value) { expiryYear.parentElement.classList.add('error'); valid=false; }
//   if (!cvv.value || cvv.value.length !== 3) { cvv.parentElement.classList.add('error'); valid=false; }
//   if (!cardholder.value) { cardholder.parentElement.classList.add('error'); valid=false; }

//   if (valid) {
//     alert('Payment processed successfully! Your cleaning service has been booked.');
//   }
// });

// // Card number formatting
// document.getElementById('card-number').addEventListener('input', e => {
//   let value = e.target.value.replace(/\D/g,'');
//   if(value.length>0) value = value.match(/.{1,4}/g).join(' ');
//   e.target.value = value;
// });

// // CVV formatting
// document.getElementById('cvv').addEventListener('input', e => {
//   e.target.value = e.target.value.replace(/\D/g,'').substring(0,3);
// });
