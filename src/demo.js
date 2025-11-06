import { Actor } from 'apify';
import { Dataset } from 'crawlee';
import { calculateLeadScore } from './scoring/leadScore.js';

console.log('🚀 Starting B2B Lead Generator Demo\n');

await Actor.init();

try {
    // Create realistic test leads
    const mockLeads = [
        {
            businessName: "Seattle Coffee Works",
            email: "info@seattlecoffeeworks.com",
            phone: "+1 (206) 555-1234",
            website: "https://seattlecoffeeworks.com",
            address: "107 Pike St, Seattle, WA 98101",
            category: "Coffee shop",
            rating: 4.8,
            reviewCount: 1247,
            claimed: true,
            socialLinks: {
                linkedin: null,
                facebook: "https://facebook.com/seattlecoffeeworks",
                twitter: "https://twitter.com/seacoffeeworks",
                instagram: "https://instagram.com/seattlecoffeeworks"
            }
        },
        {
            businessName: "Espresso Vivace",
            email: "contact@espressovivace.com",
            phone: "+1 (206) 555-5678",
            website: "https://espressovivace.com",
            address: "532 Broadway E, Seattle, WA 98102",
            category: "Coffee shop",
            rating: 4.9,
            reviewCount: 892,
            claimed: true,
            socialLinks: {
                linkedin: null,
                facebook: "https://facebook.com/espressovivace",
                twitter: null,
                instagram: "https://instagram.com/espressovivace"
            }
        },
        {
            businessName: "Caffe Vita",
            email: "hello@caffevita.com",
            phone: "+1 (206) 555-9012",
            website: "https://caffevita.com",
            address: "1005 E Pike St, Seattle, WA 98122",
            category: "Coffee shop",
            rating: 4.6,
            reviewCount: 654,
            claimed: true,
            socialLinks: {
                linkedin: "https://linkedin.com/company/caffe-vita",
                facebook: "https://facebook.com/caffevita",
                twitter: null,
                instagram: "https://instagram.com/caffevita"
            }
        }
    ];

    console.log('📊 Generating sample leads...\n');

    // Score each lead
    const icp = {
        industries: {
            food_service: 30,
            retail: 25,
            hospitality: 20
        },
        locations: {
            "North America": 30,
            "Europe": 25
        }
    };

    for (const lead of mockLeads) {
        // Calculate score
        const scoreResult = calculateLeadScore(lead, icp);
        lead.leadScore = scoreResult.score;
        lead.leadGrade = scoreResult.grade;
        lead.scoreBreakdown = scoreResult.breakdown;
        lead.emailValid = true;
        lead.phoneValid = true;
        lead.scrapedAt = new Date().toISOString();

        // Save to dataset
        await Dataset.pushData(lead);

        // Display lead summary
        console.log(`✅ ${lead.businessName}`);
        console.log(`   Grade: ${lead.leadGrade} (Score: ${lead.leadScore}/100)`);
        console.log(`   Email: ${lead.email}`);
        console.log(`   Phone: ${lead.phone}`);
        console.log(`   Rating: ${lead.rating} ⭐ (${lead.reviewCount} reviews)`);
        console.log(`   Breakdown: Quality ${scoreResult.breakdown.dataQuality}, Engagement ${scoreResult.breakdown.engagement}, Fit ${scoreResult.breakdown.firmographic}`);
        console.log('');
    }

    // Get final stats
    const dataset = await Dataset.open();
    const { items } = await dataset.getData();

    const stats = {
        success: true,
        totalLeads: items.length,
        highQualityLeads: items.filter(l => l.leadGrade === 'A+' || l.leadGrade === 'A').length,
        gradeDistribution: {
            'A+': items.filter(l => l.leadGrade === 'A+').length,
            'A': items.filter(l => l.leadGrade === 'A').length,
            'B': items.filter(l => l.leadGrade === 'B').length,
            'C': items.filter(l => l.leadGrade === 'C').length,
        },
        averageScore: Math.round(items.reduce((sum, l) => sum + l.leadScore, 0) / items.length),
        timestamp: new Date().toISOString()
    };

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📈 RESULTS SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log(`✅ Total Leads: ${stats.totalLeads}`);
    console.log(`⭐ High Quality (A/A+): ${stats.highQualityLeads}`);
    console.log(`📊 Average Score: ${stats.averageScore}/100`);
    console.log(`\n📋 Grade Distribution:`);
    console.log(`   A+: ${stats.gradeDistribution['A+']}`);
    console.log(`   A:  ${stats.gradeDistribution['A']}`);
    console.log(`   B:  ${stats.gradeDistribution['B']}`);
    console.log(`   C:  ${stats.gradeDistribution['C']}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('💾 DATA SAVED TO:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📁 storage/datasets/default/');
    console.log('');
    console.log('View results:');
    console.log('  cat storage/datasets/default/*.json');
    console.log('  ls storage/datasets/default/');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 Demo completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Deploy to Apify: apify push');
    console.log('  2. Test with real data: apify call');
    console.log('  3. Publish to store & earn revenue!');
    console.log('');

    // Save output
    await Actor.setValue('OUTPUT', stats);

    // Exit cleanly
    process.exit(0);

} catch (error) {
    console.error('❌ Error:', error.message);
    await Actor.setValue('OUTPUT', {
        success: false,
        error: error.message
    });
    process.exit(1);
}
