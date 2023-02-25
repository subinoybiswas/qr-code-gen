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

  // Generate a QR code for the selected key-value pairs and display it on the screen
  const qrCodeContainer = document.querySelector('#qr-code-container');
  qrCodeContainer.innerHTML = '';

  Object.keys(selectedPairs).forEach((key) => {
    const value = selectedPairs[key];
    const qrCodeElement = document.createElement('canvas');
    new QRCode(qrCodeElement, {
      text: `${key}: ${value}`,
      width: 128,
      height: 128,
    });
    qrCodeContainer.appendChild(qrCodeElement);
  });
});
