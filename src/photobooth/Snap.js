import React, { Component } from 'react';
import './Snap.css';
import Strip from './Strip';
import { connect } from 'react-redux';
import SnapAudio from './SnapAudio';
import BoomerangAudio from './BoomerangAudio';
import ProgressCircle from './ProgressCircle';
import WhiteFlash from './WhiteFlash';
import { setCanvasFrame } from '../actions';
import { fabric } from 'fabric';

class Snap extends Component { //class component for readability
  constructor(props) {
    super(props);

    this.width = 300;
    this.height = 300;
    this.videoRef = React.createRef();
    this.canvasRef = React.createRef();
    this.frameImageRef = React.createRef();
    this.stickerCanvasRef = React.createRef();
    this.resultImage = React.createRef();

    this.state = { //initial state
      streaming: false,
      counterSeconds: 3,
      counterStarted: false,
      strip: "experiences",
      snapSound: false,
      boomMusic: false,
      gifImages: [],
      reultImageData: null,
      next: false,
      progress: 0,
      modal: false
    };
  }

  componentDidMount() {
    const contraints = {
      video: { width: this.width, height: this.height },
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(contraints)
      .then((stream) => {
        this.videoRef.current.srcObject = stream;
        this.videoRef.current.play();
      })
      .catch((error) => {
        console.log(error);
      });
      this.stickerCanvas = new fabric.Canvas(`${this.stickerCanvasRef.current.id}`);
  }

  onVideoCanPlay = () => {
    if (!this.state.streaming) {
      this.setState({ streaming: true });
    }
  };

  counter = () => { // counts 3 seconds before running takephoto, boomerang, gif
    if (!this.state.counterStarted) {
      this.setState({ counterStarted: true });
      const id = setInterval(() => {
        this.setState({ counterSeconds: this.state.counterSeconds - 1 });
        if (!this.state.counterSeconds) {
          clearInterval(id);
          if (this.state.strip === "photo") {
            this.onTakePhotoClick();
          } else if (this.state.strip === "boomerang") {
            this.onBoomerangClick();
          } else {
            this.onTakeGifClick();
          }
        }
      }, 1000);
    }
  }

  onSaveCanvasImage = () => { //draw frame and video on the main canvas
    const context = this.canvasRef.current.getContext("2d");
    context.drawImage(this.videoRef.current, 0, 0, this.width, this.height);
    context.drawImage(this.frameImageRef.current, 0, 0, this.width, this.height);
  };

  onTakePhotoClick = () => { // take a photo
    this.playCaptureSound(); 
    this.onSaveCanvasImage();
    this.setStrip("likeButtons");
    this.setState({
      resultImageData: this.canvasRef.current.toDataURL(),
    });
  };

  addSticker = imageUrl => { // add sticker to the photo by using fabric canvas
    const stickerImage = new Image();
    stickerImage.src = imageUrl;
    const fabricStickerImg = new fabric.Image(stickerImage);
    fabricStickerImg.scaleToWidth(65);
    fabricStickerImg.scaleToHeight(65);
    this.stickerCanvas.add(fabricStickerImg);
  };

  playCaptureSound = () => { // change sound to true, then false after 500ms
    const changeState = () => this.setState({ snapSound: false })
    const setSoundFalse = () => {
      setTimeout( changeState , 500) 
    }
    this.setState( { snapSound: true }, setSoundFalse );
  }

  onBoomerangClick = () => { //record boomerang
    this.playCaptureSound()
    const gif = new window.GIF({
      workers: 4,
      width: 300,
      height: 300,
    });
    const id = setInterval(() => {
      this.onSaveCanvasImage()
      const image = new Image(300, 300);
      image.src  = this.canvasRef.current.toDataURL();
      gif.addFrame(image, {
        delay: 20
      });    
    }, 20);
        
    setTimeout(() => {
      clearInterval(id);
      gif.render();
    }, 2500);

    gif.on("start", () => {
      this.setState({ modal: true });
    });
    gif.on("progress", (progress) => {
      this.setState({ progress });
    });
    gif.on("finished", (blob) => {
      this.setState({
        resultImageData: URL.createObjectURL(blob),
        next: true,
        boomMusic: true,
        modal: false,
        counterStarted: false,
      });
      this.setStrip("likeButtons");
    });
  }

  onTakeGifClick = () => this.onTakeGifImages(); // call takegifimages

  onTakeGifImages = () => { // take 4 images at an interval of 1800ms
    const images = [];
    const captureImage = () => {
      this.playCaptureSound();
      this.onSaveCanvasImage();
      const image = new Image();
      image.src = this.canvasRef.current.toDataURL();
      images.push(image);
    }
    captureImage();

    const id = setInterval(() => {
      if (images.length === 4) {
        clearInterval(id);
        this.setState({ gifImages: images });
        this.onCreateGif();
        return;
      }
      captureImage();
    }, 1800);
  };

  onCreateGif = () => { // create a gif using the 4 images taken above
    const gif = new window.GIF({
      workers: 2,
      quality: 10,
      width: 300,
      height: 300,
    });
    this.state.gifImages.forEach((image) => {
      gif.addFrame(image);
    });
    gif.on("start", () => {
      this.setState({ modal: true });
    });
    gif.on("progress", (progress) => {
      this.setState({ progress });
    });
    gif.on("finished", (blob) => {
      this.setState({
        resultImageData: URL.createObjectURL(blob),
        next: true,
        modal: false,
        counterStarted: false,
      });
      this.setStrip("likeButtons");
    });
    gif.render();
  };

  onClearCanvas = () => { // clear the main canvas
    const canvas = this.canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  renderSoundAndFlah = () => { // show the audio and the white flash
    if (this.state.snapSound) {
      return  <>
                <SnapAudio/>
                <WhiteFlash/>    
              </> 
    }
  }

  renderBoomerangAudio = () => { //play boomerang music
    if (this.state.boomMusic && this.state.strip === "likeButtons" ) {
      return <BoomerangAudio/>
    }
  }

  onRetake = () => { // on retake - reset the state and clear canvas
    this.onClearCanvas();
    this.setState({
      streaming: false,
      strip: "experiences",
      snapSound: false,
      counterStarted: false,
      resultImageData: null,
      counterSeconds: 3,
      next: false,
      boomMusic: false,
      progress: 0,
    });
    this.props.setCanvasFrame(null);
  };

  setStrip = strip => this.setState({ strip }) // set strip to be shown

  render() {
    return (
      <div className="snap">
        <div className="content-area">
          {this.state.strip === "form" ? null : (
            <div className="snap__container">
              <video onCanPlay={this.onVideoCanPlay} ref={this.videoRef} />
              <canvas width="300" height="300"className="canvas" ref={this.canvasRef}/>
              <canvas width="300"  height="300" id="canvas__sticker" ref={this.stickerCanvasRef}/>
              {this.state.resultImageData ? (
                <img
                  className="resultImage"
                  ref={this.resultImage}
                  alt="resultimage"
                  src={this.state.resultImageData}
                />
              ) : null}
              {this.state.counterStarted && !(this.state.counterSeconds <= 0) ? (
                <p className="snap__counter">{this.state.counterSeconds}</p>
              ) : null}
              {this.renderSoundAndFlah()}
              {this.props.frameImageUrl ? (
              <img ref={this.frameImageRef} src={this.props.frameImageUrl}  alt=""/>
              ) : null}
            </div>
          )}
        </div>
        {this.renderBoomerangAudio()}
        {this.state.modal ? <ProgressCircle progress={this.state.progress}/>: null}
        <div className="strip">
          <Strip
            strip={this.state.strip}
            onTakePhotoClick={this.onTakePhotoClick}
            setStrip={this.setStrip}
            next={this.state.next}
            onRetake={this.onRetake}
            addSticker={this.addSticker}
            onTakeGifClick={this.onTakeGifClick}
            onBoomerangClick={this.onBoomerangClick}
            counter={this.counter}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { frameImageUrl: state.frameImageUrl}
}

export default connect(mapStateToProps, {
  setCanvasFrame,
})(Snap);
