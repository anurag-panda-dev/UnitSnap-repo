// ========================================
// CONVERSION LOGIC
// ========================================

/**
 * Standard unit conversion using conversion factors
 */
function convertStandard(value, fromUnit, toUnit, units) {
    if (!units[fromUnit] || !units[toUnit]) {
        return null;
    }
    
    // Convert to base unit, then to target unit
    const baseValue = value * units[fromUnit].factor;
    const result = baseValue / units[toUnit].factor;
    
    return result;
}

/**
 * Temperature conversion
 */
function convertTemperature(value, fromUnit, toUnit) {
    let celsius;
    
    // Convert to Celsius first
    switch(fromUnit) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
        default:
            return null;
    }
    
    // Convert from Celsius to target
    switch(toUnit) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return (celsius * 9/5) + 32;
        case 'kelvin':
            return celsius + 273.15;
        default:
            return null;
    }
}

/**
 * Number base conversion
 */
function convertNumberBase(value, fromBase, toBase) {
    try {
        let decimal;
        
        // Convert to decimal
        switch(fromBase) {
            case 'decimal':
                decimal = parseInt(value, 10);
                break;
            case 'binary':
                decimal = parseInt(value, 2);
                break;
            case 'hexadecimal':
                decimal = parseInt(value, 16);
                break;
            default:
                return null;
        }
        
        if (isNaN(decimal)) return null;
        
        // Convert from decimal to target
        switch(toBase) {
            case 'decimal':
                return decimal.toString();
            case 'binary':
                return decimal.toString(2);
            case 'hexadecimal':
                return decimal.toString(16).toUpperCase();
            default:
                return null;
        }
    } catch (error) {
        return null;
    }
}

/**
 * Fuel economy conversion
 */
function convertFuelEconomy(value, fromUnit, toUnit) {
    if (value <= 0) return null;
    
    let kmPerLiter;
    
    // Convert to km/L first
    switch(fromUnit) {
        case 'km-per-liter':
            kmPerLiter = value;
            break;
        case 'mpg-us':
            kmPerLiter = value * 0.425144;
            break;
        case 'mpg-uk':
            kmPerLiter = value * 0.354006;
            break;
        case 'liter-per-100km':
            kmPerLiter = 100 / value;
            break;
        default:
            return null;
    }
    
    // Convert to target unit
    switch(toUnit) {
        case 'km-per-liter':
            return kmPerLiter;
        case 'mpg-us':
            return kmPerLiter / 0.425144;
        case 'mpg-uk':
            return kmPerLiter / 0.354006;
        case 'liter-per-100km':
            return 100 / kmPerLiter;
        default:
            return null;
    }
}

/**
 * Typography conversion (px, rem, em)
 */
function convertTypography(value, fromUnit, toUnit, baseFontSize = 16) {
    let pixels;
    
    // Convert to pixels first
    switch(fromUnit) {
        case 'px':
            pixels = value;
            break;
        case 'rem':
            pixels = value * baseFontSize;
            break;
        case 'em':
            pixels = value * baseFontSize;
            break;
        default:
            return null;
    }
    
    // Convert to target unit
    switch(toUnit) {
        case 'px':
            return pixels;
        case 'rem':
            return pixels / baseFontSize;
        case 'em':
            return pixels / baseFontSize;
        default:
            return null;
    }
}

/**
 * Roman numerals conversion
 */
function decimalToRoman(num) {
    if (num <= 0 || num >= 4000) return null;
    
    const romanMap = [
        [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
        [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
        [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    
    let result = '';
    for (const [value, symbol] of romanMap) {
        while (num >= value) {
            result += symbol;
            num -= value;
        }
    }
    return result;
}

function romanToDecimal(roman) {
    const romanMap = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    let result = 0;
    
    for (let i = 0; i < roman.length; i++) {
        const current = romanMap[roman[i]];
        const next = romanMap[roman[i + 1]];
        
        if (next && current < next) {
            result -= current;
        } else {
            result += current;
        }
    }
    
    return result;
}

/**
 * Text case conversion
 */
function convertTextCase(text, caseType) {
    switch(caseType) {
        case 'uppercase':
            return text.toUpperCase();
        case 'lowercase':
            return text.toLowerCase();
        case 'title':
            return text.replace(/\w\S*/g, txt => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        case 'sentence':
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        default:
            return text;
    }
}

/**
 * Base64 encoding/decoding
 */
function encodeBase64(text) {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
        return null;
    }
}

function decodeBase64(encoded) {
    try {
        return decodeURIComponent(escape(atob(encoded)));
    } catch (error) {
        return null;
    }
}

/**
 * URL encoding/decoding
 */
function encodeURL(text) {
    try {
        return encodeURIComponent(text);
    } catch (error) {
        return null;
    }
}

function decodeURL(encoded) {
    try {
        return decodeURIComponent(encoded);
    } catch (error) {
        return null;
    }
}

/**
 * Color conversion utilities
 */
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return isNaN(r) || isNaN(g) || isNaN(b) ? null : { r, g, b };
}

function rgbToHex(r, g, b) {
    const toHex = (n) => {
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch(max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

/**
 * Morse code conversion
 */
function textToMorse(text) {
    return text.toUpperCase()
        .split('')
        .map(char => MORSE_CODE_MAP[char] || '')
        .join(' ')
        .trim();
}

function morseToText(morse) {
    const reversedMap = {};
    for (const [key, value] of Object.entries(MORSE_CODE_MAP)) {
        reversedMap[value] = key;
    }
    
    return morse.split(' ')
        .map(code => reversedMap[code] || '')
        .join('');
}

/**
 * Number to words conversion
 */
function numberToWords(num) {
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + numberToWords(Math.abs(num));
    if (num >= 1000000000) return 'Number too large';
    
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    
    function convertChunk(n) {
        if (n === 0) return '';
        if (n < 10) return ones[n];
        if (n < 20) return teens[n - 10];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
        return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + convertChunk(n % 100) : '');
    }
    
    let result = '';
    
    if (num >= 1000000) {
        result += convertChunk(Math.floor(num / 1000000)) + ' million ';
        num %= 1000000;
    }
    if (num >= 1000) {
        result += convertChunk(Math.floor(num / 1000)) + ' thousand ';
        num %= 1000;
    }
    if (num > 0) {
        result += convertChunk(num);
    }
    
    return result.trim();
}

function wordsToNumber(words) {
    const wordMap = {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
        'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
        'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
        'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
        'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
        'hundred': 100, 'thousand': 1000, 'million': 1000000
    };
    
    words = words.toLowerCase().trim();
    const parts = words.split(/\s+/);
    let result = 0;
    let current = 0;
    
    for (const part of parts) {
        const num = wordMap[part];
        if (num === undefined) return null;
        
        if (num >= 1000) {
            result += current * num;
            current = 0;
        } else if (num === 100) {
            current *= num;
        } else {
            current += num;
        }
    }
    
    return result + current;
}

/**
 * Format number with precision
 */
function formatNumber(num, precision = 6) {
    if (num === null || isNaN(num)) return '';
    
    // Remove trailing zeros
    let formatted = parseFloat(num.toPrecision(precision));
    
    // Format large numbers
    if (Math.abs(formatted) >= 1000000) {
        return formatted.toExponential(3);
    }
    
    return formatted.toString();
}

/**
 * Validate numeric input
 */
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
