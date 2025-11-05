# 🎮 Advanced Tic Tac Toe Game

A feature-rich, beautifully animated Tic Tac Toe game built with React and Vite.

## ✨ Features

### 🎯 Game Modes
- **👥 Player vs Player** - Classic two-player mode on the same device
- **🤖 Player vs Computer** - Challenge the AI with three difficulty levels
- **🤖🤖 Computer vs Computer** - Watch two AIs battle it out automatically

### 🎚️ Difficulty Levels
- **😊 Easy** - Random moves, perfect for beginners
- **😐 Medium** - Mix of strategic and random moves
- **😈 Hard** - Unbeatable AI using the Minimax algorithm

### 🎨 Visual Features
- **Stunning Gradient Design** - Beautiful purple gradient background with animated patterns
- **Smooth Animations** - Every move, win, and interaction is animated
- **Win Celebrations** - Special animations when someone wins
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Hover Effects** - Interactive feedback on all buttons and squares
- **Symbol Animations** - X's and O's appear with a satisfying rotation effect

### 📊 Game Features
- **Score Tracking** - Keeps track of wins for X, O, and draws
- **Game Status Display** - Shows whose turn it is or game result
- **Winning Line Highlight** - Winning squares are highlighted with a green gradient
- **Computer Thinking Indicator** - Visual feedback when AI is calculating moves
- **Adjustable Speed** - Control how fast computers play in CvC mode (200ms - 2000ms)

### 🎮 Controls
- **🔄 New Game** - Start a fresh game with current settings
- **⚙️ Settings** - Return to settings to change game mode or difficulty
- **🗑️ Clear Scores** - Reset all score counters

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd hello-world-react-vite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Play

### Starting a Game
1. Select your preferred **Game Mode**:
   - Player vs Player for local multiplayer
   - Player vs Computer to challenge the AI
   - Computer vs Computer to watch AIs compete

2. If playing against computer, choose **Difficulty**:
   - Easy for casual play
   - Medium for a balanced challenge
   - Hard for maximum difficulty (nearly unbeatable!)

3. For Computer vs Computer mode, adjust the **Auto-play Speed** slider to control game pace

4. Click **Start Game** to begin

### Playing
- **Player vs Player**: Players take turns clicking empty squares
- **Player vs Computer**: You play as X (blue), computer plays as O (orange)
- **Computer vs Computer**: Sit back and watch the AIs play automatically

### Winning
- Get three of your symbols in a row (horizontal, vertical, or diagonal)
- Winning squares will be highlighted with a green gradient
- Score is automatically tracked and displayed

## 🛠️ Technical Details

### Built With
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients, animations, and flexbox
- **JavaScript ES6+** - Modern JavaScript features

### Key Algorithms
- **Minimax Algorithm** - Powers the Hard difficulty AI
  - Recursively evaluates all possible game states
  - Chooses optimal moves to maximize winning chances
  - Includes depth-based scoring for faster wins

### Project Structure
```
hello-world-react-vite/
├── src/
│   ├── App.jsx          # Main game component with all logic
│   ├── App.css          # Comprehensive styling and animations
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── index.html           # HTML template
├── FEATURE_IDEAS.md     # Future feature suggestions
└── README.md           # This file
```

## 🎨 Customization

### Changing Colors
Edit the gradient colors in [`App.css`](src/App.css):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjusting Animations
Modify animation durations and effects in [`App.css`](src/App.css):
```css
@keyframes symbolAppear {
  /* Customize animation here */
}
```

### AI Difficulty
Adjust AI behavior in [`App.jsx`](src/App.jsx):
- `getRandomMove()` - Easy difficulty
- `getMediumMove()` - Medium difficulty  
- `getHardMove()` - Hard difficulty (Minimax)

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- **Desktop**: Full-size board with large buttons
- **Tablet**: Optimized layout for touch
- **Mobile**: Compact design with stacked controls

## 🎯 Future Enhancements

See [`FEATURE_IDEAS.md`](FEATURE_IDEAS.md) for a comprehensive list of potential features including:
- Sound effects and music
- Online multiplayer
- Achievement system
- Custom themes
- Puzzle mode
- And many more!

## 🐛 Known Issues

None currently! If you find any bugs, please report them.

## 📄 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Built as an extra credit project demonstrating advanced React concepts
- Minimax algorithm implementation for unbeatable AI
- Modern CSS animations and gradients for visual appeal

## 📞 Support

For questions or suggestions, please refer to the [`FEATURE_IDEAS.md`](FEATURE_IDEAS.md) document.

---

**Enjoy playing! 🎮**
