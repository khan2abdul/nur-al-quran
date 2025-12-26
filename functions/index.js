/**
 * Firebase Cloud Functions for Nur Al-Quran
 * 
 * Provides server-side OAuth2 token proxy for Quran Foundation API
 */

const { onCall } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Set global options
setGlobalOptions({ maxInstances: 10 });

/**
 * Get Quran Foundation OAuth2 Access Token
 * 
 * This function proxies OAuth2 token requests to avoid CORS issues.
 * Tokens are cached in Firestore for 1 hour.
 */
exports.getQuranFoundationToken = onCall(async (request) => {
    try {
        const db = admin.firestore();
        const tokenDoc = db.collection("system").doc("quran_foundation_token");

        // Check cache first
        const cached = await tokenDoc.get();
        if (cached.exists) {
            const data = cached.data();
            const now = Math.floor(Date.now() / 1000);
            const expiresAt = data.created_at + data.expires_in;

            // Return cached token if still valid (with 60s buffer)
            if (now < expiresAt - 60) {
                logger.info("Returning cached Quran Foundation token");
                return {
                    success: true,
                    access_token: data.access_token,
                    expires_in: expiresAt - now,
                };
            }
        }

        // Fetch new token from Quran Foundation
        logger.info("Fetching new Quran Foundation OAuth2 token");

        const clientId = process.env.QURAN_FOUNDATION_CLIENT_ID;
        const clientSecret = process.env.QURAN_FOUNDATION_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error("Quran Foundation credentials not configured");
        }

        // Create Basic Auth header
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

        const response = await fetch("https://oauth2.quran.foundation/oauth2/token", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials&scope=content",
        });

        if (!response.ok) {
            const errorText = await response.text();
            logger.error("OAuth2 token fetch failed", { status: response.status, error: errorText });
            throw new Error(`OAuth2 failed: ${response.status}`);
        }

        const tokenData = await response.json();

        // Cache the token in Firestore
        const cacheData = {
            access_token: tokenData.access_token,
            token_type: tokenData.token_type,
            expires_in: tokenData.expires_in,
            scope: tokenData.scope,
            created_at: Math.floor(Date.now() / 1000),
        };

        await tokenDoc.set(cacheData);

        logger.info("Quran Foundation token fetched and cached successfully");

        return {
            success: true,
            access_token: tokenData.access_token,
            expires_in: tokenData.expires_in,
        };
    } catch (error) {
        logger.error("Error in getQuranFoundationToken", error);
        return {
            success: false,
            error: error.message,
        };
    }
});
