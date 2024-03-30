const fs = require('fs');
const path = require('path');

// Function to copy the contents of a directory

const sourceDirectory = path.join('dist/green-heat/server/es-AR/');
const targetDirectory = path.join('dist/green-heat/server/');

const sourceAbsolutePath = path.resolve(sourceDirectory);
const destinationAbsolutePath = path.resolve(targetDirectory);

function copyDirectoryContents(sourceDir, targetDir) {
  fs.readdir(sourceAbsolutePath, (err, files) => {
    if (err) {
      console.error(`Error reading source directory ${sourceAbsolutePath}:`, err);
      return;
    }

    // Create the target directory if it doesn't exist
    if (!fs.existsSync(destinationAbsolutePath)) {
      fs.mkdirSync(destinationAbsolutePath, { recursive: true });
    }

    // Copy each file from the source directory to the target directory
    files.forEach(file => {
      const sourceFile = path.join(sourceAbsolutePath, file);
      const targetFile = path.join(destinationAbsolutePath, file);

      // Check if the file is a directory
      if (fs.statSync(sourceFile).isDirectory()) {
        // Recursively copy the contents of the directory
        copyDirectoryContents(sourceFile, targetFile);
      } else {
        // Copy the file to the target directory
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`Copied ${sourceFile} to ${targetFile}`);
      }
    });
  });
}

copyDirectoryContents(sourceAbsolutePath, destinationAbsolutePath);