function getImage() {
    document.getElementById("queryTb").disabled = true;
    document.getElementById("generateBtn").disabled = true;
    document.getElementById("loadingLb").style.display = "block";
    document.getElementById('previewBox').style.backgroundImage = "none";
    document.getElementById("preview").style.display = "none";
          
      const query = document.getElementById("queryTb").value;

    fetch('https://hilltophse.co.uk/api/getImage2.php?query=' + query)
    .then(function(response) {
      response.text().then(function(text) {
        document.getElementById("preview").src = text;
        document.getElementById("loadingLb").style.display = "none";
        document.getElementById("queryTb").disabled = false;
        document.getElementById("generateBtn").disabled = false;
        document.getElementById("preview").style.display = "block";
        });
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
