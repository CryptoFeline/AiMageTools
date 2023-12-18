function getImage() {
    document.getElementById("queryTb").disabled = true;
    document.getElementById("generateBtn").disabled = true;
    document.getElementById("loadingLb").style.display = "block";
    document.getElementById('previewBox').style.backgroundImage = "none";
    document.getElementById("preview").style.display = "none";
          
      const query = document.getElementById("queryTb").value;

      fetch('https://hilltophse.co.uk/api/getImage2.php?query=' + query)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          if (data.image_url) {
              document.getElementById("preview").src = data.image_url;
              document.getElementById("loadingLb").style.display = "none";
              document.getElementById("preview").style.display = "block";
          } else {
              throw new Error('Image URL not found in response');
          }
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
          // Handle the error, show an error message to the user
          // Re-enable the inputs
          document.getElementById("loadingLb").style.display = "none";
          document.getElementById("queryTb").disabled = false;
          document.getElementById("generateBtn").disabled = false;
          
          // Show an error section or message
          document.getElementById('errorSection').style.display = 'block';
          document.getElementById('errorMessage').textContent = 'Error fetching image: ' + error.message;
      });
    };

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
      fetch(image.src)
          .then(response => response.blob())
          .then(blob => {
              const blobUrl = window.URL.createObjectURL(blob);
              const downloadLink = document.createElement('a');
              downloadLink.href = blobUrl;
              
              const imageName = image.src.split('/').pop().split('?')[0] || 'downloadedImage.png';
              downloadLink.download = imageName;
              
              document.body.appendChild(downloadLink);
              downloadLink.click();
              document.body.removeChild(downloadLink);
              window.URL.revokeObjectURL(blobUrl); // Clean up the URL object
          })
          .catch(error => {
              console.error('Error downloading the image:', error);
              alert("Failed to download image.");
          });
  } else {
      alert("No image available for download.");
  }
}

document.getElementById('saveImage').addEventListener('click', downloadImage);
