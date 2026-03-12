const guessList = document.getElementById("guess-list");

const annoyingText = document.getElementById("annoyingText");

const resetButton = document.getElementById("reset");

const searchInput = document.getElementById("search");
const searchList = document.getElementById("search-list");

const canvas = document.getElementById("canvas");
const renderContext = canvas.getContext("2d");

const canvas1 = document.createElement("canvas");
const answerContext = canvas1.getContext("2d");

const canvas2 = document.createElement("canvas");
const guessContext = canvas2.getContext("2d");

canvas.width = 512;
canvas.height = 512;

canvas1.width = canvas.width;
canvas1.height = canvas.height;

canvas2.width = canvas.width;
canvas2.height = canvas.height;

const searchElements = {}

const continents = {
    1: "Africa",
    2: "Asia",
    3: "Europe",
    4: "North America",
    5: "South America",
    6: "Oceania",
    7: "Antarctica",
    8: "Europe-Asia",
    9: "Africa-Asia",
    10: "Asia-Oceania",
    11: "Africa-Oceania",
    12: "Africa-South America",
    13: "North America-Oceania"
}

// UN members + UN observer states
const countriesList = {
    "dz": [1, "Algeria", "People's Democratic Republic of Algeria"],
    "ao": [1, "Angola", "Republic of Angola"],
    "bj": [1, "Benin", "Republic of Benin"],
    "bw": [1, "Botswana", "Republic of Botswana"],
    "bf": [1, "Burkina Faso"],
    "bi": [1, "Burundi", "Republic of Burundi"],
    "cm": [1, "Cameroon", "Republic of Cameroon"],
    "cv": [1, "Cape Verde", "Republic of Cabo Verde", "Cabo Verde"],
    "cf": [1, "Central African Republic", "CAR"],
    "td": [1, "Chad", "Republic of Chad", "Lookalikes"],
    "km": [1, "Comoros", "Union of the Comoros"],
    "cd": [1, "Democratic Republic of the Congo", "DR Congo", "Congo-Kinshasa"],
    "cg": [1, "Republic of the Congo", "Congo-Brazzaville", "Congo"],
    "dj": [1, "Djibouti", "Republic of Djibouti"],
    "gq": [1, "Equatorial Guinea", "Republic of Equatorial Guinea"],
    "er": [1, "Eritrea", "State of Eritrea"],
    "sz": [1, "Eswatini", "Kingdom of Eswatini", "Swaziland"],
    "et": [1, "Ethiopia", "Federal Democratic Republic of Ethiopia"],
    "ga": [1, "Gabon", "Gabonese Republic"],
    "gm": [1, "Gambia", "Republic of the Gambia"],
    "gh": [1, "Ghana", "Republic of Ghana"],
    "gn": [1, "Guinea", "Republic of Guinea"],
    "gw": [1, "Guinea-Bissau", "Republic of Guinea-Bissau"],
    "ci": [1, "Côte d'Ivoire", "Republuc of Côte d'Ivoire", "Ivory Coast"],
    "ke": [1, "Kenya", "Republic of Kenya"],
    "ls": [1, "Lesotho", "Kingdom of Lesotho"],
    "lr": [1, "Liberia", "Republic of Liberia"],
    "ly": [1, "Libya", "State of Libya"],
    "mg": [1, "Madagascar", "Republic of Madagascar"],
    "mw": [1, "Malawi", "Republic of Malawi"],
    "ml": [1, "Mali", "Republic of Mali", "Lookalikes"],
    "mr": [1, "Mauritania", "Islamic Republic of Mauritania"],
    "mu": [1, "Mauritius", "Republic of Mauritius"],
    "ma": [1, "Morocco", "Kingdom of Morocco"],
    "mz": [1, "Mozambique", "Republic of Mozambique"],
    "na": [1, "Namibia", "Republic of Namibia"],
    "ne": [1, "Niger", "Republic of the Niger"],
    "ng": [1, "Nigeria", "Federal Republic of Nigeria"],
    "rw": [1, "Rwanda", "Republic of Rwanda"],
    "st": [1, "São Tomé and Príncipe", "Democratic Republic of São Tomé and Príncipe"],
    "sn": [1, "Senegal", "Republic of Senegal", "Lookalikes"],
    "sc": [1, "Seychelles", "Republic of Seychelles"],
    "sl": [1, "Sierra Leone", "Republic of Sierra Leone"],
    "so": [1, "Somalia", "Federal Republic of Somalia"],
    "za": [1, "South Africa", "Republic of South Africa"],
    "ss": [1, "South Sudan", "Republic of South Sudan"],
    "sd": [1, "Sudan", "Republic of the Sudan"],
    "tz": [1, "Tanzania", "United Republic of Tanzania"],
    "tg": [1, "Togo", "Togolese Republic"],
    "tn": [1, "Tunisia", "Republic of Tunisia"],
    "ug": [1, "Uganda", "Republic of Uganda"],
    "zm": [1, "Zambia", "Republic of Zambia"],
    "zw": [1, "Zimbabwe", "Republic of Zimbabwe"],

    "af": [2, "Afghanistan", "Islamic Emirate of Afghanistan", "Islamic Republic of Afghanistan"],
    "bh": [2, "Bahrain", "Kingdom of Bahrain"],
    "bd": [2, "Bangladesh", "People's Republic of Bangladesh"],
    "bt": [2, "Bhutan", "Kingdom of Bhutan"],
    "bn": [2, "Brunei", "Brunei Darussalam"],
    "kh": [2, "Cambodia", "Kingdom of Cambodia"],
    "cn": [2, "China", "People's Republic of China"],
    "tl": [2, "East Timor", "Democratic Republic of Timor-Leste", "Timor-Leste"],
    "in": [2, "India", "Republic of India"],
    "ir": [2, "Iran", "Islamic Republic of Iran"],
    "iq": [2, "Iraq", "Republic of Iraq"],
    "il": [2, "Israel", "State of Israel"],
    "jp": [2, "Japan"],
    "jo": [2, "Jordan", "Hashemite Kingdom of Jordan"],
    "kp": [2, "North Korea", "Democratic People's Republic of Korea", "Korea"],
    "kr": [2, "South Korea", "Republic of Korea", "Korea"],
    "kw": [2, "Kuwait", "State of Kuwait"],
    "kg": [2, "Krygystan", "Kyrgyz Republic"],
    "la": [2, "Laos", "Lao People's Democratic Republic"],
    "lb": [2, "Lebanon", "Republic of Lebanon"],
    "my": [2, "Malaysia"],
    "mv": [2, "Maldives", "Republic of Maldives"],
    "mn": [2, "Mongolia"],
    "mm": [2, "Myanmar", "Republic of the Union of Myanmar", "Burma"],
    "np": [2, "Nepal", "Federal Democratic Republic of Nepal"],
    "om": [2, "Oman", "Sultanate of Oman"],
    "pk": [2, "Pakistan", "Islamic Republic of Pakistan"],
    "ps": [2, "Palestine", "State of Palestine"],
    "ph": [2, "Philippines", "Republic of the Philippines"],
    "qa": [2, "Qatar", "State of Qatar"],
    "sa": [2, "Saudi Arabia", "Kingdom of Saudi Arabia"],
    "sg": [2, "Singapore", "Republic of Singapore", "Lion City"],
    "lk": [2, "Sri Lanka", "Democratic Socialist Republic of Sri Lanka"],
    "sy": [2, "Syria", "Syrian Arab Republic"],

    "tw": [2, "Taiwan", "Republic of China", "Not a real country"],

    "tj": [2, "Tajikistan", "Republic of Tajikistan"],
    "th": [2, "Thailand", "Kingdom of Thailand"],
    "tm": [2, "Turkmenistan"],
    "ae": [2, "United Arab Emirates", "Emirates", "UAE"],
    "uz": [2, "Uzbekistan", "Republic of Uzbekistan"],
    "vn": [2, "Vietnam", "Socialist Republic of Vietnam", "SRV"],
    "ye": [2, "Yemen", "Republic of Yemen"],

    "al": [3, "Albania", "Republic of Albania"],
    "ad": [3, "Andorra", "Principality of Andorra"],
    "at": [3, "Austria", "Republic of Austria"],
    "by": [3, "Belarus", "Republic of Belarus"],
    "be": [3, "Belgium", "Kingdom of Belgium"],
    "ba": [3, "Bosnia and Herzegovina", "Bosnia-Herzegovina", "Bosnia"],
    "bg": [3, "Bulgaria", "Republic of Bulgaria"],
    "hr": [3, "Croatia", "Republic of Croatia"],
    "cz": [3, "Czech Republic", "Czechia"],
    "dk": [3, "Denmark", "Kingdom of Denmark"],
    "ee": [3, "Estonia", "Republic of Estonia"],
    "fi": [3, "Finland", "Republic of Finland"],
    "fr": [3, "France", "French Republic"],
    "de": [3, "Germany", "Federal Republic of Germany"],
    "gr": [3, "Greece", "Hellenic Republic"],
    "hu": [3, "Hungary"],
    "is": [3, "Iceland"],
    "ie": [3, "Ireland", "Republic of Ireland"],

    "xk": [3, "Kosovo", "Republic of Kosovo"],

    "lv": [3, "Latvia", "Republic of Latvia"],
    "li": [3, "Liechtenstein", "Principality of Liechtenstein"],
    "lt": [3, "Lithuania", "Republic of Lithuania"],
    "lu": [3, "Luxembourg", "Grand Duchy of Luxembourg", "Lookalikes"],
    "mt": [3, "Malta", "Republic of Malta"],
    "md": [3, "Moldova", "Republic of Moldova"],
    "mc": [3, "Monaco", "Principality of Monaco", "Lookalikes"],
    "me": [3, "Montenegro"],
    "nl": [3, "Netherlands", "Kingdom of the Netherlands", "Holland", "Lookalikes"],
    "mk": [3, "North Macedonia", "Republic of North Macedonia"],
    "no": [3, "Norway", "Kingdom of Norway"],
    "pl": [3, "Poland", "Republic of Poland"],
    "pt": [3, "Portugal", "Portugese Republic"],
    "ro": [3, "Romania", "Lookalikes"],
    "sm": [3, "San Marino", "Republic of San Marino"],
    "rs": [3, "Serbia", "Republic of Serbia"],
    "sk": [3, "Slovakia", "Slovak Republic"],
    "si": [3, "Slovenia", "Republic of Slovenia"],
    "es": [3, "Spain", "Kingdom of Spain"],
    "se": [3, "Sweden", "Kingdom of Sweden"],
    "ch": [3, "Switzerland", "Swiss Confederation"],
    "ua": [3, "Ukraine"],
    "gb": [3, "United Kingdom", "United Kingdom of Great Britain and Northern Ireland", "UK", "England", "Scotland", "Wales"],
    "va": [3, "Vatican City", "Vatican City State", "Holy See"],

    "ag": [4, "Antigua and Barbuda"],
    "bs": [4, "Bahamas", "Commonwealth of the Bahamas"],
    "bb": [4, "Barbados"],
    "bz": [4, "Belize"],
    "ca": [4, "Canada"],
    "cr": [4, "Costa Rica", "Republic of Costa Rica"],
    "cu": [4, "Cuba", "Republic of Cuba"],
    "dm": [4, "Dominica", "Commonwealth of Dominica"],
    "do": [4, "Dominican Republic"],
    "sv": [4, "El Salvador", "Republic of El Salvador"],
    "wg": [4, "Grenada"],
    "gt": [4, "Guatemala", "Republic of Guatemala"],
    "ht": [4, "Haiti", "Republic of Haiti"],
    "hn": [4, "Honduras", "Republic of Honduras"],
    "jm": [4, "Jamaica"],
    "mx": [4, "Mexico", "United Mexican States"],
    "ni": [4, "Nicaragua", "Republic of Nicaragua"],
    "pa": [4, "Panama", "Republic of Panama"],
    "kn": [4, "Saint Kitts and Nevis", "Federation of Saint Kitts and Nevis", "Federation of Saint Christopher and Nevis", "St. Kitts and Nevis"],
    "lc": [4, "Saint Lucia", "St. Lucia"],
    "vc": [4, "Saint Vincent and the Grenadines", "St. Vincent and the Grenadines"],
    "tt": [4, "Trinidad and Tobago", "Republic of Trinidad and Tobago"],
    "us": [4, "United States", "United States of America", "US", "USA", "America", "Freedom"],

    "ar": [5, "Argentina", "Argentine Republic"],
    "bo": [5, "Bolivia", "Plurinational State of Bolivia"],
    "br": [5, "Brazil", "Federative Republic of Brazil"],
    "cl": [5, "Chile", "Republic of Chile"],
    "co": [5, "Colombia", "Republic of Colombia"],
    "ec": [5, "Ecuador", "Republic of Ecuador"],
    "gy": [5, "Guyana", "Co-operative Republic of Guyana"],
    "py": [5, "Paraguay", "Republic of Paraguay"],
    "pe": [5, "Peru", "Republic of Peru"],
    "sr": [5, "Suriname", "Republic of Suriname"],
    "uy": [5, "Uruguay", "Oriental Republic of Uruguay"],
    "ve": [5, "Venezuela", "Bolivarian Republic of Venezuela"],

    "au": [6, "Australia", "Commonwealth of Australia"],
    "fj": [6, "Fiji", "Republic of Fiji"],
    "ki": [6, "Kiribati", "Republic of Kiribati"],
    "mh": [6, "Marshall Islands", "Republic of the Marshall Islands"],
    "fm": [6, "Micronesia", "Federated States of Micronesia"],
    "nr": [6, "Nauru", "Republic of Nauru"],
    "nz": [6, "New Zealand"],
    "pw": [6, "Palau", "Republic of Palau"],
    "pg": [6, "Papua New Guinea", "Independent State of Papua New Guinea", "PNG"],
    "ws": [6, "Samoa", "Independent State of Samoa"],
    "sb": [6, "Solomon Islands", "Solomons"],
    "to": [6, "Tonga", "Kingdom of Tonga"],
    "tv": [6, "Tuvalu"],
    "vu": [6, "Vanuatu", "Republic of Vanuatu"],

    "am": [8, "Armenia", "Republic of Armenia"],
    "az": [8, "Azerbaijan", "Republic of Azerbaijan"],
    "cy": [8, "Cyprus", "Republic of Cyprus"],
    "ge": [8, "Georgia"],
    "kz": [8, "Kazakhstan", "Republic of Kazakhstan"],
    "tr": [8, "Turkey", "Republic of Türkiye", "Türkiye"],
    "ru": [8, "Russia", "Russian Federation"],

    "eg": [9, "Egypt", "Arab Republic of Egypt"],

    "id": [10, "Indonesia", "Republic of Indonesia", "Lookalikes"],
}

