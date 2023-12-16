## Introduction
Vid-Studio is more than just a video player - it's a customizable powerhouse designed to redefine how you interact with video content in React. This package seamlessly integrates Tailwind CSS, offering not just a visually appealing interface but also the flexibility to fine-tune every aspect of its design.

Beyond its prebuilt styles, Vid-Studio opens the door to a realm of customization by exposing its underlying CSS. Developers can dive into this CSS structure, allowing for extensive modifications or the creation of entirely unique video players. This flexibility means you're not limited to a standard look; you can create a player that perfectly mirrors your brand's identity or matches your site's aesthetic seamlessly.

Imagine having the freedom to swap default icons with your custom designs or tweak the player's appearance to harmonize with your website's theme - all achievable effortlessly within a React environment.

Built upon the foundation of Tailwind CSS and with accessible CSS modification capabilities, Vid-Studio empowers developers to craft mesmerizing, tailored video player experiences that seamlessly blend with their project's design language. Whether you prefer the default styles or wish to delve deeper into CSS customization, Vid-Studio provides a platform for crafting captivating video player interfaces within React applications.

## Installation
Run `npm i vid-studio`

Append the following to the `content` of your `tailwind.config.js`
`"./node_modules/vid-studio/**/*.{js,ts,jsx,tsx}"`
It should look similar to the following.
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/vid-studio/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Visit https://github.com/babucarr32/vidStudio/blob/main/src/App.css copy the css and add it to your `index.css` file.
It should look similar to the following.
```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  ...paste here the copied css...
}
```
That's it, you are good to go.

### The following are some of the props for customization 
```
playIcon: React.ReactNode,
videoSrc: React.ReactNode,
pauseIcon: React.ReactNode,
coverImage: React.ReactNode,
volumeIcon: React.ReactNode,
expandIcon: React.ReactNode,
playBackIcon: React.ReactNode,
volumeMuteIcon: React.ReactNode,
playForwardIcon: React.ReactNode,
playInitialIcon: React.ReactNode,
defaultPlayIconClassName: string,
defaultPauseIconClassName: string,
defaultExpandIconClassName: string,
defaultVolumeIconClassName: string,
defaultPlayBackIconClassName: string,
defaultVolumeMuteIconClassName: string,
defaultPlayInitialIconClassName: string,
defaultPlayForwardIconClassName: string,
```

### Example
```
import { VidStudio } from "vid-studio"

const Heart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
  )
}

function App() {
  return (
    <div>
      <VidStudio
        defaultPlayInitialIconClassName="hover:fill-pink-500"
        playForwardIcon={<Heart />}
        videoSrc="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
        coverImage="https://images.unsplash.com/photo-1702234867439-bec43ed4e369?q=80&w=2072&auto=format&fit=crop"
      />
    </div>
  )
}

export default App
```