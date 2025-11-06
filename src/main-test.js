import { Actor } from 'apify';
import { Dataset } from 'crawlee';

// Initialize the Apify actor
await Actor.init();

try {
    Actor.log.info('🧪 Running Quick Test Mode');

    // Create mock test data
    const mockLeads = [
        {
            businessName: "Seattle Coffee Works",
            email: "info@seattlecoffeeworks.com",
            emailValid: true,
            phone: "+1 (206) 555-1234",
            website: "https://seattlecoffeeworks.com",
            address: "107 Pike St, Seattle, WA 98101",
            category: "Coffee shop",
            rating: 4.8,
            reviewCount: 1247,
            claimed: true,
            leadScore: 87,
            leadGrade: "A",
            scrapedAt: new Date().toISOString()
        },
        {
            businessName: "Espresso Vivace",
            email: "contact@espressovivace.com",
            emailValid: true,
            phone: "+1 (206) 555-5678",
            website: "https://espressovivace.com",
            address: "532 Broadway E, Seattle, WA 98102",
            category: "Coffee shop",
            rating: 4.9,
            reviewCount: 892,
            claimed: true,
            leadScore: 92,
            leadGrade: "A+",
            scrapedAt: new Date().toISOString()
        },
        {
            businessName: "Caffe Vita",
            email: "hello@caffevita.com",
            emailValid: true,
            phone: "+1 (206) 555-9012",
            website: "https://caffevita.com",
            address: "1005 E Pike St, Seattle, WA 98122",
            category: "Coffee shop",
            rating: 4.6,
            reviewCount: 654,
            claimed: true,
            leadScore: 78,
            leadGrade: "B",
            scrapedAt: new Date().toISOString()
        }
    ];

    Actor.log.info(`✅ Generated ${mockLeads.length} test leads`);

    // Push to dataset
    for (const lead of mockLeads) {
        await Dataset.pushData(lead);
    }

    Actor.log.info('💾 Saved leads to dataset');

    // Get stats
    const dataset = await Dataset.open();
    const { items } = await dataset.getData();

    const stats = {
        success: true,
        totalLeads: items.length,
        highQualityLeads: items.filter(l => l.leadGrade === 'A+' || l.leadGrade === 'A').length,
        averageScore: Math.round(items.reduce((sum, l) => sum + l.leadScore, 0) / items.length),
        timestamp: new Date().toISOString()
    };

    Actor.log.info('🎉 Test completed successfully!', stats);

    // Save output
    await Actor.setValue('OUTPUT', stats);

    console.log('\n📊 RESULTS:');
    console.log(JSON.stringify(stats, null, 2));
    console.log('\n📁 Data saved to: storage/datasets/default/');
    console.log('💡 View results: cat storage/datasets/default/*.json');

} catch (error) {
    Actor.log.error('💥 Test failed', { error: error.message });
    await Actor.setValue('OUTPUT', {
        success: false,
        error: error.message
    });
    throw error;
} finally {
    await Actor.exit();
}
