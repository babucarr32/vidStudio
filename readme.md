## Introduction
Vid-Studio is more than just a video player - it's a customizable powerhouse designed to redefine how you interact with video content in React. This package seamlessly integrates Tailwind CSS, offering not just a visually appealing interface but also the flexibility to fine-tune every aspect of its design.

Beyond its prebuilt styles, Vid-Studio opens the door to a realm of customization by exposing its underlying CSS. Developers can dive into this CSS structure, allowing for extensive modifications or the creation of entirely unique video players. This flexibility means you're not limited to a standard look; you can create a player that perfectly mirrors your brand's identity or matches your site's aesthetic seamlessly.

Imagine having the freedom to swap default icons with your custom designs or tweak the player's appearance to harmonize with your website's theme - all achievable effortlessly within a React environment.

Built upon the foundation of Tailwind CSS and with accessible CSS modification capabilities, Vid-Studio empowers developers to craft mesmerizing, tailored video player experiences that seamlessly blend with their project's design language. Whether you prefer the default styles or wish to delve deeper into CSS customization, Vid-Studio provides a platform for crafting captivating video player interfaces within React applications.

## Installation
`npm i vid-studio`

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
It should look similar to like the following.
```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  ...paste here the copied css...
}
```