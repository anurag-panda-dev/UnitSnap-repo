// ========================================
// UI RENDERING & DOM MANIPULATION
// ========================================

let allConverters = [];
let currentTheme = 'light';
let currentConverter = null;
let conversionHistory = [];

// Converter icon mapping
const CONVERTER_ICONS = {
    'angle': { icon: '📐', color: 'icon-purple' },
    'area': { icon: '⬜', color: 'icon-blue' },
    'length': { icon: '📏', color: 'icon-blue' },
    'data-storage': { icon: '💾', color: 'icon-gray' },
    'temperature': { icon: '🌡️', color: 'icon-red' },
    'cooking': { icon: '🍴', color: 'icon-orange' },
    'currency': { icon: '💵', color: 'icon-green' },
    'weight': { icon: '⚖️', color: 'icon-indigo' },
    'number-base': { icon: '🔢', color: 'icon-gray' },
    'energy': { icon: '⚡', color: 'icon-orange' },
    'fuel-economy': { icon: '⛽', color: 'icon-green' },
    'power': { icon: '🔌', color: 'icon-orange' },
    'torque': { icon: '🔧', color: 'icon-gray' },
    'text-case': { icon: 'Aa', color: 'icon-blue' },
    'encoding': { icon: '🔐', color: 'icon-indigo' },
    'flow-rate': { icon: '💧', color: 'icon-cyan' },
    'time': { icon: '⏰', color: 'icon-blue' },
    'typography': { icon: 'Tt', color: 'icon-pink' },
    'roman-numerals': { icon: 'Ⅻ', color: 'icon-purple' },
    'speed': { icon: '🏃', color: 'icon-cyan' },
    'radiation': { icon: '☢️', color: 'icon-red' },
    'color': { icon: '🎨', color: 'icon-pink' },
    'numerals': { icon: '#', color: 'icon-indigo' },
    'morse-code': { icon: '•−', color: 'icon-gray' },
    'frequency': { icon: '📡', color: 'icon-purple' },
    'transfer-rate': { icon: '📶', color: 'icon-cyan' },
    'pressure': { icon: '🌊', color: 'icon-blue' }
};

/**
 * Initialize the UI
 */
function initUI() {
    allConverters = [...CONVERTERS_DATA];
    renderConverterCards();
    setupSearchListener();
    setupThemeToggle();
    setupModalListeners();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('unitmaster-theme') || 'light';
    applyTheme(savedTheme);
    
    // Load history
    loadHistory();
}

/**
 * Render converter cards in grid
 */
function renderConverterCards() {
    const grid = document.getElementById('convertersGrid');
    grid.innerHTML = '';
    
    allConverters.forEach(converter => {
        const card = createConverterCard(converter);
        grid.appendChild(card);
    });
}

/**
 * Create a converter card element
 */
function createConverterCard(converter) {
    const card = document.createElement('div');
    card.className = 'converter-card';
    card.dataset.converterId = converter.id;
    card.dataset.keywords = converter.keywords.join(' ').toLowerCase();
    
    const iconData = CONVERTER_ICONS[converter.id] || { icon: '🔄', color: 'icon-blue' };
    
    // Favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.innerHTML = '⭐';
    favoriteBtn.setAttribute('aria-label', 'Add to favorites');
    favoriteBtn.onclick = (e) => {
        e.stopPropagation();
        favoriteBtn.classList.toggle('active');
    };
    
    // Icon
    const icon = document.createElement('div');
    icon.className = `converter-icon ${iconData.color}`;
    icon.textContent = iconData.icon;
    
    // Title
    const title = document.createElement('h3');
    title.className = 'converter-card-title';
    title.textContent = converter.title.replace(' Converter', '').replace(' (Approx)', '');
    
    card.appendChild(favoriteBtn);
    card.appendChild(icon);
    card.appendChild(title);
    
    // Click to open modal
    card.onclick = () => openConverterModal(converter);
    
    return card;
}

/**
 * Open converter modal popup
 */
