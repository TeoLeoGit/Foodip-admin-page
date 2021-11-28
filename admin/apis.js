//Google APIs
const fs = require('fs')
const { google } = require('googleapis');


module.exports = {
    configGoogleDriveAPI(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN) {
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        )
        oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        })
        return drive
    },

    async uploadFile(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, filePath, originalName) {
        const oauth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        )
        oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        })
        try {
            const res = await drive.files.create({
              requestBody: {
                name: originalName,
                parents: ['1KnrUUaNCRgXQElCI5_3NoMabwqyJMvte'],
                mimeType: 'image/jpg'
              },
              media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
              }
            })

            return await this.generatePublicUrl(drive, res.data.id)
          } catch (error) {
            console.log("1: ")
            console.log(error.message)
          }
    },

    async generatePublicUrl(drive, fileId) {
      try {
        const id = fileId;
        await drive.permissions.create({
          fileId: id,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        })

        const result = await drive.files.get({
          fileId: id,
          fields: 'webViewLink, webContentLink' 
        })
        
        return Object.values(result.data)[0]
      } catch(error) {
        console.log("2: ")
        console.log(error.message)
      }

    }
}