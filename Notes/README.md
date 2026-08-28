# School Notes Hub

A professional notes website for school students that displays notes from different classes and subjects using Google Sheets as a data source.

## Features

- Filter notes by class and subject
- Search functionality
- Responsive design
- Modern and clean interface
- Easy to update content through Google Sheets

## Setup Instructions

1. Create a Google Sheet with the following columns:
   - title
   - content
   - class
   - subject

2. Make your Google Sheet public:
   - Click "Share" in the top right
   - Click "Change to anyone with the link"
   - Set access to "Viewer"
   - Copy the sharing link

3. Convert the Google Sheet to CSV:
   - Go to File > Download > CSV
   - Or use the direct CSV export URL (replace the sheet ID in the URL)

4. Update the `GOOGLE_SHEET_URL` in `script.js`:
   ```javascript
   const GOOGLE_SHEET_URL = 'YOUR_GOOGLE_SHEET_CSV_URL';
   ```

5. Host the website:
   - You can use any web hosting service
   - Or run it locally using a simple HTTP server

## File Structure

- `index.html` - Main HTML file
- `styles.css` - CSS styles
- `script.js` - JavaScript functionality
- `README.md` - This documentation

## Customization

You can customize the website by:

1. Modifying the classes and subjects in `script.js`:
   ```javascript
   const CLASSES = ['Class 1', 'Class 2', ...];
   const SUBJECTS = ['Mathematics', 'Science', ...];
   ```

2. Updating the styles in `styles.css`

3. Adding more features to `script.js`

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a new branch
3. Making your changes
4. Submitting a pull request

## License

This project is open source and available under the MIT License. 