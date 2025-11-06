console.log('Starting minimal test...');

import { Actor } from 'apify';

console.log('Imported Actor');

console.log('Calling Actor.init()...');
await Actor.init();

console.log('Actor initialized!');

try {
    console.log('Getting input...');
    const input = await Actor.getInput();
    console.log('Input:', JSON.stringify(input, null, 2));

    console.log('Setting output...');
    await Actor.setValue('OUTPUT', {
        success: true,
        message: 'Minimal test passed!',
        input: input
    });

    console.log('✅ Test completed successfully!');
} catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
} finally {
    console.log('Exiting...');
    await Actor.exit();
    console.log('Exited!');
}
