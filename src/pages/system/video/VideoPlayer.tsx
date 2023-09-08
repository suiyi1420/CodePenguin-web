import React, { useState, useRef,useEffect } from 'react';
import { PlayOutline } from 'antd-mobile-icons'
import styles from './index.less';
import ReactPlayer from 'react-player';
import VideoJS from './VideoJS'
import videojs from 'video.js';

export default function VideoPlayer({ src ,className,style}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef(null);
  const boxRef = useRef(null);
  const [width,setWidth]=useState(0);
  const [height,setHeight]=useState(0);
  const [option, setOptopm] = useState({});
console.log("width",width,height)
  // function handlePlay() {
  //   setIsPlaying(true);
  //   const video = videoRef.current;
  //   video.requestFullscreen();
  //   video.play();
  //   // setIsFullScreen(true);

  //   video.addEventListener('loadedmetadata', () => {
  //     const poster = drawVideoFrame();
  //     const img = document.createElement('img');
  //     img.src = poster;
  //     img.alt = 'Play';
  //     img.addEventListener('click', handlePlay);
  //     const posterContainer = document.querySelector('.poster');
  //     posterContainer.appendChild(img);
  //     canvasRef.current.style.display = 'none';
  //   });
  // }

  // function handleExitFullScreen() {
  //   const video = videoRef.current;
  //   video.webkitExitFullscreen();
  //   video.pause();
  //   setIsPlaying(false);
  // }

  // function handlePlayAgain() {
  //   const video = videoRef.current;
  //   video.currentTime = 0;
  //   video.play();
  //   setIsPlaying(true);
  // }

//   function drawVideoFrame() {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');

//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     const poster = canvas.toDataURL('image/png');

//     return poster;
//   }
//   function checkIsFullScreen(){
//     let isFullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
//     return isFullScreen == undefined ? false : isFullScreen;
// }
  // useEffect(() => {
  //   document.addEventListener('fullscreenchange', () => {
  //       if (checkIsFullScreen()) {
  //           console.log("进入全屏");
  //       } else {
  //           console.log("退出全屏");
  //           handleExitFullScreen()
  //       }
  //   });
  //   return () => {
  //       document.removeEventListener('fullscreenchange', () => {});
  //     };
  // });
  // const togglePlaying = () => {
  //   setPlaying(!playing);
  // };
  // const handleFullScreen = () => {
  //   if (playerRef.current) {
  //     playerRef.current.requestFullscreen();
  //   }
  // };
  useEffect(()=>{
    if(boxRef){
      setWidth(boxRef.current.clientWidth)
      setHeight(boxRef.current.clientHeight)
    }
  },[boxRef])
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: src,
      type: 'video/mp4'
    }],
    width:width,
    height:height,
    controlBar: {
      // timeDivider: true,//是否显示时间控制条，默认为true
      // remainingTimeDisplay: false,//是否显示剩余时间，默认为true
      fullscreenToggle: true, // 全屏按钮
      children: [//自定义
        { name: 'playToggle' }, // 播放按钮
      ]
    }
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className={styles["video-css"]} style={style}>
      <div className={styles["poster"]} ref={boxRef}>
          {/* <div className={styles['video-img']} onClick={()=>{setPlaying(true);}} style={{display:playing?"none":"flex"}}><PlayOutline color="#fff"/></div> */}
          {/* <video ref={videoRef} src={src} style={{width:"100%",height:"100%"}} webkit-playsinline="true" 
     x-webkit-airplay="true"
     playsinline="true"
     x5-video-player-type="h5"
     x5-video-orientation="h5"
     x5-video-player-fullscreen="true"
     preload="auto"/> */}
          {/* <video ref={videoRef} id="myVideo" src={src} poster="..." preload="no" onEnded={handlePlayAgain} webkit-playsinline playsinline x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portraint" x-webkit-airplay="true">
	<source src={src} type="video/mp4" />
	
</video> */}
{/* <ReactPlayer
// ref={playerRef}
        url={src}
        // className='react-player'
        playing={playing}
        preload="auto"
        // onPlay={() => screenfull.request()}
        onPause={()=>setPlaying(false)}
        width='100%'
        height='100%'
      /> */}

<VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

        </div>
    </div>
  );
}