// unrecognised self-governing states or just self-governing dependent states
const unrecognisedStates = {
    "eh": [1, "West Sahara", "Sahrawi Arab Democratic Republic", "Sahrawi Republic"],
    "so0": [1, "Somaliland", "Republic of Somaliland"],

    "md0": [3, "Transnistria", "Pridnestrovian Moldavian Republic", "Pridnestrovie"],

    "ck": [6, "Cook Islands"], // both are with new zealand and similar to its own country
    "nu": [6, "Niue"],

    "xa": [8, "Abkhazia", "Republic of Abkhazia"],
    "cy0": [8, "Northern Cyprus", "Turkish Republic of Northern Cyprus"],
    "xo": [8, "South Ossetia", "Republic of South Ossetia", "State of Alania"],
}

// dependent territories (continent, official flag?, dependent country, names...)
const dependentTerritories = {
    "yt": [(1, false, "fr"), "Mayotte", "Department of Mayotte"],
    "re": [(1, false, "fr"), "Réunion", "Department of Réunion"],

    "hk": [(2, true, "cn"), "Hong Kong", "Hong Kong Special Administrative Region of the People's Republic of China"],
    "mo": [(2, true, "cn"), "Macau", "Macao Special Administrative Region of the People's Republic of China"],

    "fo": [(3, true, "dk"), "Faroe Islands", "Faroes"],
    "gi": [(3, true, "gb"), "Gibraltar"],
    "gg": [(3, true, "gb"), "Guernsey", "Bailiwick of Guernsey"],
    "im": [(3, true, "gb"), "Isle of Man", "Mann"],
    //"sj0": [(3, false, "no"), "Jan Mayen"],
    "je": [(3, true, "gb"), "Jersey", "Bailiwick of Jersey"],
    //"sj1": [(3, false, "no"), "Svalbard", "Spitsbergen", "Spitzbergen"],
    "ax": [(3, true, "fi"), "Åland", "Åland Islands"],

    "ai": [(4, true, "gb"), "Anguilla"],
    "aw": [(4, true, "nl"), "Aruba", "Country of Aruba"],
    "bm": [(4, true, "gb"), "Bermuda"],
    "bq0": [(4, true, "nl"), "Bonaire"],
    "vg": [(4, true, "gb"), "British Virgin Islands", "Virgin Islands"],
    "ky": [(4, true, "gb"), "Cayman Islands"],
    "cw": [(4, true, "nl"), "Curaçao", "Country of Curaçao"],
    "gl": [(4, true, "dk"), "Greenland"],
    "gp": [(4, false, "fr"), "Guadeloupe"],
    "mq": [(4, true, "fr"), "Martinique"],
    "ms": [(4, true, "gb"), "Montserrat"],
    //"um0": [(4, false, "us"), "Navassa Island"],
    "pr": [(4, true, "us"), "Puerto Rico", "Commonwealth of Puerto Rico"],
    "bq1": [(4, true, "nl"), "Saba"],
    "bl": [(4, false, "fr"), "Saint Barthélemy", "Territorial Collectivity of Saint Barthélemy", "St. Barthélemy"],
    "mf": [(4, false, "fr"), "Saint Martin", "Collectivity of Saint Martin", "St. Martin"],
    "pm": [(4, false, "fr"), "Saint Pierre and Miquelon", "St. Pierre and Miquelon"],
    "bq2": [(4, true, "nl"), "Sint Eustatius", "Statia"],
    "sx": [(4, true, "nl"), "Sint Maarten"],
    "tc": [(4, true, "gb"), "Turks and Caicos Islands"],
    "vi": [(4, true, "us"), "United States Virgin Islands", "Virgin Islands of the United States", "US Virgin Islands"],

    "fk": [(5, true, "gb"), "Falkland Islands", "Falklands", "Malvinas"],
    "gf": [(5, false, "fr"), "French Guiana", "Guiana"],
    "gs": [(5, true, "gb"), "South Georgia and the South Sandwich Islands"],

    "as": [(6, true, "us"), "American Samoa", "Territory of American Samoa"],
    //"um1": [(6, false, "us"), "Baker Island"],
    //"au0": [(6, false, "au"), "Coral Sea Islands", "Coral Sea Islands Territory"],
    "pf": [(6, true, "fr"), "French Polynesia", "Overseas Lands of French Polynesia"],
    "gu": [(6, true, "us"), "Guam", "Territory of Guam"],
    //"um2": [(6, false, "us"), "Howland Island"],
    //"um3": [(6, false, "us"), "Jarvis Island"],
    //"um4": [(6, false, "us"), "Johnston Atoll"],
    //"um5": [(6, false, "us"), "Kingman Reef"],
    //"um6": [(6, false, "us"), "Midway Atoll", "Midway Islands"],

    "nc": [(6, true, "fr"), "New Caledonia", "Territory of New Caledonia and Dependencies"], // new caledonia uses two flags but i'm not using the french flag to make it more distinct
    "nf": [(6, true, "au"), "Norfolk Island", "Territory of Norfolk Island"],
    "mp": [(6, true, "us"), "Northern Mariana Islands", "Commonwealth of the Northern Mariana Islands"],
    //"um7": [(6, false, "us"), "Palmyra Atoll", "Palmyra Island"],
    "pn": [(6, true, "gb"), "Pitcairn", "Pitcairn Islands", "Pitcairn, Henderson, Ducie and Oeno Islands", "Pitcairn Group of Islands"],
    "tk": [(6, true, "nz"), "Tokelau"],
    "um8": [(6, false, "us"), "Wake Island"],
    "wf": [(6, false, "fr"), "Wallis and Futuna", "Territory of the Wallis and Futuna Islands"],

    "gb0": [(8, false, "gb"), "Akrotiri and Dhekelia", "Sovereign Base Areas of Akrotiri and Dhekelia"],

    "io": [(9, true, "gb"), "British Indian Ocean Territory"],

    //"au1": [(10, false, "au"), "Ashmore and Cartier Islands", "Territory of Ashmore and Cartier Islands"],
    "cc": [(10, true, "au"), "Cocos (Keeling) Islands", "Territory of Cocos (Keeling) Islands"], // the original one is copyrighted so an alternative version is used
    "cx": [(10, true, "au"), "Christmas Island", "Territory of Christmas Island"],

    //"hm": [(11, false, "au"), "Heard Island and McDonald Islands", "Territory of Heard Island and McDonald Islands"],
    "tf": [(11, true, "fr"), "French Southern and Antarctic Lands", "TAAF"],

    //"bv": [(12, false, "no"), "Bouvet Island"],
    //"sh": [(12, false, "gb"), "Saint Helena, Ascension and Tristan da Cunha", "St. Helena, Ascension and Tristan da Cunha"],

    //"fr0": [(13, false, "fr"), "Clipperton Island", "Clipperton Atoll", "Clipperton's Rock"],
}

