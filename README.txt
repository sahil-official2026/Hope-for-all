# Hope for All Pakistan

## Project run karne ka tareeqa

1. ZIP file extract karein.
2. Folder ko VS Code mein open karein.
3. VS Code Terminal open karein.
4. Ye command chalayein:

   ```bash
   npm install
   ```

5. Installation complete hone ke baad:

   ```bash
   npm run dev
   ```

6. Terminal mein jo local URL aaye (aam tor par http://localhost:5173), usay browser mein open karein.

## Images

Apni images `public/images` folder mein rakhein. `App.jsx` mein image paths ye hain:

- `Hope for humanity 2.jpeg`
- `slide2.jpg`
- `slide3.jpg`
- `slide4.jpg`
- `slide5.jpg`

Image filenames bilkul same rakhein. Agar ye images abhi folder mein nahi hain to slider placeholder fallback dikhayega.

## Demo Admin Login

- Email: `admin@hopeforall.org`
- Password: `Hope@123`

**Security note:** Admin login demo-only hai. Contact questions browser ke LocalStorage mein save hote hain; abhi database ya secure server authentication connected nahi hai.
