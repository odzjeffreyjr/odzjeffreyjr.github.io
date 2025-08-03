# Jeffrey Oduman - Portfolio Website

🌐 **Live Website:** [www.jeffreyoduman.tech](https://www.jeffreyoduman.tech)

A modern, interactive portfolio website showcasing the work and skills of Jeffrey Oduman, a Computer Science and Robotics student at the University of Pennsylvania. Built with React and featuring stunning animations, this portfolio demonstrates expertise in AI, robotics, full-stack development, and more.

## Features

### **Home Page**
- **Interactive Stats Dashboard** - Real-time stats with animated counters
- **Floating Animations** - Dynamic GIFs and smooth transitions
- **Skills Showcase** - Comprehensive display of technical skills
- **Education Timeline** - Academic achievements and coursework
- **Experience Carousel** - Professional experience with smooth navigation
- **AI Chatbot** - Interactive chatbot powered by custom LLM service

### **About Me Page**
- **Dual Mode Toggle** - Switch between professional and fun personality modes
- **Animated Profile Pictures** - Seamless transitions between serious and fun Jeffrey
- **Dynamic Content** - Conditional text based on selected mode
- **Smooth Animations** - Framer Motion powered transitions

### **Projects Page**
- **Project Filtering** - Filter by technology stack and category
- **Interactive Cards** - Hover effects and smooth animations
- **Live Demos** - Direct links to deployed projects
- **GitHub Integration** - Easy access to source code
- **Responsive Grid** - Adaptive layout for all devices

### **AI Assistant**
- **Custom LLM Integration** - Powered by custom-deployed language model
- **Real-time Chat** - Interactive conversations about Jeffrey's background
- **Progress Indicators** - Visual feedback during AI processing
- **Error Handling** - Graceful fallbacks and retry mechanisms

## Technology Stack

### **Frontend**
- **React 19.1.1** - Latest React with modern hooks and features
- **React Router DOM 7.7.1** - Client-side routing
- **Framer Motion 12.23.11** - Advanced animations and transitions
- **CSS3** - Custom styling with modern features
- **JavaScript ES6+** - Modern JavaScript features

### **Backend Services**
- **Custom LLM Service** - Google Cloud Run deployed AI assistant
- **GitHub Pages** - Static site hosting
- **Custom Domain** - Professional domain with CNAME configuration

### **Development Tools**
- **Create React App** - Development environment
- **GitHub Pages Deployment** - Automated deployment pipeline
- **VS Code** - Development environment
- **Git** - Version control

## Design Features

### **Visual Design**
- **Quantum-inspired Theme** - Futuristic design with blue/orange gradients
- **Responsive Layout** - Mobile-first approach
- **Custom Animations** - Smooth transitions and hover effects
- **Interactive Elements** - Engaging user experience
- **Modern Typography** - Clean, readable fonts

### **User Experience**
- **Smooth Navigation** - Seamless page transitions
- **Loading States** - Visual feedback for better UX
- **Accessibility** - Screen reader friendly
- **Performance Optimized** - Fast loading times
- **Cross-browser Compatible** - Works on all modern browsers

## Project Structure

```
src/
├── components/
│   ├── Navigation.js          # Main navigation component
│   └── Navigation.css         # Navigation styles
├── pages/
│   ├── HomePage.js            # Landing page (Portfolio.js)
│   ├── MePage.js              # About page with dual modes
│   ├── ProjectsPage.js        # Projects showcase
│   └── ProjectsPage.css       # Projects page styles
├── App.js                     # Main app component with routing
├── App.css                    # Global styles and animations
├── ChatbotPage.js             # AI assistant component
├── ChatbotPage.css            # Chatbot styles
├── Portfolio.js               # Main portfolio/home page
└── index.js                   # Application entry point

public/
├── images/                    # Profile pictures and assets
├── gifs/                      # Animated elements
├── Jeffrey_Oduman_Resume.pdf  # Downloadable resume
├── index.html                 # HTML template
└── CNAME                      # Custom domain configuration
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/odzjeffreyjr/odzjeffreyjr.github.io.git
   cd odzjeffreyjr.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional for chatbot)
   ```bash
   # Create .env file in root directory
   REACT_APP_LLM_SERVICE_URL=your_llm_service_url
   REACT_APP_API_KEY=your_api_key
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

### **Development**
```bash
npm start          # Run development server
npm test           # Run test suite
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

### **Deployment**
```bash
npm run predeploy  # Build the project
npm run deploy     # Deploy to GitHub Pages
```

## Key Highlights

### **Technical Achievements**
- **Custom AI Integration** - Self-deployed LLM service on Google Cloud
- **Advanced Animations** - Complex Framer Motion implementations
- **Responsive Design** - Pixel-perfect across all devices
- **Performance Optimization** - Fast loading and smooth interactions
- **Clean Architecture** - Modular, maintainable code structure

### **Featured Projects**
- **Quantum Trading Platform** - Autonomous trading with Alpaca API
- **Transparency Now** - Android whistleblower app with encryption
- **NBA Game Predictor** - ML model with 0.93 AUC accuracy
- **Wiki Olympics Scraper** - Large-scale data processing engine
- **Java Chess Game** - Complete PvP implementation
- **BookMatch App** - Vector Space Model recommendation system

### **Professional Experience**
- **JoyNet Project** - AI-powered social media platform
- **Penn Electric Racing** - Custom data visualization library
- **Sung Robotics Group** - 3D robotics path algorithms
- **Teaching Assistant** - 200+ students mentored

## About Jeffrey Oduman

**Current:** BSE Computer Science + MSE Robotics (AI Track) at University of Pennsylvania  
**GPA:** 3.91/4.00  
**Focus Areas:** Artificial Intelligence, Robotics, Full-stack Development  

### **Core Skills**
- **Languages:** Python, Kotlin, Java, C++, OCaml, JavaScript
- **AI/ML:** PyTorch, Scikit-learn, BERT, Computer Vision
- **Web:** React.js, Node.js, HTML/CSS, REST APIs
- **Mobile:** Android Development, Jetpack Compose
- **Robotics:** ROS, Arduino, Raspberry Pi, Sensor Integration

## Deployment

The website is automatically deployed to GitHub Pages with custom domain:
- **Production URL:** [www.jeffreyoduman.tech](https://www.jeffreyoduman.tech)
- **GitHub Pages:** [odzjeffreyjr.github.io](https://odzjeffreyjr.github.io)
- **Deployment:** Automatic via GitHub Actions

## Contact

- **Email:** [odzjeffreyjr@gmail.com](mailto:odzjeffreyjr@gmail.com)
- **Website:** [www.jeffreyoduman.tech](https://www.jeffreyoduman.tech)
- **GitHub:** [@odzjeffreyjr](https://github.com/odzjeffreyjr)
- **LinkedIn:** [Jeffrey Oduman](https://linkedin.com/in/jeffrey-oduman)

## Known Issues

### **API Key Exposure**
- **Issue:** `REACT_APP_API_KEY` may be visible in production builds as React environment variables are embedded in the client-side bundle
- **Mitigation:** Comprehensive rate limiting and CORS policies and other security measures are implemented in the backend service
- **Backend Protection:** See [llm-service repository](https://github.com/odzjeffreyjr/llm-service) for detailed rate limiting, request validation, and abuse prevention logic
- **Risk Assessment:** Limited exposure risk due to backend-enforced quotas and monitoring
- **Future Solution:** Planning migration to server-side proxy for complete API key protection

## License

This project is open source and available under the [MIT License](LICENSE).

---


**Built with ❤️ by Jeffrey Oduman**  
*Pushing the boundaries of AI, robotics, and web development*
