const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./app/**/*.{js,jsx,ts,tsx}",  "./public/index.html",],
  theme: {
    extend: {},
  },
  plugins: [],
});