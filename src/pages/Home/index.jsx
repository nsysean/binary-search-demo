import { Button } from "../../components/button";
import { Icon } from "@iconify-icon/react";
import "./style.css";
import { Logo } from "../../components/logo";
import { useState, useCallback, useEffect, useRef } from 'preact/hooks';
import { PopUp } from "../../components/popUp";

export function Home() {
  const isEventListenerConnected = useRef(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [verdict, setVerdict] = useState('');
  const [tally, setTally] = useState(0);
  const [number, setNumber] = useState(0);
  const [prevent, setPrevent] = useState(false);
  const [guess, setGuess] = useState('');

  const reset = () => {
    setTally(0);
    const no = Math.floor(Math.random() * 100) + 1;
    setNumber(no);
  }

  const getFullScreenElement = () => {
    if (document["fullscreenEnabled"]) {
      return document["fullscreenElement"];
    } else if (document["webkitFullscreenEnabled"]) {
      return document["webkitFullscreenElement"];
    } else if (document["mozFullScreenEnabled"]) {
      return document["mozFullScreenElement"];
    } else if (document["msFullscreenEnabled"]) {
      return document["msFullscreenElement"];
    } else {
      return;
    }
  };

  const hasEvent = (contentElement, eventName) => {
    for (const key in contentElement) {
      if (eventName === key) {
        return true;
      }
    }
    return false;
  };

  const getFullScreenChangeEvent = (contentElement) => {
    if (
      document["fullscreenEnabled"] &&
      hasEvent(contentElement, "onfullscreenchange")
    ) {
      return "fullscreenchange";
    } else if (
      document["webkitFullscreenEnabled"] &&
      hasEvent(contentElement, "onwebkitfullscreenchange")
    ) {
      return "webkitfullscreenchange";
    } else if (
      document["mozFullScreenEnabled"] &&
      hasEvent(contentElement, "onmozfullscreenchange")
    ) {
      return "mozfullscreenchange";
    } else if (
      document["msFullscreenEnabled"] &&
      hasEvent(contentElement, "onmsfullscreenchange")
    ) {
      return "msfullscreenchange";
    } else {
      return;
    }
  };

  const getFullScreenCancelMethod = () => {
    if (document["fullscreenEnabled"] && document["exitFullscreen"]) {
      return document["exitFullscreen"];
    } else if (
      document["webkitFullscreenEnabled"] &&
      document["webkitExitFullscreen"]
    ) {
      return document["webkitExitFullscreen"];
    } else if (
      document["mozFullScreenEnabled"] &&
      document["mozCancelFullScreen"]
    ) {
      return document["mozCancelFullScreen"];
    } else if (
      document["msFullscreenEnabled"] &&
      document["msExitFullscreen"]
    ) {
      return document["msExitFullscreen"];
    } else {
      return;
    }
  };

  const getFullScreenRequestMethod = (contentElement) => {
    if (document["fullscreenEnabled"] && contentElement["requestFullscreen"]) {
      return contentElement["requestFullscreen"];
    } else if (
      document["webkitFullscreenEnabled"] &&
      contentElement["webkitRequestFullscreen"]
    ) {
      return contentElement["webkitRequestFullscreen"];
    } else if (
      document["mozFullScreenEnabled"] &&
      contentElement["mozRequestFullScreen"]
    ) {
      return contentElement["mozRequestFullScreen"];
    } else if (
      document["msFullscreenEnabled"] &&
      contentElement["msRequestFullscreen"]
    ) {
      return contentElement["msRequestFullscreen"];
    } else {
      return;
    }
  };

  const fullScreenChangeListener = (setFullScreen) => {
    const isFullScreenActive = getFullScreenElement() != null;
    setFullScreen(isFullScreenActive);
  };
  
  const handleGuess = () => {
    const unsafe = guess;
    const g = parseInt(unsafe);
    setGuess('');
    if (!Number.isInteger(g) || g > 100 || g < 1 || unsafe == '') {
      setVerdict('Invalid number!');
      return 0;
    }

    setTally(tally + 1);
    if (number === g) {
      const t = tally;
      setVerdict(`You guessed the correct number in ${t} moves!`)
      reset();
    } else if (g > number) {
      setVerdict('Your guess is larger than the hidden number!');
    } else {
      setVerdict('Your guess is smaller or equal to the hidden number!');
    }
  }

  useEffect(() => {
    if (prevent == false) {
      setPrevent(true);
      reset();
    }
  }, [])

  useEffect(() => {
    if (!isEventListenerConnected.current) {
      let contentElement = document.documentElement;
      if (contentElement) {
        let eventName = getFullScreenChangeEvent(contentElement);
        if (eventName) {
          contentElement.addEventListener(eventName, () =>
            fullScreenChangeListener(setFullScreen)
          );
        }

        isEventListenerConnected.current = true;
      }
    }
  }, [isEventListenerConnected, setFullScreen]);

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) {
      const requestMethod = getFullScreenCancelMethod();
      if (requestMethod) {
        requestMethod.call(document);
      }
    } else {
      const contentElement = document.documentElement;
      const requestMethod = getFullScreenRequestMethod(contentElement);
      if (requestMethod) {
        requestMethod.call(contentElement);
      }
    }
  }, [isFullScreen]);
  return (
    <div class="home">
      <PopUp title="Verdict" toggle={verdict != ''} close={() => {setVerdict('')}}>
        <div style="text-align: center; font-size: 1.5rem; padding-inline: 20px;">
          {verdict}
        </div>
      </PopUp>
      <div class="fs">
        <Button CTA={false} onClick={toggleFullScreen}>
          <Icon icon={isFullScreen ? "mingcute:fullscreen-exit-fill" : "mingcute:fullscreen-fill"} />
        </Button>
      </div>
      <div class="rs">
        <Button CTA={false} onClick={reset}>
          <Icon icon="mingcute:refresh-3-fill" />
        </Button>
      </div>
      <div class="wrapper">
        <Logo></Logo>
        <div class="row">
          <input class="guess" value={guess} onChange={(e) => setGuess(e.target['value'])} type="number"></input>
          <div class="space"></div>
          <Button CTA={true} onClick={handleGuess}>
            {" "}
            <Icon
              icon="mdi:gavel"
              style="transform: translate(4px, -10px) scale(1.1);"
            />
            {"\u00A0"} Guess
          </Button>
        </div>
      </div>
    </div>
  );
}
