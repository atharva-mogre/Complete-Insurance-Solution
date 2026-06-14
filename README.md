# Complete Insurance Solution

A professional and responsive landing page for **Complete Insurance Solution**, an insurance agency founded by Mr. Sameer Mogre. This website serves to present the firm's services, showcase client testimonials, highlight key statistics, and allow prospective clients to easily request quotes or leave reviews.

## 🚀 Features

- **Modern & Responsive UI**: Built with a clean aesthetic and responsive design ensuring an optimal viewing experience across all devices.
- **Dynamic Micro-Animations**: Includes animated counters for statistics, fade-in effects, and a smooth felicitation gallery carousel.
- **Interactive Review System**: Users can submit star-rated reviews directly from the site.
- **Contact & Quote Forms**: Integrated forms allow users to request different types of insurance quotes (Life, Health, Motor, etc.).
- **Serverless Backend (Email Integration)**: Powered by a serverless function that uses `nodemailer` to instantly forward user queries and reviews to the agency's email.
- **Local SEO Optimized**: Includes JSON-LD schema markup for better visibility in Google local search results.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript
- **Typography & Icons**: Google Fonts (Inter, Playfair Display), Font Awesome
- **Backend / API**: Node.js Serverless Function (Vercel-compatible)
- **Dependencies**: `nodemailer` (for handling email submissions)

## 💻 Local Development

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/atharva-mogre/Complete-Insurance-Solution.git
   cd Complete-Insurance-Solution
   ```

2. **Install Dependencies:**
   Since the backend API uses Nodemailer, install the Node modules.
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   For the contact form to work locally, you'll need to run this with a framework that supports Serverless functions (like Vercel CLI) and provide the `.env` variables.
   Create a `.env` file in the root directory:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_API_KEY=your_app_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   ```

4. **Run the site:**
   You can serve the HTML files using any local server extension (like Live Server in VS Code) or run it via Vercel CLI:
   ```bash
   vercel dev
   ```

## 🌍 Deployment

This project is optimized to be deployed on platforms like **Vercel** or **Netlify** which natively support serverless functions in the `api/` directory.

### Deploying to Vercel:
1. Push your code to GitHub.
2. Import the repository into your Vercel Dashboard.
3. **CRITICAL:** Before deploying, go to the **Environment Variables** section in your Vercel project settings and add:
   - `EMAIL_USER`
   - `EMAIL_API_KEY`
   - `SMTP_HOST`
   - `SMTP_PORT`
4. Click **Deploy**. Your forms and website will now be live and fully functional!

---
*Developed for Complete Insurance Solution.*