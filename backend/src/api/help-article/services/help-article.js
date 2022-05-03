'use strict';

/**
 * help-article service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-article.help-article');
