# 🌊 Water Cycle Simulator

A 3D interactive water cycle simulator built with React and Three.js. This educational tool visualizes the continuous movement of water on, above, and below the surface of the Earth, including evaporation, condensation, precipitation, and collection.

## 📸 Features

- **3D Interactive Visualization**: Real-time 3D rendering of the water cycle using Three.js
- **Interactive Step Labels**: Click on any water cycle step (Evaporation, Condensation, Precipitation, Collection) to focus on that specific phase animation
- **Multiple Camera Views**: Switch between different perspectives (angle, side, top, front views) - defaults to angle view
- **Flowing River**: Animated river flowing from mountains to ocean for the collection phase
- **Always-Playing Simulation**: Continuous water cycle animation with no pause needed
- **Realistic Landscape**: Mountains with snow caps, rock details, hills, trees, and ocean
- **Particle Systems**: Dynamic particles for water droplets, vapor, clouds, precipitation, and groundwater
- **3D Models**: Includes low-poly tree models with fallback simple trees
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

1. **View the simulation**: The water cycle animation runs continuously showing all phases
2. **Click on step labels**: Click any of the 4 step labels to focus on that specific phase:
   - **1. Evaporation**: Watch water vapor rise from the ocean surface
   - **2. Condensation**: See vapor form into clouds in the atmosphere
   - **3. Precipitation**: Observe rain falling from clouds onto mountains and land
   - **4. Collection**: See water flowing through the river back to the ocean
3. **Change Camera View**: Use the control buttons to switch between angle, side, top, and front views
4. **Explore**: Use mouse to rotate the 3D scene and explore the environment

## 📚 Key Components

### WaterCycleScene.jsx

The main 3D scene component that handles:

- Three.js scene setup and rendering
- Camera management with multiple view angles (angle, side, top, front)
- OrbitControls for user interaction
- Particle system animation and step-based behavior
- River animation integration
- Shadow and lighting configuration

### ControlPanel.jsx

User interface controls including:

- Camera view selection buttons (Angle, Side, Top, Front)
- Clean, modern UI design

### ParticleSystem.js

Manages water particle behavior for each phase:

- **Water Particles**: Ocean surface water droplets (200 particles)
- **Vapor Particles**: Rising water vapor (150 particles)
- **Clouds**: Fluffy cloud formations that respond to condensation
- **Precipitation Particles**: Rain droplets falling on mountains (120 particles)
- **Groundwater Particles**: Water seeping into the ground
- Step-specific particle activation and animations

### EnvironmentObjects.js

Creates the complete 3D landscape:

- **Terrain**: Height-mapped ground with vertex colors
- **Mountains**: 10 realistic mountains with snow caps, rocks, minerals, and ledges
- **Hills**: 78 rolling hills extending from mountains to beach
- **Trees**: 75+ trees using OBJ models with fallback simple trees
- **Ocean**: Animated wave surface with transparency
- **River**: Flowing river with banks, rocks, and waterfall
- **Labels**: Interactive educational signs for each water cycle step
- **Flow Arrows**: Visual indicators showing water movement direction
- **Sun**: Glowing sun with corona and rays
- **Lighting**: Ambient, directional, hemisphere, and fill lights

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
- Modify particle colors (currently dark blue shades)
- Customize particle counts

### Changing the Landscape

Edit `src/components/EnvironmentObjects.js` to:

- Add or modify mountains, hills, and trees
- Adjust river path and appearance
- Change terrain colors and elevation
- Modify label text and positions

### Camera Views

Edit `src/components/WaterCycleScene.jsx` to:

- Add new camera positions
- Modify default view (currently "angle")
- Adjust OrbitControls settings

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

- **Water Cycle Phases**: Interactive visualization of evaporation, condensation, precipitation, and collection
- **Weather Patterns**: How water moves through the atmosphere
- **Climate Science**: The continuous cycle that sustains life on Earth
- **3D Visualization**: Learn through interactive exploration
- **Geographic Features**: Mountains, rivers, oceans, and their role in the water cycle

### The Four Steps

1. **Evaporation** ☀️ - Sun heats water in oceans, causing it to rise as vapor
2. **Condensation** ☁️ - Water vapor cools and forms clouds in the atmosphere
3. **Precipitation** 🌧️ - Water falls as rain when clouds become heavy
4. **Collection** 🌊 - Water gathers in rivers, lakes, and flows back to oceans

---

**Happy simulating! 🌍💧**
