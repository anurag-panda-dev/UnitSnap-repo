// ========================================
// CONVERTER DEFINITIONS
// ========================================

const CONVERTERS_DATA = [
    // 1. LENGTH
    {
        id: 'length',
        title: 'Length Converter',
        description: 'Convert between meters, kilometers, miles, feet, inches, and more',
        keywords: ['length', 'distance', 'meter', 'kilometer', 'mile', 'foot', 'inch', 'yard', 'cm', 'mm'],
        type: 'standard',
        units: {
            'meter': { name: 'Meter (m)', factor: 1 },
            'kilometer': { name: 'Kilometer (km)', factor: 1000 },
            'centimeter': { name: 'Centimeter (cm)', factor: 0.01 },
            'millimeter': { name: 'Millimeter (mm)', factor: 0.001 },
            'mile': { name: 'Mile (mi)', factor: 1609.344 },
            'yard': { name: 'Yard (yd)', factor: 0.9144 },
            'foot': { name: 'Foot (ft)', factor: 0.3048 },
            'inch': { name: 'Inch (in)', factor: 0.0254 }
        }
    },
    
    // 2. DATA STORAGE
    {
        id: 'data-storage',
        title: 'Data Storage Converter',
        description: 'Convert between bits, bytes, KB, MB, GB, TB (binary)',
        keywords: ['data', 'storage', 'byte', 'bit', 'kb', 'mb', 'gb', 'tb', 'kilobyte', 'megabyte', 'gigabyte'],
        type: 'standard',
        units: {
            'bit': { name: 'Bit', factor: 1 },
            'byte': { name: 'Byte (B)', factor: 8 },
            'kilobyte': { name: 'Kilobyte (KB)', factor: 8192 },
            'megabyte': { name: 'Megabyte (MB)', factor: 8388608 },
            'gigabyte': { name: 'Gigabyte (GB)', factor: 8589934592 },
            'terabyte': { name: 'Terabyte (TB)', factor: 8796093022208 }
        }
    },
    
    // 3. TEMPERATURE
    {
        id: 'temperature',
        title: 'Temperature Converter',
        description: 'Convert between Celsius, Fahrenheit, and Kelvin',
        keywords: ['temperature', 'celsius', 'fahrenheit', 'kelvin', 'temp', 'hot', 'cold'],
        type: 'temperature'
    },
    
    // 4. COOKING
    {
        id: 'cooking',
        title: 'Cooking Converter',
        description: 'Convert between teaspoons, tablespoons, cups, milliliters, liters, grams, and ounces',
        keywords: ['cooking', 'recipe', 'teaspoon', 'tablespoon', 'cup', 'milliliter', 'liter', 'gram', 'ounce'],
        type: 'standard',
        units: {
            'teaspoon': { name: 'Teaspoon (tsp)', factor: 1 },
            'tablespoon': { name: 'Tablespoon (tbsp)', factor: 3 },
            'cup': { name: 'Cup', factor: 48 },
            'milliliter': { name: 'Milliliter (mL)', factor: 0.202884 },
            'liter': { name: 'Liter (L)', factor: 202.884 },
            'gram': { name: 'Gram (g)', factor: 0.202884 },
            'ounce': { name: 'Ounce (oz)', factor: 6 }
        }
    },
    
    // 5. AREA
    {
        id: 'area',
        title: 'Area Converter',
        description: 'Convert between square meters, kilometers, acres, hectares, square feet, and miles',
        keywords: ['area', 'square', 'meter', 'kilometer', 'acre', 'hectare', 'feet', 'mile'],
        type: 'standard',
        units: {
            'square-meter': { name: 'Square Meter (m²)', factor: 1 },
            'square-kilometer': { name: 'Square Kilometer (km²)', factor: 1000000 },
            'square-foot': { name: 'Square Foot (ft²)', factor: 0.092903 },
            'square-mile': { name: 'Square Mile (mi²)', factor: 2589988 },
            'acre': { name: 'Acre', factor: 4046.86 },
            'hectare': { name: 'Hectare (ha)', factor: 10000 }
        }
    },
    
    // 6. TRANSFER RATE
    {
        id: 'transfer-rate',
        title: 'Transfer Rate Converter',
        description: 'Convert between bps, Kbps, Mbps, Gbps, and bytes per second',
        keywords: ['transfer', 'rate', 'speed', 'bps', 'kbps', 'mbps', 'gbps', 'bandwidth', 'internet'],
        type: 'standard',
        units: {
            'bps': { name: 'Bits per second (bps)', factor: 1 },
            'kbps': { name: 'Kilobits per second (Kbps)', factor: 1000 },
            'mbps': { name: 'Megabits per second (Mbps)', factor: 1000000 },
            'gbps': { name: 'Gigabits per second (Gbps)', factor: 1000000000 },
            'bytes-per-sec': { name: 'Bytes per second (B/s)', factor: 8 }
        }
    },
    
    // 7. PRESSURE
    {
        id: 'pressure',
        title: 'Pressure Converter',
        description: 'Convert between Pascal, Bar, PSI, atmosphere, and torr',
        keywords: ['pressure', 'pascal', 'bar', 'psi', 'atmosphere', 'torr'],
        type: 'standard',
        units: {
            'pascal': { name: 'Pascal (Pa)', factor: 1 },
            'bar': { name: 'Bar', factor: 100000 },
            'psi': { name: 'PSI (lb/in²)', factor: 6894.76 },
            'atmosphere': { name: 'Atmosphere (atm)', factor: 101325 },
            'torr': { name: 'Torr', factor: 133.322 }
        }
    },
    
    // 8. CURRENCY
    {
        id: 'currency',
        title: 'Currency Converter (Approx)',
        description: 'Approximate conversion between INR, USD, EUR, and GBP',
        keywords: ['currency', 'money', 'inr', 'usd', 'eur', 'gbp', 'dollar', 'euro', 'pound', 'rupee'],
        type: 'standard',
        units: {
            'inr': { name: 'Indian Rupee (₹)', factor: 1 },
            'usd': { name: 'US Dollar ($)', factor: 83 },
            'eur': { name: 'Euro (€)', factor: 90 },
            'gbp': { name: 'British Pound (£)', factor: 105 }
        }
    },
    
    // 9. WEIGHT / MASS
    {
        id: 'weight',
        title: 'Weight / Mass Converter',
        description: 'Convert between grams, kilograms, tonnes, pounds, and ounces',
        keywords: ['weight', 'mass', 'gram', 'kilogram', 'tonne', 'pound', 'ounce', 'kg', 'lb'],
        type: 'standard',
        units: {
            'gram': { name: 'Gram (g)', factor: 1 },
            'kilogram': { name: 'Kilogram (kg)', factor: 1000 },
            'tonne': { name: 'Tonne (t)', factor: 1000000 },
            'pound': { name: 'Pound (lb)', factor: 453.592 },
            'ounce': { name: 'Ounce (oz)', factor: 28.3495 }
        }
    },
    
    // 10. NUMBER BASES
    {
        id: 'number-base',
        title: 'Number Base Converter',
        description: 'Convert between decimal, binary, and hexadecimal',
        keywords: ['number', 'base', 'decimal', 'binary', 'hexadecimal', 'hex', 'bin', 'oct'],
        type: 'number-base'
    },
    
    // 11. ENERGY
    {
        id: 'energy',
        title: 'Energy Converter',
        description: 'Convert between joules, kilojoules, calories, kilocalories, and watt-hours',
        keywords: ['energy', 'joule', 'calorie', 'watt', 'kwh', 'kilojoule', 'kilocalorie'],
        type: 'standard',
        units: {
            'joule': { name: 'Joule (J)', factor: 1 },
            'kilojoule': { name: 'Kilojoule (kJ)', factor: 1000 },
            'calorie': { name: 'Calorie (cal)', factor: 4.184 },
            'kilocalorie': { name: 'Kilocalorie (kcal)', factor: 4184 },
            'watt-hour': { name: 'Watt-hour (Wh)', factor: 3600 },
            'kilowatt-hour': { name: 'Kilowatt-hour (kWh)', factor: 3600000 }
        }
    },
    
    // 12. FUEL ECONOMY
    {
        id: 'fuel-economy',
        title: 'Fuel Economy Converter',
        description: 'Convert between km/L, MPG (US/UK), and L/100km',
        keywords: ['fuel', 'economy', 'mpg', 'km/l', 'liter', 'gallon', 'mileage'],
        type: 'fuel-economy'
    },
    
    // 13. ANGLE
    {
        id: 'angle',
        title: 'Angle Converter',
        description: 'Convert between degrees, radians, and gradians',
        keywords: ['angle', 'degree', 'radian', 'gradian', 'rad', 'deg'],
        type: 'standard',
        units: {
            'degree': { name: 'Degree (°)', factor: 1 },
            'radian': { name: 'Radian (rad)', factor: 57.2958 },
            'gradian': { name: 'Gradian (grad)', factor: 0.9 }
        }
    },
    
    // 14. POWER
    {
        id: 'power',
        title: 'Power Converter',
        description: 'Convert between watts, kilowatts, and horsepower',
        keywords: ['power', 'watt', 'kilowatt', 'horsepower', 'hp', 'kw'],
        type: 'standard',
        units: {
            'watt': { name: 'Watt (W)', factor: 1 },
            'kilowatt': { name: 'Kilowatt (kW)', factor: 1000 },
            'horsepower': { name: 'Horsepower (hp)', factor: 745.7 }
        }
    },
    
    // 15. TORQUE
    {
        id: 'torque',
        title: 'Torque Converter',
        description: 'Convert between newton-meters and pound-feet',
        keywords: ['torque', 'newton', 'meter', 'pound', 'foot', 'nm', 'lb-ft'],
        type: 'standard',
        units: {
            'newton-meter': { name: 'Newton-meter (N⋅m)', factor: 1 },
            'pound-foot': { name: 'Pound-foot (lb⋅ft)', factor: 1.35582 }
        }
    },
    
    // 16. TEXT CASE
    {
        id: 'text-case',
        title: 'Text Case Converter',
        description: 'Convert text to UPPERCASE, lowercase, Title Case, or Sentence case',
        keywords: ['text', 'case', 'upper', 'lower', 'title', 'sentence', 'string'],
        type: 'text-case'
    },
    
    // 17. ENCODING
    {
        id: 'encoding',
        title: 'Text Encoding Converter',
        description: 'Encode and decode Base64 and URL encoding',
        keywords: ['encoding', 'base64', 'url', 'encode', 'decode'],
        type: 'encoding'
    },
    
    // 18. FLOW RATE
    {
        id: 'flow-rate',
        title: 'Flow Rate Converter',
        description: 'Convert between cubic meters per second, liters per minute, and gallons per minute',
        keywords: ['flow', 'rate', 'cubic', 'meter', 'liter', 'gallon', 'minute', 'second'],
        type: 'standard',
        units: {
            'cubic-meter-sec': { name: 'Cubic meter/second (m³/s)', factor: 1 },
            'liter-min': { name: 'Liter/minute (L/min)', factor: 0.0000166667 },
            'gallon-min': { name: 'Gallon/minute (gal/min)', factor: 0.0000630902 }
        }
    },
    
    // 19. TIME
    {
        id: 'time',
        title: 'Time Converter',
        description: 'Convert between seconds, minutes, hours, days, weeks, months, and years',
        keywords: ['time', 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
        type: 'standard',
        units: {
            'second': { name: 'Second (s)', factor: 1 },
            'minute': { name: 'Minute (min)', factor: 60 },
            'hour': { name: 'Hour (hr)', factor: 3600 },
            'day': { name: 'Day', factor: 86400 },
            'week': { name: 'Week', factor: 604800 },
            'month': { name: 'Month (30 days)', factor: 2592000 },
            'year': { name: 'Year (365 days)', factor: 31536000 }
        }
    },
    
    // 20. TYPOGRAPHY
    {
        id: 'typography',
        title: 'Typography Converter',
        description: 'Convert between px, rem, and em (base: 16px)',
        keywords: ['typography', 'px', 'rem', 'em', 'pixel', 'font', 'size'],
        type: 'typography'
    },
    
    // 21. ROMAN NUMERALS
    {
        id: 'roman-numerals',
        title: 'Roman Numerals Converter',
        description: 'Convert between Roman numerals and decimal numbers',
        keywords: ['roman', 'numeral', 'decimal', 'number', 'i', 'v', 'x', 'l', 'c', 'd', 'm'],
        type: 'roman-numerals'
    },
    
    // 22. SPEED
    {
        id: 'speed',
        title: 'Speed Converter',
        description: 'Convert between m/s, km/h, mph, and knots',
        keywords: ['speed', 'velocity', 'meter', 'kilometer', 'mile', 'hour', 'knot', 'mph', 'kmh'],
        type: 'standard',
        units: {
            'meter-sec': { name: 'Meter/second (m/s)', factor: 1 },
            'kilometer-hour': { name: 'Kilometer/hour (km/h)', factor: 0.277778 },
            'mile-hour': { name: 'Mile/hour (mph)', factor: 0.44704 },
            'knot': { name: 'Knot', factor: 0.514444 }
        }
    },
    
    // 23. RADIATION
    {
        id: 'radiation',
        title: 'Radiation Converter',
        description: 'Convert between Gray, Sievert, Rad, and Rem',
        keywords: ['radiation', 'gray', 'sievert', 'rad', 'rem'],
        type: 'standard',
        units: {
            'gray': { name: 'Gray (Gy)', factor: 1 },
            'sievert': { name: 'Sievert (Sv)', factor: 1 },
            'rad': { name: 'Rad', factor: 0.01 },
            'rem': { name: 'Rem', factor: 0.01 }
        }
    },
    
    // 24. COLOR
    {
        id: 'color',
        title: 'Color Converter',
        description: 'Convert between HEX, RGB, and HSL with color preview',
        keywords: ['color', 'hex', 'rgb', 'hsl', 'colour'],
        type: 'color'
    },
    
    // 25. NUMERALS
    {
        id: 'numerals',
        title: 'Numerals Converter',
        description: 'Convert between English words and numeric values (e.g., "One" ↔ 1)',
        keywords: ['numeral', 'word', 'number', 'english', 'text', 'numeric'],
        type: 'numerals'
    },
    
    // 26. MORSE CODE
    {
        id: 'morse-code',
        title: 'Morse Code Converter',
        description: 'Convert between text and Morse code',
        keywords: ['morse', 'code', 'text', 'dot', 'dash'],
        type: 'morse-code'
    },
    
    // 27. FREQUENCY
    {
        id: 'frequency',
        title: 'Frequency Converter',
        description: 'Convert between Hertz, Kilohertz, Megahertz, and Gigahertz',
        keywords: ['frequency', 'hertz', 'kilohertz', 'megahertz', 'gigahertz', 'hz', 'khz', 'mhz', 'ghz'],
        type: 'standard',
        units: {
            'hertz': { name: 'Hertz (Hz)', factor: 1 },
            'kilohertz': { name: 'Kilohertz (kHz)', factor: 1000 },
            'megahertz': { name: 'Megahertz (MHz)', factor: 1000000 },
            'gigahertz': { name: 'Gigahertz (GHz)', factor: 1000000000 }
        }
    }
];

// Morse Code Dictionary
const MORSE_CODE_MAP = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
};

// Number Words
const NUMBER_WORDS = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen',
    20: 'twenty', 30: 'thirty', 40: 'forty', 50: 'fifty',
    60: 'sixty', 70: 'seventy', 80: 'eighty', 90: 'ninety',
    100: 'hundred', 1000: 'thousand', 1000000: 'million', 1000000000: 'billion'
};
