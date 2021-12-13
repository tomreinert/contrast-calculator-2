import Alpine from 'alpinejs'
 
window.Alpine = Alpine

Alpine.data('app', () => ({
  swapColors(){
    let a = Alpine.store('colors').hex1, b = Alpine.store('colors').hex2;
    [a, b] = [b, a];
    console.log(`${a} ${b}`);
    Alpine.store('colors').hex1 = a;
    Alpine.store('colors').hex2 = b;
    setHSL(1);
    setHSL(2);
    calculateScore();
  },
  
  calculateScore () {
    let hex1 = Alpine.store('colors').hex1;
    let hex2 = Alpine.store('colors').hex2;
    let score = APCAcontrast( sRGBtoY( hex1 ), sRGBtoY( hex2 ) );
    Alpine.store('colors').score = score;     
  },
  
  setHSL(i) {
    let hex = Alpine.store('colors')[`hex${i}`];
    let hsl = hexToHSL(hex);
    Alpine.store('colors')[`h${i}`] = hsl.h;
    Alpine.store('colors')[`s${i}`] = hsl.s;
    Alpine.store('colors')[`l${i}`] = hsl.l;
  },
  
  setHEX(i){
    let h1 = Alpine.store('colors')[`h${i}`];
    let s1 = Alpine.store('colors')[`s${i}`];
    let l1 = Alpine.store('colors')[`l${i}`];
    Alpine.store('colors')[`hex${i}`] = hslToHex(h1,s1,l1);
  }
  
}));

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

Alpine.start()


//


