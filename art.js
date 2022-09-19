// Environment: Node.js
// a standalone function that takes an image url, fetches it, then turns into ascii art in the console.
function asciiArt(url) {
  // Write your code here
  const Jimp = require("jimp");
  let text = "";
  Jimp.read(url, (err, image) => {
    if (err) throw err;

    image
      .resize(120, image.bitmap.height / (image.bitmap.width / 120))
      .greyscale()
      .scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        let brightness = Jimp.intToRGBA(image.bitmap.data[idx]).a;
        let ascii = " .:-=+*#%@";
        let index = Math.floor((brightness * 10) / 255);
        let char = ascii[index];
        text += char;
        process.stdout.write(char);
        if (x === image.bitmap.width - 1) {
          process.stdout.write("\n");
        }
      });
  });
}

// Environment: Node.js
// Fetches a video file and renders each frame into console with 6 FPS.
async function asciiAnimation(url) {
  // Write your code here
  const Jimp = require("jimp");
  const fs = require("fs");
  const path = require("path");
  const { createFFmpeg, fetchFile } = require("@ffmpeg/ffmpeg");

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  const video = fs.readFileSync(url);
  const videoName = "video.mp4";
  fs.writeFileSync(videoName, video);
  ffmpeg.FS("writeFile", videoName, fetchFile(videoName));
  ffmpeg.run("-i", videoName, "-vf", "fps=6", "out%d.png");
  ffmpeg.on("progress", (progress) => {
    console.log("Processing: " + progress.percent + "% done");
  });
  ffmpeg.on("end", async () => {
    console.log("Processing finished !");
    let text = "";
    for (let i = 1; i <= 100; i++) {
      let img = await Jimp.read(`out${i}.png`);
      img
        .resize(120, img.bitmap.height / (img.bitmap.width / 120))
        .greyscale()
        .scan(0, 0, img.bitmap.width, img.bitmap.height, function (x, y, idx) {
          let brightness = Jimp.intToRGBA(img.bitmap.data[idx]).a;
          let ascii = " .:-=+*#%@";
          let index = Math.floor((brightness * 10) / 255);
          let char = ascii[index];
          text += char;
          process.stdout.write(char);
          if (x === img.bitmap.width - 1) {
            process.stdout.write("\n");
          }
        });
    }
  });
}

// function that takes user input from the console as a string and then calls the asciiArt function with the input as the url.
function asciiArtFromInput() {
  // Write your code here
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.question("Enter a url: ", (url) => {
    asciiArt(url);
  });
}

asciiArtFromInput();
