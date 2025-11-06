import { Actor } from 'apify';

/**
 * Send webhook notification with actor results
 * @param {string} webhookUrl - URL to send POST request to
 * @param {Object} data - Data payload to send
 * @returns {Promise<void>}
 */
export const sendWebhook = async (webhookUrl, data) => {
    if (!webhookUrl) return;

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Apify-B2B-Lead-Generator/1.0',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Webhook failed with status ${response.status}`);
        }

        Actor.log.info(`✅ Webhook sent successfully to ${webhookUrl}`);
    } catch (error) {
        Actor.log.error(`❌ Failed to send webhook to ${webhookUrl}`, {
            error: error.message,
        });
        throw error;
    }
};

/**
 * Push leads to CRM (placeholder for future integration)
 * @param {Object} params - CRM configuration
 * @param {string} params.platform - CRM platform (hubspot, salesforce, pipedrive)
 * @param {string} params.apiKey - API key for authentication
 * @param {Array} params.leads - Array of lead objects
 * @returns {Promise<void>}
 */
export const pushToCRM = async ({ platform, apiKey, leads }) => {
    // Placeholder for CRM integration
    Actor.log.info(`CRM Integration: Would push ${leads.length} leads to ${platform}`);

    // TODO: Implement actual CRM integrations
    // - HubSpot: https://developers.hubspot.com/docs/api/crm/contacts
    // - Salesforce: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/
    // - Pipedrive: https://developers.pipedrive.com/docs/api/v1

    return Promise.resolve();
};
