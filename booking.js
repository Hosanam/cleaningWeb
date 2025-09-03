// Step navigation
function goToStep(step) {
    const steps = ['step1', 'step2', 'step4', 'step5'];
    steps.forEach(s => document.getElementById(s).style.display = 'none');
    document.getElementById('step' + step).style.display = 'block';
    updateSummary();
  }
  
  // Update summary dynamically
  function updateSummary() {
    const cleaners = document.getElementById('cleaners').value || '-';
    const hours = document.getElementById('hours').value || '-';
    const frequency = document.getElementById('frequency').value || '-';
    const materials = document.getElementById('materials').value || '-';
    const date = document.getElementById('date')?.value || '-';
    const time = document.getElementById('time')?.value || '-';
  
    document.getElementById('summaryCleaners').textContent = cleaners;
    document.getElementById('summaryHours').textContent = hours;
    document.getElementById('summaryFrequency').textContent = frequency;
    document.getElementById('summaryMaterials').textContent = materials;
    document.getElementById('summaryDateTime').textContent = date + ' ' + time;
  
    // Example charges
    let serviceCharge = cleaners !== '-' && hours !== '-' ? cleaners*hours*50 : 0;
    let vat = serviceCharge*0.05;
    let total = serviceCharge + vat;
  
    document.getElementById('serviceCharge').textContent = `AED ${serviceCharge.toFixed(2)}`;
    document.getElementById('subTotal').textContent = `AED ${serviceCharge.toFixed(2)}`;
    document.getElementById('vat').textContent = `AED ${vat.toFixed(2)}`;
    document.getElementById('totalPay').textContent = `AED ${total.toFixed(2)}`;
  }
  
  // Add listeners to update summary live
  ['cleaners','hours','frequency','materials','date','time'].forEach(id=>{
    document.getElementById(id)?.addEventListener('change', updateSummary);
  });
  
  // Initialize
  goToStep(1);
  