let guesses = 0;
let playing = true;

let debounce = true;

let guessFlags = [];

let flag;

const objects = Object.assign(countriesList, unrecognisedStates, dependentTerritories);

const randomKey = function (obj) {
    const keys = Object.keys(obj);
    return keys[keys.length * Math.random() << 0];
};

// credit: rgb-lab by antimatter15
function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function rgb2lab(rgb){
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

const render = (ctx, flagCode, func) => {
    debounce = true;

    const newImage = new Image();
    newImage.src = `./flags/${flagCode}.svg`;
    newImage.onload = function () {
        ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);

        if (ctx === guessContext) {
            let success = 0;

            const imageData = guessContext.getImageData(0, 0, canvas.width, canvas.height);
            const imageData1 = answerContext.getImageData(0, 0, canvas.width, canvas.height);

            const imageData2 = renderContext.getImageData(0, 0, canvas.width, canvas.height);

            const data = imageData.data;
            const data1 = imageData1.data;
            const data2 = imageData2.data;

            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] == 0 && data[i + 3] == data1[i + 3]) { success += 1; continue }
                if (data[i + 3] == 0) continue;
                const delta = deltaE([data[i], data[i + 1], data[i + 2]], [data1[i], data1[i + 1], data1[i + 2]]);
                if (delta < 20) {
                    data[i] = data1[i];
                    data[i + 1] = data1[i + 1];
                    data[i + 2] = data1[i + 2];

                    data2[i] = data1[i];
                    data2[i + 1] = data1[i + 1];
                    data2[i + 2] = data1[i + 2];
                    data2[i + 3] = 255;

                    success += 1;
                } else {
                    data[i + 3] = 0;
                }
            }

            //guessContext.putImageData(imageData, 0, 0);
            renderContext.putImageData(imageData2, 0, 0);

            if (func) func(success, imageData);
        }
    }

    debounce = false;
}

