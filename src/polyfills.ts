/**
 * Polyfill to handle environments where fetch is a read-only getter
 */
if (typeof window !== 'undefined') {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch') || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'fetch');
    
    if (descriptor) {
      const originalFetch = window.fetch;
      
      if (descriptor.configurable === false) {
        console.warn('Polyfill: window.fetch is NOT configurable. We cannot define a setter to silence the error.');
      } else {
        // Define a getter/setter combo. The setter will swallow assignments to avoid the "has only a getter" error.
        try {
          Object.defineProperty(window, 'fetch', {
            get: function() { return originalFetch; },
            set: function(v) { 
              console.warn('Polyfill: Blocked an attempt to overwrite window.fetch. This assignment was ignored to prevent a TypeError.');
            },
            configurable: true,
            enumerable: true
          });
          console.log('Polyfill: window.fetch proxy setter installed successfully');
        } catch (defineError) {
          console.error('Polyfill: defineProperty failed', defineError);
        }
      }
    }
  } catch (e) {
    console.error('Polyfill check/fix failed', e);
  }
}

export {};
