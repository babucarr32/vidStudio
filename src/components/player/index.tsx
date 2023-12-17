/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef, useState } from 'react';

import cn from 'classnames';

import {
  PlayIcon,
  StopIcon,
  PauseIcon,
  VolumeIcon,
  ExpandIcon,
  PlayBackIcon,
  VolumeMuteIcon,
  PlayCircleIcon,
  PlayForwardIcon,
} from '../Icons';

import '../../App.css';

interface PlayerType extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoSrc: string;
  coverImage?: string;
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  volumeIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  playBackIcon?: React.ReactNode;
  volumeMuteIcon?: React.ReactNode;
  defaultPlayIconClassName?: string;
  playForwardIcon?: React.ReactNode;
  playInitialIcon?: React.ReactNode;
  defaultPauseIconClassName?: string;
  defaultExpandIconClassName?: string;
  defaultVolumeIconClassName?: string;
  defaultPlayBackIconClassName?: string;
  defaultVolumeMuteIconClassName?: string;
  defaultPlayInitialIconClassName?: string;
  defaultPlayForwardIconClassName?: string;
}

const VidStudio: React.FC<PlayerType> = ({
  playIcon,
  videoSrc,
  pauseIcon,
  coverImage,
  volumeIcon,
  expandIcon,
  playBackIcon,
  volumeMuteIcon,
  playForwardIcon,
  playInitialIcon,
  defaultPlayIconClassName,
  defaultPauseIconClassName,
  defaultExpandIconClassName,
  defaultVolumeIconClassName,
  defaultPlayBackIconClassName,
  defaultVolumeMuteIconClassName,
  defaultPlayInitialIconClassName,
  defaultPlayForwardIconClassName,
  ...props
}) => {
  const player = useRef<HTMLDivElement | any>();
  const progressBar = useRef<HTMLInputElement | any>();
  const currentTime = useRef<HTMLInputElement | any>();
  const progressRange = useRef<HTMLDivElement | any>();
  const duration = useRef<HTMLInputElement | any>();

  const [volume, setVolume] = useState<any>();
  const [volInput, setVolInput] = useState<any>();
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [video, setVideo] = useState<HTMLVideoElement>();
  const [controls, setControls] = useState<HTMLDivElement>();
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isInitialPlay, setIsInitialPlay] = useState<boolean>(false);
  const [speakerIcon, setSpeakerIcon] = useState<HTMLButtonElement>();
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [screenSize_icon, setScreenSize_icon] = useState<HTMLImageElement>();

  useEffect(() => {
    const handleSetVideo = () => {
      const result = player.current?.querySelector('.viewer');
      setVideo(result as any);
    };
    handleSetVideo();

    const handleSetControls = () => {
      const result = player.current.querySelector('.player_controls');
      setControls(result as any);
    };
    handleSetControls();

    const handleSetVolume = () => {
      const result = player.current?.querySelector('input[name="volume"]');
      setVolInput(result as any);
    };
    handleSetVolume();

    const handleSpeakerIcon = () => {
      const result = player.current?.querySelector('#speaker_icon');
      setSpeakerIcon(result as any);
    };
    handleSpeakerIcon();

    const handleSetScreenSizeIcon = () => {
      const result = player.current.querySelector('#screenSize_icon');
      setScreenSize_icon(result as any);
    };
    handleSetScreenSizeIcon();

    document.body.onkeyup = function (e) {
      if (e.keyCode == 32) {
        togglePlay();
      }
    };
  }, [player.current]);

  let muted = false;

  function skip(type: 'add' | 'reduce') {
    const skipNumber = {
      add: 10,
      reduce: -10
    }
    if (video) {
      video.currentTime += +skipNumber[type];
    }
  }

  function mute() {
    if (video && volInput && speakerIcon) {
      if (!muted) {
        video['volume'] = 0;
        volInput.value = 0;
        setIsAudioMuted(true);
        muted = true;
      } else {
        video['volume'] = 1;
        volInput.value = 1;
        muted = false;
        setIsAudioMuted(false);
      }
    }
  }

  function updateProgress() {
    if (video) {
      progressBar.current.style.width = `${
        (video.currentTime / video.duration) * 100
      }%`;
      currentTime.current.textContent = `${displayTime(video.currentTime)} /`;
      duration.current.textContent = `${displayTime(video.duration)}`;
    }
  }

  function displayTime(time: number) {
    const minutes = Math.floor(time / 60);
    let seconds: any = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  function setProgress(e: any) {
    if (video) {
      const rect = progressRange.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const newTime = offsetX / progressRange.current.offsetWidth;
      progressBar.current.style.width = `${newTime * 100}%`;
      video.currentTime = newTime * video.duration;
    }
  }

  function scrub(event: any) {
    if (video) {
      const scrubTime =
        (event.offsetX / progressRange.current.offsetWidth) * video.duration;
      video.currentTime = scrubTime;
    }
  }

  // volume functions
  function handleRangeUpdate(e: any) {
    if (video && speakerIcon) {
      (video as any)[e.target.name] = e.target.value;

      if (video.volume === 0) {
        // speakerIcon.className = "fa fa-volume-off";
        setIsAudioMuted(true);
      } else {
        setIsAudioMuted(false);
        // speakerIcon.className = "fa fa-volume-up";
      }
    }
  }
  // Stop video
  function stopVideo() {
    if (video) {
      video.currentTime = 0;
      video.pause();
    }
  }

  function changeScreenSize() {
    if (controls && screenSize_icon) {
      if (player.current.mozRequestFullScreen) {
        player.current.mozRequestFullScreen();
        video?.addEventListener(
          'mouseout',
          () => (controls.style.transform = 'translateY(100%) translateX(-5px)')
        );
        video?.addEventListener(
          'mouseover',
          () => (controls.style.transform = 'translateY(0)')
        );
        controls?.addEventListener(
          'mouseover',
          () => (controls.style.transform = 'translateY(0)')
        );
        // screenSize?.addEventListener('click', () => {
        //   if (document.exitFullscreen) {
        //     document.exitFullscreen();
        //   } else if (document.mozCancelFullScreen) {
        //     document.mozCancelFullScreen();
        //     screenSize_icon.className = 'fa fa-expand';
        //   }
        // });
      } else if (player.current.webkitRequestFullScreen) {
        player.current.webkitRequestFullScreen();

        screenSize_icon.className = 'fa fa-compress';

        video?.addEventListener(
          'mouseout',
          () => (controls.style.transform = 'translateY(100%) translateX(-5px)')
        );
        video?.addEventListener(
          'mouseover',
          () => (controls.style.transform = 'translateY(0)')
        );
        controls?.addEventListener(
          'mouseover',
          () => (controls.style.transform = 'translateY(0)')
        );
        // screenSize?.addEventListener('click', () => {
        //   if (document.exitFullscreen) {
        //     document.exitFullscreen();
        //   } else if (document.webkitExitFullscreen) {
        //     document.webkitExitFullscreen();
        //     screenSize_icon.className = 'fa fa-expand';
        //   }
        // });
      }
    }
  }

  function togglePlay() {
    if (video) {
      if (video.paused) {
        video.play();
        setIsInitialPlay(true);
        setIsVideoPlaying(true);
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    }
  }

  return (
    <div className="video-box relative ">
      <button
        className="absolute z-40"
        onClick={togglePlay}
        onKeyDown={(event) => event.keyCode === 32 && togglePlay()}
      >
        {!isInitialPlay &&
          (playInitialIcon ? (
            playInitialIcon
          ) : (
            <PlayCircleIcon className={defaultPlayInitialIconClassName} height={100} width={100} />
          ))}
      </button>
      <div className="player relative`" id="player" ref={player}>
        <video
          {...props}
          src={videoSrc}
          poster={coverImage}
          className="player_video viewer"
          onTimeUpdate={updateProgress}
          onCanPlay={updateProgress}
          onTimeUpdateCapture={updateProgress}
        ></video>

        <div className={cn('player_controls', !isInitialPlay? 'hidden': 'block')}>
          <div
            title="Jump-to"
            ref={progressRange}
            onClick={(e) => {setProgress(e); scrub(e)}}
            onMouseMove={(e) => isMouseDown && scrub(e)}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            className="progress-range"
          >
            <div ref={progressBar} className="progress-bar"></div>
          </div>

          <div className="right-controls flex items-center justify-between md:p-[8px] lg:p-[12px] xl:p-[16px]">
            <div className="flex items-center gap-[16px] w-[30%] justify-start">
              <button onClick={()=> mute()} className="player_button speaker">
                <i id="speaker_icon" aria-hidden="true">
                  {isAudioMuted ? (
                    volumeMuteIcon ? (
                      volumeMuteIcon
                    ) : (
                      <VolumeMuteIcon className={defaultVolumeMuteIconClassName}/>
                    )
                  ) : volumeIcon ? (
                    volumeIcon
                  ) : (
                    <VolumeIcon className={defaultVolumeIconClassName} />
                  )}
                </i>
              </button>
              <input
                min="0"
                max="1"
                step="0.05"
                type="range"
                name="volume"
                value={volume}
                className="player_slider"
                onChange={(e) => {setVolume(e.target.value); handleRangeUpdate(e)}}
                onMouseMove={(e)=> handleRangeUpdate(e)}
              ></input>
            </div>

            <div className="flex items-center gap-[8px] w-[30%] justify-center">
              <button onClick={() => skip('reduce')} className="player_button">
                {playBackIcon ? playBackIcon : <PlayBackIcon className={defaultPlayBackIconClassName}/>}
              </button>

              <button
                title="Toggle Play"
                onClick={togglePlay}
                className="player_button toggle"
                onKeyDown={(event) => event.keyCode === 32 && togglePlay()}
              >
                {isVideoPlaying ? (
                  pauseIcon ? (
                    pauseIcon
                  ) : (
                    <PauseIcon className={defaultPauseIconClassName}/>
                  )
                ) : playIcon ? (
                  playIcon
                ) : (
                  <PlayCircleIcon height={50} width={50} className={defaultPlayInitialIconClassName}/>
                )}
              </button>

              <button onClick={() => skip('add')} className="player_button">
                {playForwardIcon ? playForwardIcon : <PlayForwardIcon className={defaultPlayForwardIconClassName}/>}
              </button>
            </div>
            <div className="flex items-center w-[30%] justify-end">
              <div className="time text-sm md:text-base">
                <span ref={currentTime} className="time-elapsed">
                  00:00 /{' '}
                </span>
                <span ref={duration} className="time-duration">
                  2:38
                </span>
              </div>
              <button onClick={()=>changeScreenSize()} className="player_button screenSize hidden sm:block">
                {
                  expandIcon ? expandIcon :
                    <ExpandIcon className={defaultExpandIconClassName}/>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VidStudio;
