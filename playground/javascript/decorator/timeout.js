function timeout( milliseconds = 0 ) {
  
  return function( target, key, descriptor ) {

    var originalMethod = descriptor.value;

    descriptor.value = function (...args) {

      setTimeout(() => {
        originalMethod.apply(this, args);
       }, milliseconds);

    };

    return descriptor;
  }


}

class DemoComponent {

  constructor() {}

  @timeout()
  demoMethod() {
    // This code will run at the next tick...
    console.log('0 ms Later');
  }

  // With a number
  @timeout(2000)
  demoMethod() {
    // This code will run at the next tick...
    console.log('2000 ms Later');
  }
}

new DemoComponent().demoMethod();

console.log('Main Process...');

