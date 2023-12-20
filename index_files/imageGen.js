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
          loadingLabel.style.display = "none";
          queryInput.disabled = false;
          generateButton.disabled = false;
      });
}

function displayGeneratedImage(imageUrl) {
    const previewBox = document.querySelector('.previewBox');
    const previewImage = document.getElementById('preview');

    previewImage.src = imageUrl;
    previewImage.style.visibility = 'visible';
    previewBox.style.backgroundImage = 'none';
}

document.getElementById('saveImage').addEventListener('click', downloadImage);
