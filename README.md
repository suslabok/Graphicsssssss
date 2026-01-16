# 🌊 Water Cycle Simulator

A 3D interactive water cycle simulator built with React and Three.js. This educational tool visualizes the continuous movement of water on, above, and below the surface of the Earth, including evaporation, condensation, precipitation, and collection.

## 📸 Features

- **3D Interactive Visualization**: Real-time 3D rendering of the water cycle using Three.js
- **Multiple Camera Views**: Switch between different perspectives (side view, top view, and more)
- **Play/Pause Controls**: Control simulation playback
- **Particle System**: Dynamic particle system to visualize water movement
- **3D Models**: Includes low-poly tree and mountain models for realistic environment
- **Responsive Design**: Fullscreen interactive experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/water-cycle-simulator.git
   cd water-cycle-simulator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The application will open automatically at `http://localhost:3000`

## 🏗️ Project Structure

```
water-cycle-simulator/
├── public/                      # Static assets
│   ├── index.html              # Main HTML file
│   ├── Lowpoly_tree_sample.*   # Tree 3D model files
│   └── mount.blend1.*          # Mountain 3D model files
├── src/
│   ├── components/
│   │   ├── WaterCycleScene.jsx  # Main 3D scene component
│   │   ├── ControlPanel.jsx     # Control panel UI component
│   │   ├── ParticleSystem.js    # Particle system for water visualization
│   │   └── EnvironmentObjects.js # 3D environment objects
│   ├── App.js                   # Main app component
│   ├── WaterCyclesimulator.jsx   # Root simulator component
│   ├── index.js                 # React entry point
│   ├── index.css                # Global styles
│   └── App.css                  # App styles
├── build/                       # Production build (generated)
├── package.json                 # Project dependencies and scripts
└── README.md                    # This file
```

## 📦 Dependencies

- **React** (^19.2.3) - UI library
- **React DOM** (^19.2.3) - React rendering
- **Three.js** (^0.182.0) - 3D graphics library
- **React Scripts** (5.0.1) - Build and development tools

## 🎮 Usage

1. **Start the simulation**: Click the play button to begin the water cycle animation
2. **Pause/Resume**: Use the play/pause button to control the simulation
3. **Change View**: Switch between different camera angles using the view controls
4. **Observe the cycle**: Watch as water particles move through evaporation, condensation, precipitation, and collection phases

## 📚 Key Components

### WaterCycleScene.jsx

The main 3D scene component that handles:

- Three.js scene setup
- Camera management and switching
- Particle system rendering
- 3D model loading and positioning
- Animation loop

### ControlPanel.jsx

User interface controls including:

- Play/Pause button
- Camera view selection
- Information display

### ParticleSystem.js

Manages water particle behavior:

- Particle creation and movement
- Physics simulation
- Lifecycle management

### EnvironmentObjects.js

Handles 3D environment:

- Model loading (trees, mountains)
- Object positioning
- Lighting setup

## 🔧 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm build`

Builds the app for production to the `build` folder

### `npm test`

Runs the test suite

## 🎨 Customization

### Modifying the Water Cycle

Edit `src/components/ParticleSystem.js` to:

- Adjust particle speed and behavior
- Change evaporation/precipitation rates
- Modify particle appearance

### Changing 3D Models

Replace or add 3D model files in the `public/` directory:

- Supported formats: `.obj`, `.mtl`
- Update references in `src/components/EnvironmentObjects.js`

### Styling

- Global styles: `src/index.css`
- App-specific styles: `src/App.css`

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎓 Educational Value

This simulator is designed to help students understand:

- Water cycle phases: evaporation, condensation, precipitation, collection
- Weather patterns and atmospheric processes
- Climate and environmental science concepts
- 3D visualization and interactive learning

---

**Happy simulating! 🌍💧**
