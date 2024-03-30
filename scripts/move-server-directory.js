const fs = require('fs');
const path = require('path');

// Function to copy the contents of a directory

const sourceDirectory = path.join('dist/green-heat/server/es-AR/index.server.html');
const targetDirectory = path.join('dist/green-heat/server/index.server.html');

// Check if the source file exists
if (fs.existsSync(sourceDirectory)) {
  // Get the absolute paths of the source and destination files
  const sourceAbsolutePath = path.resolve(sourceDirectory);
  const destinationAbsolutePath = path.resolve(targetDirectory);

  // Copy the source file to the destination
  fs.copyFile(sourceAbsolutePath, destinationAbsolutePath, (err) => {
    if (err) {
      console.error('Error copying the file:', err);
    } else {
      console.log('File copied successfully.');
    }
  });
} else {
  console.error('The source file does not exist.');
}