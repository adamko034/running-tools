/**
 * Google AdSense Ad Slot Configuration
 * 
 * Centralized configuration for all ad placements across the application.
 * Replace these placeholder IDs with your actual Google AdSense ad slot IDs.
 */

export const AD_SLOTS = {
  // Home Page
  HOME_AFTER_FEATURES: '1234567890', // Single strategic placement
  
  // Tool Pages (via tool-view template)
  TOOL_AFTER_CONTENT: '2345678901',
  TOOL_CONTENT_BREAK: '3456789012',
  TOOL_SIDEBAR: '4567890123',
  
  // Specific Pages
  CONTACT_PAGE: '6817814851', // This one is already configured
  PRIVACY_PAGE: '7890123456',
  
  // Mobile Specific
  MOBILE_BANNER: '9012345678',
  
  // Additional Slots for Future Use
  ARTICLE_TOP: '0123456789',
  ARTICLE_BOTTOM: '1098765432',
  SIDEBAR_SECONDARY: '2109876543',
  
  // Special Placements
  RESULTS_PAGE: '3210987654',
  CALCULATOR_BOTTOM: '4321098765',
} as const;

/**
 * Ad Format Configuration
 */
export const AD_FORMATS = {
  AUTO: 'auto',
  RECTANGLE: 'rectangle',
  BANNER: 'banner',
  LEADERBOARD: 'leaderboard',
  SKYSCRAPER: 'skyscraper',
} as const;

/**
 * Ad Placement Guidelines
 */
export const AD_PLACEMENT_RULES = {
  // Maximum ads per page
  MAX_ADS_PER_PAGE: 3,
  
  // Minimum spacing between ads (in pixels)
  MIN_SPACING: 600,
  
  // Recommended ad sizes
  SIZES: {
    MOBILE_BANNER: { width: 320, height: 50 },
    RECTANGLE: { width: 300, height: 250 },
    LEADERBOARD: { width: 728, height: 90 },
    LARGE_RECTANGLE: { width: 336, height: 280 },
  },
  
  // Performance recommendations
  PERFORMANCE: {
    // Load ads after main content
    LAZY_LOAD: true,
    
    // Timeout for ad loading
    LOAD_TIMEOUT: 10000,
    
    // Retry attempts
    MAX_RETRIES: 2,
  },
} as const;

/**
 * Page-specific ad configurations
 */
export const PAGE_AD_CONFIG = {
  home: {
    slots: [AD_SLOTS.HOME_AFTER_FEATURES],
    maxAds: 1,
  },
  
  tools: {
    slots: [AD_SLOTS.TOOL_AFTER_CONTENT, AD_SLOTS.TOOL_SIDEBAR, AD_SLOTS.TOOL_CONTENT_BREAK],
    maxAds: 3,
  },
  
  contact: {
    slots: [AD_SLOTS.CONTACT_PAGE],
    maxAds: 1,
  },
  
  privacy: {
    slots: [AD_SLOTS.PRIVACY_PAGE],
    maxAds: 1,
  },
} as const;