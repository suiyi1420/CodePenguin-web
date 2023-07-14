import React, { useState, useRef,useEffect } from 'react';
import { PlayOutline } from 'antd-mobile-icons'
import styles from './index.less';

export default function VideoPlayer({ src ,className,style}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  function handlePlay() {
    setIsPlaying(true);
    const video = videoRef.current;
    video.requestFullscreen();
    video.play();
    // setIsFullScreen(true);

    video.addEventListener('loadedmetadata', () => {
      const poster = drawVideoFrame();
      const img = document.createElement('img');
      img.src = poster;
      img.alt = 'Play';
      img.addEventListener('click', handlePlay);
      const posterContainer = document.querySelector('.poster');
      posterContainer.appendChild(img);
      canvasRef.current.style.display = 'none';
    });
  }

  function handleExitFullScreen() {
    const video = videoRef.current;
    video.webkitExitFullscreen();
    video.pause();
    setIsPlaying(false);
  }

  function handlePlayAgain() {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  }

  function drawVideoFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const poster = canvas.toDataURL('image/png');

    return poster;
  }
  function checkIsFullScreen(){
    let isFullScreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
    return isFullScreen == undefined ? false : isFullScreen;
}
  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
        if (checkIsFullScreen()) {
            console.log("进入全屏");
        } else {
            console.log("退出全屏");
            handleExitFullScreen()
        }
    });
    return () => {
        document.removeEventListener('fullscreenchange', () => {});
      };
  });
  return (
    <div className={styles["video-css"]} style={style}>
      <div className={styles["poster"]}>
          <div className={styles['video-img']} onClick={handlePlay} style={{display:isPlaying?"none":"flex"}}><PlayOutline color="#fff"/></div>
          <video ref={videoRef} src={src} onEnded={handlePlayAgain} />
        </div>
    </div>
  );
}