function openConverterModal(converter) {
    currentConverter = converter;
    const modal = document.getElementById('converterModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalIcon = document.getElementById('modalIcon');
    const modalBody = document.getElementById('modalBody');
    
    // Set title and icon
    const iconData = CONVERTER_ICONS[converter.id] || { icon: '🔄', color: 'icon-blue' };
    modalTitle.textContent = converter.title.replace(' Converter', '');
    modalIcon.className = `modal-icon ${iconData.color}`;
    modalIcon.textContent = iconData.icon;
    
    // Render converter form
    modalBody.innerHTML = getConverterFormHTML(converter);
    
    // Setup form listeners
    setupConverterFormListeners(converter);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close converter modal
 */
function closeConverterModal() {
    const modal = document.getElementById('converterModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentConverter = null;
}

/**
 * Generate converter form HTML based on type
 */
function getConverterFormHTML(converter) {
    switch(converter.type) {
        case 'standard':
            return getStandardFormHTML(converter);
        case 'temperature':
            return getTemperatureFormHTML();
        case 'number-base':
            return getNumberBaseFormHTML();
        case 'fuel-economy':
            return getFuelEconomyFormHTML();
        case 'typography':
            return getTypographyFormHTML();
        case 'roman-numerals':
            return getRomanNumeralsFormHTML();
        case 'text-case':
            return getTextCaseFormHTML();
        case 'encoding':
            return getEncodingFormHTML();
        case 'color':
            return getColorFormHTML();
        case 'numerals':
            return getNumeralsFormHTML();
        case 'morse-code':
            return getMorseCodeFormHTML();
        default:
            return '<p>Converter not implemented</p>';
    }
}

/**
 * Standard converter form HTML
 */
function getStandardFormHTML(converter) {
    const units = Object.keys(converter.units);
    const unitOptions = units.map(key => 
        `<option value="${key}">${converter.units[key].name}</option>`
    ).join('');
    
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">FROM (TYPE MATH: 2*PI)</label>
                <input type="number" class="form-input from-value" placeholder="1" value="1" step="any" autofocus>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <select class="form-select from-unit">${unitOptions}</select>
                </div>
            </div>
            
            <div class="swap-btn-container">
                <button class="swap-btn" title="Swap units">⇅</button>
            </div>
            
            <div class="form-group">
                <label class="form-label">TO</label>
                <select class="form-select to-unit">${unitOptions}</select>
            </div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy
                    </button>
                    <button class="result-btn speak-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>
                        </svg>
                        Speak
                    </button>
                    <button class="result-btn use-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        Use
                    </button>
                </div>
                <div class="conversion-info" id="conversionInfo" style="display: none;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 16v-4M12 8h.01" stroke="white" stroke-width="2"/>
                    </svg>
                    <span id="conversionText"></span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Temperature form HTML
 */
function getTemperatureFormHTML() {
    return getStandardFormHTML({
        units: {
            'celsius': { name: 'Celsius (°C)' },
            'fahrenheit': { name: 'Fahrenheit (°F)' },
            'kelvin': { name: 'Kelvin (K)' }
        }
    });
}

/**
 * Number base form HTML
 */
function getNumberBaseFormHTML() {
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">FROM</label>
                <input type="text" class="form-input from-value" placeholder="Enter number" value="1" autofocus>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <select class="form-select from-unit">
                        <option value="decimal">Decimal</option>
                        <option value="binary">Binary</option>
                        <option value="hexadecimal">Hexadecimal</option>
                    </select>
                </div>
            </div>
            
            <div class="swap-btn-container">
                <button class="swap-btn">⇅</button>
            </div>
            
            <div class="form-group">
                <label class="form-label">TO</label>
                <select class="form-select to-unit">
                    <option value="decimal">Decimal</option>
                    <option value="binary" selected>Binary</option>
                    <option value="hexadecimal">Hexadecimal</option>
                </select>
            </div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">📋 Copy</button>
                    <button class="result-btn use-btn">→ Use</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Other form HTML generators
 */
function getFuelEconomyFormHTML() { 
    return getStandardFormHTML({ 
        units: { 
            'km-per-liter': { name: 'km/L' }, 
            'mpg-us': { name: 'MPG (US)' }, 
            'mpg-uk': { name: 'MPG (UK)' }, 
            'liter-per-100km': { name: 'L/100km' } 
        } 
    }); 
}

function getTypographyFormHTML() { 
    return getStandardFormHTML({ 
        units: { 
            'px': { name: 'Pixels (px)' }, 
            'rem': { name: 'REM' }, 
            'em': { name: 'EM' } 
        } 
    }) + '<div class="form-group"><label class="form-label">Base Font Size</label><input type="number" class="form-input base-font-size" value="16" min="1"></div>'; 
}

function getRomanNumeralsFormHTML() { 
    return getStandardFormHTML({ 
        units: { 
            'decimal': { name: 'Decimal (1-3999)' }, 
            'roman': { name: 'Roman Numeral' } 
        } 
    }).replace('type="number"', 'type="text"'); 
}

function getTextCaseFormHTML() { 
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">INPUT TEXT</label>
                <textarea class="form-textarea from-value" placeholder="Enter text to convert" autofocus></textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">CONVERT TO</label>
                <select class="form-select to-unit">
                    <option value="uppercase">UPPERCASE</option>
                    <option value="lowercase">lowercase</option>
                    <option value="title">Title Case</option>
                    <option value="sentence">Sentence case</option>
                </select>
            </div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">📋 Copy</button>
                </div>
            </div>
        </div>
    `;
}

function getEncodingFormHTML() { 
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">INPUT TEXT</label>
                <textarea class="form-textarea from-value" placeholder="Enter text to encode/decode" autofocus></textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">ENCODING TYPE</label>
                <select class="form-select to-unit">
                    <option value="base64-encode">Base64 Encode</option>
                    <option value="base64-decode">Base64 Decode</option>
                    <option value="url-encode">URL Encode</option>
                    <option value="url-decode">URL Decode</option>
                </select>
            </div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">📋 Copy</button>
                </div>
            </div>
        </div>
    `;
}

function getColorFormHTML() { 
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">INPUT COLOR</label>
                <input type="text" class="form-input from-value" placeholder="e.g., #FF5733 or rgb(255,87,51)" value="#5B7FFF" autofocus>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">INPUT FORMAT</label>
                    <select class="form-select from-unit">
                        <option value="hex">HEX (#RRGGBB)</option>
                        <option value="rgb">RGB (r, g, b)</option>
                        <option value="hsl">HSL (h, s%, l%)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">OUTPUT FORMAT</label>
                    <select class="form-select to-unit">
                        <option value="hex">HEX</option>
                        <option value="rgb" selected>RGB</option>
                        <option value="hsl">HSL</option>
                    </select>
                </div>
            </div>
            
            <div class="color-preview-large" id="colorPreview"></div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">📋 Copy</button>
                </div>
            </div>
        </div>
    `;
}

function getNumeralsFormHTML() { 
    return getStandardFormHTML({ 
        units: { 
            'number': { name: 'Number' }, 
            'words': { name: 'Words' } 
        } 
    }).replace('type="number"', 'type="text"'); 
}

function getMorseCodeFormHTML() { 
    return `
        <div class="converter-form">
            <div class="form-group">
                <label class="form-label">INPUT</label>
                <textarea class="form-textarea from-value" placeholder="Enter text or morse code" autofocus></textarea>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">FROM TYPE</label>
                    <select class="form-select from-unit">
                        <option value="text">Text</option>
                        <option value="morse">Morse Code</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">TO TYPE</label>
                    <select class="form-select to-unit">
                        <option value="text">Text</option>
                        <option value="morse" selected>Morse Code</option>
                    </select>
                </div>
            </div>
            
            <div class="result-section">
                <div class="result-label">RESULT</div>
                <div class="result-value" id="resultValue">—</div>
                <div class="result-actions">
                    <button class="result-btn copy-btn">📋 Copy</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Setup converter form listeners
 */
function setupConverterFormListeners(converter) {
    const fromValue = document.querySelector('.from-value');
    const fromUnit = document.querySelector('.from-unit');
    const toUnit = document.querySelector('.to-unit');
    const resultValue = document.getElementById('resultValue');
    const swapBtn = document.querySelector('.swap-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const speakBtn = document.querySelector('.speak-btn');
    const useBtn = document.querySelector('.use-btn');
    
    // Perform conversion
    const performConversion = () => {
        const value = fromValue.value.trim();
        if (!value) {
            resultValue.textContent = '—';
            updateQuickCompare([]);
            return;
        }
        
        let result = null;
        let quickCompareValues = [];
        
        switch(converter.type) {
            case 'standard':
                if (isValidNumber(value)) {
                    result = convertStandard(parseFloat(value), fromUnit.value, toUnit.value, converter.units);
                    result = formatNumber(result);
                    quickCompareValues = generateQuickCompare(parseFloat(value), fromUnit.value, converter.units);
                }
                break;
                
            case 'temperature':
                if (isValidNumber(value)) {
                    result = convertTemperature(parseFloat(value), fromUnit.value, toUnit.value);
                    result = formatNumber(result);
                }
                break;
                
            case 'number-base':
                result = convertNumberBase(value, fromUnit.value, toUnit.value);
                break;
                
            case 'fuel-economy':
                if (isValidNumber(value)) {
                    result = convertFuelEconomy(parseFloat(value), fromUnit.value, toUnit.value);
                    result = formatNumber(result);
                }
                break;
                
            case 'typography':
                const baseFontSize = parseFloat(document.querySelector('.base-font-size')?.value) || 16;
                if (isValidNumber(value)) {
                    result = convertTypography(parseFloat(value), fromUnit.value, toUnit.value, baseFontSize);
                    result = formatNumber(result);
                }
                break;
                
            case 'roman-numerals':
                if (fromUnit.value === 'decimal' && toUnit.value === 'roman') {
                    result = decimalToRoman(parseInt(value));
                } else if (fromUnit.value === 'roman' && toUnit.value === 'decimal') {
                    result = romanToDecimal(value.toUpperCase());
                } else {
                    result = value;
                }
                break;
                
            case 'text-case':
                result = convertTextCase(value, toUnit.value);
                break;
                
            case 'encoding':
                switch(toUnit.value) {
                    case 'base64-encode': result = encodeBase64(value); break;
                    case 'base64-decode': result = decodeBase64(value); break;
                    case 'url-encode': result = encodeURL(value); break;
                    case 'url-decode': result = decodeURL(value); break;
                }
                break;
                
            case 'color':
                result = convertColor(value, fromUnit.value, toUnit.value);
                break;
                
            case 'numerals':
                if (fromUnit.value === 'number' && toUnit.value === 'words') {
                    result = numberToWords(parseInt(value));
                } else if (fromUnit.value === 'words' && toUnit.value === 'number') {
                    result = wordsToNumber(value);
                } else {
                    result = value;
                }
                break;
                
            case 'morse-code':
                if (fromUnit.value === 'text' && toUnit.value === 'morse') {
                    result = textToMorse(value);
                } else if (fromUnit.value === 'morse' && toUnit.value === 'text') {
                    result = morseToText(value);
                } else {
                    result = value;
                }
                break;
        }
        
        resultValue.textContent = result !== null ? result : 'Invalid input';
        
        // Update conversion info
        if (result && result !== 'Invalid input' && converter.units) {
            updateConversionInfo(value, fromUnit?.value, result, toUnit?.value, converter);
            addToHistory(converter.title, value, fromUnit?.value || '', result, toUnit?.value || '');
        }
        
        // Update quick compare
        if (quickCompareValues.length > 0) {
            updateQuickCompare(quickCompareValues);
        }
    };
    
    // Add event listeners
    fromValue.addEventListener('input', performConversion);
    if (fromUnit) fromUnit.addEventListener('change', performConversion);
    if (toUnit) toUnit.addEventListener('change', performConversion);
    
    const baseFontSize = document.querySelector('.base-font-size');
    if (baseFontSize) baseFontSize.addEventListener('input', performConversion);
    
    // Swap button
    if (swapBtn && fromUnit && toUnit) {
        swapBtn.onclick = () => {
            const temp = fromUnit.value;
            fromUnit.value = toUnit.value;
            toUnit.value = temp;
            performConversion();
        };
    }
    
    // Copy button
    if (copyBtn) {
        copyBtn.onclick = () => {
            const text = resultValue.textContent;
            if (text && text !== '—' && text !== 'Invalid input') {
                navigator.clipboard.writeText(text).then(() => {
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = '✅ Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        };
    }
    
    // Speak button
    if (speakBtn) {
        speakBtn.onclick = () => {
            const text = resultValue.textContent;
            if (text && text !== '—' && text !== 'Invalid input' && 'speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                speechSynthesis.speak(utterance);
            }
        };
    }
    
    // Use button
    if (useBtn) {
        useBtn.onclick = () => {
            const text = resultValue.textContent;
            if (text && text !== '—' && text !== 'Invalid input') {
                fromValue.value = text;
                performConversion();
            }
        };
    }
    
    // Initial conversion
    performConversion();
}

/**
 * Generate quick compare values
 */
function generateQuickCompare(value, fromUnit, units) {
    const compareUnits = Object.keys(units).slice(0, 3).filter(u => u !== fromUnit);
    return compareUnits.map(unit => {
        const result = convertStandard(value, fromUnit, unit, units);
        return {
            unit: units[unit].name,
            value: formatNumber(result)
        };
    });
}

/**
 * Update quick compare sidebar
 */
function updateQuickCompare(values) {
    const quickCompare = document.getElementById('quickCompare');
    if (!quickCompare) return;
    
    if (values.length === 0) {
        quickCompare.innerHTML = '<div class="empty-state">Convert a value to see quick comparisons</div>';
        return;
    }
    
    quickCompare.innerHTML = values.map(item => `
        <div class="compare-item">
            <span class="compare-unit">${item.unit}</span>
            <span class="compare-value">${item.value}</span>
        </div>
    `).join('');
}

/**
 * Update conversion info
 */
function updateConversionInfo(fromValue, fromUnit, toValue, toUnit, converter) {
    const info = document.getElementById('conversionInfo');
    const text = document.getElementById('conversionText');
    if (!info || !text) return;
    
    const fromUnitName = converter.units?.[fromUnit]?.name || fromUnit;
    const toUnitName = converter.units?.[toUnit]?.name || toUnit;
    
    text.textContent = `${fromValue} ${fromUnitName} = ${toValue} ${toUnitName}`;
    info.style.display = 'flex';
}

/**
 * Color conversion with preview
 */
function convertColor(value, fromFormat, toFormat) {
    const preview = document.getElementById('colorPreview');
    let rgb = null;
    
    try {
        if (fromFormat === 'hex') {
            rgb = hexToRgb(value);
        } else if (fromFormat === 'rgb') {
            const match = value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
            if (match) {
                rgb = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
            }
        } else if (fromFormat === 'hsl') {
            const match = value.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
            if (match) {
                rgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
            }
        }
        
        if (!rgb) return null;
        
        if (preview) {
            preview.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }
        
        if (toFormat === 'hex') {
            return rgbToHex(rgb.r, rgb.g, rgb.b);
        } else if (toFormat === 'rgb') {
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        } else if (toFormat === 'hsl') {
            const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
            return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }
    } catch (error) {
        return null;
    }
}

/**
 * Add to history
 */
function addToHistory(converterName, fromValue, fromUnit, toValue, toUnit) {
    const historyItem = {
        converter: converterName.replace(' Converter', ''),
        from: `${fromValue} ${fromUnit}`,
        to: `${toValue} ${toUnit}`,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    conversionHistory.unshift(historyItem);
    if (conversionHistory.length > 10) conversionHistory.pop();
    
    saveHistory();
    renderHistory();
}

/**
 * Render history
 */
function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-state">No conversion history yet</div>';
        return;
    }
    
    historyList.innerHTML = conversionHistory.map((item, index) => `
        <div class="history-item" data-index="${index}">
            <div class="history-time">${item.time}</div>
            <div class="history-conversion"><strong>${item.converter}</strong><br>${item.from} → ${item.to}</div>
        </div>
    `).join('');
}

/**
 * Save/load history
 */
function saveHistory() {
    localStorage.setItem('unitmaster-history', JSON.stringify(conversionHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('unitmaster-history');
    if (saved) {
        try {
            conversionHistory = JSON.parse(saved);
            renderHistory();
        } catch (e) {
            conversionHistory = [];
        }
    }
}

/**
 * Setup modal listeners
 */
function setupModalListeners() {
    const modal = document.getElementById('converterModal');
    const overlay = document.querySelector('.modal-overlay');
    const backBtn = document.getElementById('backBtn');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const exportCsvBtn = document.getElementById('exportCsv');
    
    if (backBtn) {
        backBtn.onclick = closeConverterModal;
    }
    
    if (overlay) {
        overlay.onclick = closeConverterModal;
    }
    
    if (clearHistoryBtn) {
        clearHistoryBtn.onclick = () => {
            conversionHistory = [];
            saveHistory();
            renderHistory();
        };
    }
    
    if (exportCsvBtn) {
        exportCsvBtn.onclick = () => {
            const csv = 'Converter,From,To,Time\n' + 
                conversionHistory.map(item => 
                    `"${item.converter}","${item.from}","${item.to}","${item.time}"`
                ).join('\n');
            
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'conversion-history.csv';
            a.click();
        };
    }
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeConverterModal();
        }
    });
}

/**
 * Setup search functionality
 */
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.converter-card');
        let visibleCount = 0;
        
        cards.forEach(card => {
            const keywords = card.dataset.keywords;
            const title = card.querySelector('.converter-card-title').textContent.toLowerCase();
            
            if (keywords.includes(query) || title.includes(query) || query === '') {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
}

/**
 * Setup theme toggle
 */
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });
}

/**
 * Apply theme
 */
function applyTheme(theme) {
    currentTheme = theme;
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    localStorage.setItem('unitmaster-theme', theme);
}