const resetGame = () => {
    if (debounce) return;

    guesses = 0;
    playing = true;

    annoyingText.innerHTML = "guess another flag!";

    guessFlags = [];

    for (let i = 0; i < 6; i++) {
        guessList.querySelector(`li:nth-child(${i+1})`).innerHTML = "---";
        renderContext.clearRect(0, 0, canvas.width, canvas.height);
        answerContext.clearRect(0, 0, canvas.width, canvas.height);
        guessContext.clearRect(0, 0, canvas.width, canvas.height);
    }

    const randomFlag = randomKey(objects);
    flag = randomFlag;

    render(answerContext, randomFlag);
}

const search = () => {
    const query = searchInput.value.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}|\p{P}|\s/gu, '');

    if (query.length > 0)
        for (const [key, value] of Object.entries(countriesList)) {
            let found = false;
            for (let i = 1; i < value.length; i++) {
                const normVal = value[i].toLowerCase().normalize('NFD').replace(/\p{Diacritic}|\p{P}|\s/gu, '').replace(' ', '');
                if (normVal.includes(query)) {
                    found = true; break;
                }
            }
            searchElements[key].style.display = found ? "block" : "none";
        }
    else
        for (const [key, value] of Object.entries(countriesList)) {
            searchElements[key].style.display = "block";
        }
    }

