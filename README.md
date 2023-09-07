# Pomodoro.ir

Pomodoro.ir is a pomodoro technique timer progressive web app built with Nuxt and TypeScript. It allows users to utilize the pomodoro time management method to boost productivity.

## Features

- Set 25 minute pomodoro timer
- Automatic alerts with notification when timer ends 
- Responsive design and PWA support

## Targets
-  [ ] Archive Tasks
-  [ ] Settings and customization
-  [ ] Stats and report
-  [ ] Multi-language (EN & FA)

## Usage

The app follows the pomodoro technique of 25 minute work periods separated by 5 minute breaks. 

To use the app:

1. Open the app
2. Click "Start Pomodoro" to start a 25 minute work timer
3. When the timer ends, an alert will notify you to take a 5 minute break
4. Click "Start Break" to start the 5 minute break timer 
5. After the break, click "Start Pomodoro" to do another 25 minute work period
6. Pomodoros completed increments after each full work/break cycle

## Installation

The app is hosted at [pomodoro.ir](https://pomodoro.ir).

To run locally:

1. Clone the repository 
2. Run `npm install`
3. Run `npm run dev`
4. Access the app at http://localhost:3000

### Build and Deploy

To build a production version:

`npm run build`

To deploy, start the nuxt server by `npm start` command.

## Technology Stack

- Vue 
- TypeScript
- Nuxt
- Tailwind CSS

## Architecture

The app is built with:

- Components for each page and reusable UI elements
- Vue reactive & ref for state management
- Custom hooks for reusable logic
- Utilities for date formatting, sounds, and more

## Contributing

Contributions are welcome! Please open an issue or PR if you would like to contribute.

Let me know if you need any other sections or details included in the README.
