require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: "Thai Words",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-googlesheets",
      options: {
        sheetId: process.env.GOOGLE_SHEETS_ID || ''
      },
    },
  ],
}