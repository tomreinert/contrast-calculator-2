import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.store('colors', {
    score: '',
    hex1: '',
    hex2: '',  
    h1: 10,
    s1: 0,
    l1: 20,
    h2: 0,
    s2: 0,
    l2: 80,
});

swapColors = function(){
  let a = Alpine.store('colors').hex1, b = Alpine.store('colors').hex2;
  [a, b] = [b, a];
  console.log(`${a} ${b}`);
  Alpine.store('colors').hex1 = a;
  Alpine.store('colors').hex2 = b;
  setHSL(1);
  setHSL(2);
  calculateScore();
};

calculateScore = function() {
  let hex1 = Alpine.store('colors').hex1;
  let hex2 = Alpine.store('colors').hex2;
  let score = APCAcontrast( sRGBtoY( hex1 ), sRGBtoY( hex2 ) );
  Alpine.store('colors').score = score;     
};

setHSL = function(i) {
  let hex = Alpine.store('colors')[`hex${i}`];
  let hsl = hexToHSL(hex);
  Alpine.store('colors')[`h${i}`] = hsl.h;
  Alpine.store('colors')[`s${i}`] = hsl.s;
  Alpine.store('colors')[`l${i}`] = hsl.l;
};

setHEX = function(i){
  let h1 = Alpine.store('colors')[`h${i}`];
  let s1 = Alpine.store('colors')[`s${i}`];
  let l1 = Alpine.store('colors')[`l${i}`];
  Alpine.store('colors')[`hex${i}`] = hslToHex(h1,s1,l1);
};

 
hslToHex = function(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return myHex = `#${f(0)}${f(8)}${f(4)}`;
};

hexToHSL = function(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
      h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(0);
    l = +(l * 100).toFixed(0);

    return {h,s,l};
};

Alpine.start()


//


