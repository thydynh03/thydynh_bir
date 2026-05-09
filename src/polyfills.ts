/**
 * Polyfill to handle environments where fetch is a read-only getter
 */
if (typeof window !== 'undefined') {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (descriptor && !descriptor.writable && !descriptor.set) {
      console.log('Detected read-only fetch getter, providing bypass if needed');
      // Some libraries try to polyfill fetch by assignment.
      // We can't fix the assignment if it's a getter-only property on Window.
      // But we can try to make it configurable if it's not.
    }
  } catch (e) {
    console.error('Polyfill check failed', e);
  }
}

export {};
