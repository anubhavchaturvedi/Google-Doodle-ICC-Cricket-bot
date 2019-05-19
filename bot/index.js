function gameInit() {
  console.log("Starting BOT code");

  this.game = document.getElementById("gameCanvas");
  this.gameCanvasCtx = game.getContext("2d", { willReadFrequently: true });

  this.outputCanvas = document.getElementById("pitchCanvas");
  this.outputCanvasCtx = outputCanvas.getContext("2d", {
    willReadFrequently: false
  });

  this.manipulatedPitchCanvas = document.getElementById(
    "manipulatedPitchCanvas"
  );
  this.manipulatedPitchCanvasCtx = manipulatedPitchCanvas.getContext("2d", {
    willReadFrequently: false
  });

  this.scoreCanvas = document.getElementById("scoreCanvas");
  this.scoreCanvasCtx = scoreCanvas.getContext("2d", {
    willReadFrequently: false
  });

  this.controlsCanvas = document.getElementById("controlsCanvas");
  this.controlsCanvasCtx = controlsCanvas.getContext("2d", {
    willReadFrequently: false
  });

  this.pitchROI = () => {
    w = 250;
    h = 350;
    return this.gameCanvasCtx.getImageData(650, 300, w, h);
  };

  this.scoreROI = () => {
    return this.gameCanvasCtx.getImageData(725, 60, 90, 60);
  };

  this.controlsROI = () => {
    w = 400;
    h = 100;
    return this.gameCanvasCtx.getImageData(570, 740, w, h);
  };

  this.continuousCapture = () => {
    function captureFrame() {
      this.captureSingleFrame();
      setTimeout(captureFrame, 5);
    }
    setTimeout(captureFrame, 5);
  };

  this.captureSingleFrame = () => {
    pitchData = this.pitchROI();
    this.outputCanvasCtx.putImageData(pitchData, 0, 0);

    transformationResult = this.extractBallInfo(pitchData);
    // console.log("ball pixel : " + transformationResult.ballPosition);
    this.hitBall(transformationResult.ballPosition);
    this.manipulatedPitchCanvasCtx.putImageData(transformationResult.frame, 0, 0);

    this.scoreCanvasCtx.putImageData(this.scoreROI(), 0, 0);
    this.controlsCanvasCtx.putImageData(this.controlsROI(), 0, 0);
  };

  this.extractBallInfo = (frame) => {
    var buf = new ArrayBuffer(frame.data.length);
    var buf8 = new Uint8ClampedArray(buf);
    var ballPosition = 0;
    for( i=0; i< frame.data.length; i+=4){
        if((frame.data[i] == 187 && frame.data[i+1] == 34 && frame.data[i+2] == 34)) {
            buf8[i] = frame.data[i];
            buf8[i+1] = frame.data[i+1];
            buf8[i+2] = frame.data[i+2];
            buf8[i+3] = frame.data[i+3];

            ballPosition = i > ballPosition ? i : ballPosition;
        }
    }

    frame.data.set(buf8);
    return {frame, ballPosition};
  };

  this.dumpValues = x => {
    pitchData = this.pitchROI();
    transformedPitchData = this.transformPitchImage(pitchData);
    return transformedPitchData;
  };

  this.hitBall = (ballPosition)=>{
    if (ballPosition > 262000){
        document.dispatchEvent(new KeyboardEvent('keydown',{'keyCode':32,'which':32}));
        document.dispatchEvent(new KeyboardEvent('keyup',{'keyCode':32,'which':32}));
    }
  }

  return this;
}

game = gameInit();
game.continuousCapture();

function colorPicker() {
  var canvas = document.getElementById("gameCanvas");
  var ctx = canvas.getContext("2d");
  var color = document.getElementById("color");
  function pick(event) {
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x*2, y*2, 1, 1);
    var data = pixel.data;
    var rgba =
      "rgba(" +
      data[0] +
      ", " +
      data[1] +
      ", " +
      data[2] +
      ", " +
      data[3] / 255 +
      ")";
    color.style.background = rgba;
    color.textContent = rgba + + " x:" + x + ", y:" + y;
  }
  canvas.addEventListener("mousemove", pick);
}
