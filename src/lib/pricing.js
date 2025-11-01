/**
 * Centralized pricing calculation utilities
 * Used across frontend and backend to ensure consistency
 */

/**
 * Calculate the scaled admin price based on user count
 * Admin price increases by 50% for each user slot below max
 *
 * Example with max_user=4, admin_price=10000:
 * - 4 users: 10,000 (0% increase)
 * - 3 users: 15,000 (50% increase)
 * - 2 users: 20,000 (100% increase)
 * - 1 user:  25,000 (150% increase)
 *
 * @param {number} userCount - Number of users in the room
 * @param {number} maxUser - Maximum users allowed (from provider)
 * @param {number} adminPrice - Base admin price (for max_user scenario)
 * @returns {number} Scaled admin price per user
 */
export function calculateAdminPrice(userCount, maxUser, adminPrice) {
  const missingUsers = maxUser - userCount;
  const increasePercentage = missingUsers * 0.5; // 50% per missing user
  const scaledPrice = adminPrice * (1 + increasePercentage);
  return Math.floor(scaledPrice);
}

/**
 * Calculate the base price per user (subscription cost only)
 *
 * @param {number} basePrice - Provider's base subscription price
 * @param {number} userCount - Number of users in the room
 * @returns {number} Base price per user
 */
export function calculateBasePricePerUser(basePrice, userCount) {
  return Math.floor(basePrice / userCount);
}

/**
 * Calculate the total price per user (base + admin)
 *
 * @param {number} basePrice - Provider's base subscription price
 * @param {number} userCount - Number of users in the room
 * @param {number} maxUser - Maximum users allowed (from provider)
 * @param {number} adminPrice - Base admin price (for max_user scenario)
 * @returns {number} Total price per user
 */
export function calculateTotalPrice(basePrice, userCount, maxUser, adminPrice) {
  const basePricePerUser = calculateBasePricePerUser(basePrice, userCount);
  const scaledAdminPrice = calculateAdminPrice(userCount, maxUser, adminPrice);
  return basePricePerUser + scaledAdminPrice;
}

/**
 * Calculate the total price per user and return formatted string
 *
 * @param {number} basePrice - Provider's base subscription price
 * @param {number} userCount - Number of users in the room
 * @param {number} maxUser - Maximum users allowed (from provider)
 * @param {number} adminPrice - Base admin price (for max_user scenario)
 * @returns {string} Formatted price string (e.g., "Rp25.000")
 */
export function calculatePriceFormatted(basePrice, userCount, maxUser, adminPrice) {
  const total = calculateTotalPrice(basePrice, userCount, maxUser, adminPrice);
  return `Rp${total.toLocaleString('id-ID')}`;
}

/**
 * Get pricing breakdown for display purposes
 *
 * @param {number} basePrice - Provider's base subscription price
 * @param {number} userCount - Number of users in the room
 * @param {number} maxUser - Maximum users allowed (from provider)
 * @param {number} adminPrice - Base admin price (for max_user scenario)
 * @returns {object} Breakdown of pricing components
 */
export function getPricingBreakdown(basePrice, userCount, maxUser, adminPrice) {
  const basePricePerUser = calculateBasePricePerUser(basePrice, userCount);
  const scaledAdminPrice = calculateAdminPrice(userCount, maxUser, adminPrice);
  const totalPrice = basePricePerUser + scaledAdminPrice;
  const missingUsers = maxUser - userCount;
  const increasePercentage = missingUsers * 50; // 50% per missing user

  return {
    basePrice,
    userCount,
    maxUser,
    adminPrice,
    basePricePerUser,
    scaledAdminPrice,
    totalPrice,
    missingUsers,
    increasePercentage,
    // Formatted values
    basePricePerUserFormatted: `Rp${basePricePerUser.toLocaleString('id-ID')}`,
    scaledAdminPriceFormatted: `Rp${scaledAdminPrice.toLocaleString('id-ID')}`,
    totalPriceFormatted: `Rp${totalPrice.toLocaleString('id-ID')}`,
  };
}
