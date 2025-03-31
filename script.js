const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

// Load Background Image
const background = new Image();
background.src = "background.jpg"; // Ensure this file is uploaded

// Load Person Image (with transparency)
const person = new Image();
person.src = "person.png"; // Ensure this is a PNG with transparency

// Function to load custom font
function loadFont(callback) {
    const customFont = new FontFace("CustomFont", "url('custom-font.ttf')");
    customFont.load().then(function(loadedFont) {
        document.fonts.add(loadedFont);
        callback(); // Call the drawing function after the font loads
    }).catch(error => console.error("Font loading error:", error));
}

// Draw the image once both images are loaded
background.onload = person.onload = function() {
    loadFont(drawImage);
};

function drawImage(name = "YOUR NAME") {
    canvas.width = 1920;
    canvas.height = 1080;

    // 1. Draw Background
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // 2. Set up text properties
    ctx.font = "110px CustomFont"; // Use custom font
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    // 3. Position text (centered with 0.5cm gap from top)
    const gapInPixels = (2.5 / 2.54) * 96;  // Convert 0.5 cm to pixels (≈19px)
    const textX = canvas.width / 2;
    const textY = gapInPixels + 110; // Add font height

    // 4. Draw Text with Outline for Visibility
    ctx.strokeText(name, textX, textY);
    ctx.fillText(name, textX, textY);

    // 5. Draw Person Image (on Top of the Text)
    ctx.drawImage(person, 0, 0, person.width, person.height);

    document.getElementById("downloadBtn").style.display = "block"; // Show Download Button
}

function generateImage() {
    let name = document.getElementById("nameInput").value.trim();
    if (name === "") {
        alert("Please enter a name.");
        return;
    }
    drawImage(name);
}

// Show Popup Before Download
function showPopup() {
    document.getElementById("popup").style.display = "block";
}

// Close Popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Download Image
function downloadImage() {
    document.getElementById("popup").style.display = "none"; // Close popup

    const link = document.createElement("a");
    link.download = "custom-image.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
}