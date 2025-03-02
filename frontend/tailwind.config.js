/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  './src/pages/**/*.{js,ts,jsx,tsx}',
	  './src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
	  extend: {},
	},
	plugins: [],
	darkMode: 'class',
	theme: {
	  extend: {
		animation: {
		  'fade-in': 'fadeIn 0.5s ease-in',
		  'fade-in-delay': 'fadeIn 0.5s ease-in 0.2s',
		  blob: "blob 7s infinite",
		  float: "float 3s ease-in-out infinite",
		},
		keyframes: {
		  fadeIn: {
			'0%': { opacity: '0', transform: 'translateY(10px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' },
		  },
		  blob: {
			"0%": {
			  transform: "translate(0px, 0px) scale(1)",
			},
			"33%": {
			  transform: "translate(30px, -50px) scale(1.1)",
			},
			"66%": {
			  transform: "translate(-20px, 20px) scale(0.9)",
			},
			"100%": {
			  transform: "translate(0px, 0px) scale(1)",
			},
		  },
		  float: {
			'0%, 100%': { transform: 'translateY(0)' },
			'50%': { transform: 'translateY(-20px)' },
		  },
		},
	  },
	},
  };