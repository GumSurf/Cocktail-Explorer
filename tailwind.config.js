import flowbite from "flowbite-react/tailwind";

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          display: ['Playfair Display', 'serif'],
        },
      },
    },
  plugins: [flowbite.plugin()],
};