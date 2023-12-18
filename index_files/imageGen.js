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
            if (typeof data === 'object' && data !== null && data.image_url) {
                document.getElementById("preview").src = data.image_url;
                document.getElementById("loadingLb").style.display = "none";
                document.getElementById("preview").style.display = "block";
            } else {
                throw new Error('Image URL not found in response');
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            
            // Re-enable input and button
            document.getElementById("loadingLb").style.display = "none";
            document.getElementById("queryTb").disabled = false;
            document.getElementById("generateBtn").disabled = false;

            // Show error section with message
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
