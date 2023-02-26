/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.tools.grizzlybit.dev',
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
