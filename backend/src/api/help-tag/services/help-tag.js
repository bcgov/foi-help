'use strict';

/**
 * help-tag service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::help-tag.help-tag');