searchInput.addEventListener("input", search);

searchInput.addEventListener("focus", () => {
})

searchInput.addEventListener("blur", () => {
    console.log("search blur")
})

window.addEventListener("load", () => {
    for (const [key, value] of Object.entries(objects)) {
        const listElement = document.createElement("li");
        listElement.innerHTML = `<button><img src="./flags/${key}.svg" height="14"><span>${value[1]}</span></button>`
        listElement.querySelector('button').addEventListener("click", () => {
            if (playing && !debounce) {
                // guessing

                for (let i = 0; i < guessFlags.length; i++) {
                    if (guessFlags[i] === key) {
                        annoyingText.innerHTML = "you already guessed this";
                        return;
                    }
                }

                guesses += 1;

                guessFlags.push(key);

                if (key === "sc") {
                    annoyingText.innerHTML = "...";
                }

                if (guesses >= 6) {
                    playing = false
                    annoyingText.innerHTML = `aw man, you lost! the flag is ${objects[flag][1]} <img src="./flags/${flag}.svg" height="14">`
                }

                if (key === flag) {
                    annoyingText.innerHTML = "nice! you win!";
                    playing = false
                };

                render(guessContext, key, (success, imageData) => {
                    console.log(success)
                    console.log(success / (canvas.width * canvas.height));

                    const rate = Math.floor(success / (canvas.width * canvas.height) * 10000) / 100

                    const newCanvas = document.createElement("canvas");
                    newCanvas.width = canvas.width; newCanvas.height = canvas.height;
                    newCanvas.getContext("2d").putImageData(imageData, 0, 0);

                    const child = guessList.querySelector(`li:nth-child(${guesses})`);
                    child.innerHTML = `<span>${value[1]} (${rate}%)</span>`

                    child.appendChild(newCanvas);
                });
            }
        })
        searchList.appendChild(listElement);
        searchElements[key] = listElement
    }

    const randomFlag = randomKey(objects);
    //const randomFlag = "kh";
    flag = randomFlag;

    //render(context, randomFlag);
    render(answerContext, randomFlag);

    search();
})

resetButton.addEventListener("click", resetGame);

console.log(document.querySelector("html body div input#search").value);