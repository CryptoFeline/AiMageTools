function getImage() {
  const queryInput = document.getElementById("queryTb");
  const generateButton = document.getElementById("generateBtn");
  const loadingLabel = document.getElementById("loadingLb");
  const previewImage = document.getElementById("preview");
  const previewBox = document.getElementById('previewBox');

  queryInput.disabled = true;
  generateButton.disabled = true;
  loadingLabel.style.display = "block";
  previewBox.style.backgroundImage = "none";
  previewImage.style.display = "none";
        
  const query = queryInput.value;

  fetch('https://hilltophse.co.uk/api/getImage2.php?query=' + query)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (typeof data === 'object' && data !== null && data.image_url) {
              previewImage.src = data.image_url;
              loadingLabel.style.display = "none";
              previewImage.style.display = "block";
          } else {
              throw new Error('Image URL not found in response');
          }
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          document.getElementById('errorSection').style.display = 'block';
          document.getElementById('errorMessage').textContent = 'Error fetching image: ' + error.message;
      })
      .finally(() => {
          // Re-enable input and button
          loadingLabel.style.display = "none";
          queryInput.disabled = false;
          generateButton.disabled = false;
          queryInput.value = ""; // Clear the input field
      });
}

function displayGeneratedImage(imageUrl) {
    const previewBox = document.querySelector('.previewBox');
    const previewImage = document.getElementById('preview');

    // Set the image URL and make it visible
    previewImage.src = imageUrl;
    previewImage.style.visibility = 'visible';

    // Remove the background logo and the semi-transparent black background from the previewBox
    previewBox.style.backgroundImage = 'none';
}

function downloadImage() {
  const image = document.getElementById('preview');
  if (image && image.src) {
      const downloadLink = document.createElement('a');
      downloadLink.href = image.src;

      // Extract the image file name or use a default name
      const imageName = image.src.split('/').pop().split('?')[0];
      downloadLink.download = imageName;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  } else {
      alert("No image available for download.");
  }
}

document.getElementById('saveImage').addEventListener('click', downloadImage);
