# UnitSnap 🔄

**UnitSnap** is a modern, professional-grade unit conversion website featuring **27 comprehensive converters** across multiple domains. Built with vanilla JavaScript, it offers a beautiful gradient UI with glassmorphism effects, modal popup interface, conversion history tracking, and quick compare functionality.

---

## ✨ Features

- 🎨 **Modern Gradient UI** with textured backgrounds and glassmorphism effects
- 🔍 **Smart Search** for quick converter discovery
- 📱 **Fully Responsive** design (mobile, tablet, desktop)
- 🌓 **Dark/Light Theme** with persistent preferences
- 📊 **Conversion History** with CSV export capability
- ⚖️ **Quick Compare** for side-by-side unit comparisons
- 🔊 **Text-to-Speech** results readout
- 📋 **Copy to Clipboard** for instant results sharing
- 🎯 **Colorful Icons** for each converter category
- 💾 **LocalStorage** for theme and history persistence

---

## 🔢 Available Converters

### **1. Length Converter**
Convert between:
- Meter (m), Kilometer (km), Centimeter (cm), Millimeter (mm)
- Mile (mi), Yard (yd), Foot (ft), Inch (in)

### **2. Data Storage Converter**
Convert between:
- Bit, Byte (B), Kilobyte (KB), Megabyte (MB), Gigabyte (GB), Terabyte (TB)
- Binary-based calculations (1024 factor)

### **3. Temperature Converter**
Convert between:
- Celsius (°C), Fahrenheit (°F), Kelvin (K)

### **4. Cooking Converter**
Convert between:
- Teaspoon (tsp), Tablespoon (tbsp), Cup
- Milliliter (mL), Liter (L), Gram (g), Ounce (oz)

### **5. Area Converter**
Convert between:
- Square Meter (m²), Square Kilometer (km²), Square Foot (ft²), Square Mile (mi²)
- Acre, Hectare (ha)

### **6. Transfer Rate Converter**
Convert between:
- Bits per second (bps), Kilobits per second (Kbps)
- Megabits per second (Mbps), Gigabits per second (Gbps)
- Bytes per second (B/s)

### **7. Pressure Converter**
Convert between:
- Pascal (Pa), Bar, PSI (lb/in²), Atmosphere (atm), Torr

### **8. Currency Converter (Approximate)**
Convert between:
- Indian Rupee (₹), US Dollar ($), Euro (€), British Pound (£)
- *Note: Uses approximate fixed rates for demonstration*

### **9. Weight / Mass Converter**
Convert between:
- Gram (g), Kilogram (kg), Tonne (t)
- Pound (lb), Ounce (oz)

### **10. Number Base Converter**
Convert between:
- Decimal (base 10), Binary (base 2), Hexadecimal (base 16)

### **11. Energy Converter**
Convert between:
- Joule (J), Kilojoule (kJ), Calorie (cal), Kilocalorie (kcal)
- Watt-hour (Wh), Kilowatt-hour (kWh)

### **12. Fuel Economy Converter**
Convert between:
- Kilometers per Liter (km/L), Miles per Gallon (MPG US/UK)
- Liters per 100 kilometers (L/100km)

### **13. Angle Converter**
Convert between:
- Degree (°), Radian (rad), Gradian (grad)

### **14. Power Converter**
Convert between:
- Watt (W), Kilowatt (kW), Horsepower (hp)

### **15. Torque Converter**
Convert between:
- Newton-meter (N⋅m), Pound-foot (lb⋅ft)

### **16. Text Case Converter**
Convert text to:
- UPPERCASE, lowercase, Title Case, Sentence case

### **17. Text Encoding Converter**
Encode and decode:
- Base64 encoding/decoding, URL encoding/decoding

### **18. Flow Rate Converter**
Convert between:
- Cubic meter per second (m³/s), Liter per minute (L/min)
- Gallon per minute (gal/min)

### **19. Time Converter**
Convert between:
- Second (s), Minute (min), Hour (hr), Day, Week
- Month (30 days), Year (365 days)

### **20. Typography Converter**
Convert between:
- Pixels (px), Rem, Em (base: 16px)

### **21. Roman Numerals Converter**
Convert between:
- Roman numerals (I, V, X, L, C, D, M) and decimal numbers

### **22. Speed Converter**
Convert between:
- Meter per second (m/s), Kilometer per hour (km/h)
- Mile per hour (mph), Knot

### **23. Radiation Converter**
Convert between:
- Gray (Gy), Sievert (Sv), Rad, Rem

### **24. Color Converter**
Convert between:
- HEX color codes, RGB values, HSL values
- Includes live color preview

### **25. Numerals Converter**
Convert between:
- English words and numeric values (e.g., "One" ↔ 1)

### **26. Morse Code Converter**
Convert between:
- Text and Morse code (dots and dashes)

### **27. Frequency Converter**
Convert between:
- Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), Gigahertz (GHz)

---

## 🚀 Installation & Usage

### **Quick Start**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anurag-panda-dev/UnitSnap-repo.git
   cd UnitSnap-repo
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - No build process or dependencies required!

### **File Structure**
```
UnitSnap/
│
├── index.html              # Main HTML structure
├── css/
│   └── style.css           # All styling with theming
├── js/
│   ├── data.js             # Converter definitions and data
│   ├── converters.js       # Conversion logic functions
│   ├── ui.js               # DOM manipulation and modal system
│   └── main.js             # Application initialization
└── README.md               # This file
```

---

## 🛠️ Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern features (Grid, Flexbox, CSS Variables, backdrop-filter)
- **JavaScript (ES6+)** - Vanilla JavaScript, no frameworks
- **LocalStorage API** - Persistent preferences and history

---

## 🎨 Design Features

- **Gradient Backgrounds:**
  - Light theme: Purple-to-blue gradient (#667eea → #764ba2)
  - Dark theme: Navy gradient (#1a1a2e → #16213e)

- **Textured Overlays:**
  - Diagonal crosshatch patterns
  - SVG geometric patterns
  - Radial gradient overlays

- **Glassmorphism Effects:**
  - Semi-transparent cards with backdrop blur
  - Frosted glass navbar and search input
  - Modern depth and layering

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new converters
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

**Developer:** Anurag Panda  
**GitHub:** [@anurag-panda-dev](https://github.com/anurag-panda-dev)  
**Repository:** [UnitSnap-repo](https://github.com/anurag-panda-dev/UnitSnap-repo)

---

## 🌟 Acknowledgments

Built with modern web technologies and a focus on user experience. Special thanks to the open-source community for inspiration and best practices.

---

**Made with ❤️ by Anurag Panda**
