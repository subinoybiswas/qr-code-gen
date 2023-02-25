const form = document.querySelector('form');

const dictionary = {
  Key1: 'Value1',
  Key2: 'Value2',
  Key3: 'Value3',
  Key4: 'Value4'
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get all the checkboxes that are checked
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  // If no checkboxes are checked, display an error message
  if (checkboxes.length === 0) {
    console.log('Please select at least one key.');
    return;
  }

  // Create an object to hold the selected key-value pairs
  const selectedPairs = {};

  // Loop through the checked checkboxes and add their key-value pairs to the object
  checkboxes.forEach((checkbox) => {
    const key = checkbox.value;
    const value = dictionary[key];
    selectedPairs[key] = value;
  });

  // Log the selected key-value pairs to the console
  console.log(selectedPairs);

  // Generate a QR code for each selected key-value pair and display it on the screen
  const qrCodeContainer = document.querySelector('#qr-code-container');

  // Clear any existing QR codes
  qrCodeContainer.innerHTML = '';

  // Generate and append new QR codes
  Object.keys(selectedPairs).forEach((key) => {
    const value = selectedPairs[key];
    const qrCodeElement = document.createElement('canvas');
    try {
      new QRCode(qrCodeElement, {
        text: `${key}: ${value}`,
        width: 128,
        height: 128,
      });
      qrCodeContainer.appendChild(qrCodeElement);
    } catch (error) {
      console.log(`Failed to generate QR code for ${key}: ${value}`);
    }
  });
});
