# Paul Castro - Fantasy Novelist Website

A captivating personal website showcasing fantasy novels with engaging animations and interactive features.

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Animations**: Spinning book containers, floating particles, and magical effects
- **Video Background**: MP4 background support with fallback options
- **Social Media Integration**: Facebook page plugin with fallback content
- **Contact Forms**: Direct email integration throughout the site
- **Fantasy Theme**: Dark color scheme with gold accents and mystical elements
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## 📁 File Structure

Create the following directory structure in your GitHub repository:

```
paulcastro-org/
├── index.html                 # Home page
├── about.html                 # About Me page
├── works.html                 # In The Works page
├── social.html                # Social Media page
├── favicon.ico                # Website favicon
├── background-home.mp4        # Background video for home page
├── styles/
│   ├── home.css              # Home page styles
│   ├── about.css             # About page styles
│   ├── works.css             # Works page styles
│   └── social.css            # Social page styles
├── scripts/
│   ├── home.js               # Home page JavaScript
│   ├── about.js              # About page JavaScript
│   ├── works.js              # Works page JavaScript
│   └── social.js             # Social page JavaScript
└── README.md                 # This file
```

## 🚀 Setup Instructions

### Step 1: Create Directory Structure

1. Navigate to your existing GitHub repository: `paulcastro-org`
2. Create the following directories:
   ```bash
   mkdir styles
   mkdir scripts
   ```

### Step 2: Add HTML Files

Create these HTML files in your root directory:

1. **index.html** - Copy the Home Page HTML content
2. **about.html** - Copy the About Me Page HTML content  
3. **works.html** - Copy the In The Works Page HTML content
4. **social.html** - Copy the Social Media Page HTML content

### Step 3: Add CSS Files

Create these CSS files in the `styles/` directory:

1. **styles/home.css** - Copy the Home Page CSS content
2. **styles/about.css** - Copy the About Page CSS content
3. **styles/works.css** - Copy the Works Page CSS content
4. **styles/social.css** - Copy the Social Page CSS content

### Step 4: Add JavaScript Files

Create these JavaScript files in the `scripts/` directory:

1. **scripts/home.js** - Copy the Home Page JavaScript content
2. **scripts/about.js** - Copy the About Page JavaScript content
3. **scripts/works.js** - Copy the Works Page JavaScript content
4. **scripts/social.js** - Copy the Social Page JavaScript content

### Step 5: Add Media Files

1. **favicon.ico** - Add your favicon file to the root directory
2. **background-home.mp4** - Add your background video file to the root directory

### Step 6: Configure GitHub Pages

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"
6. Your website will be available at: `https://iamkarmakazi115.github.io/paulcastro-org/`

## 🎨 Color Palette

The website uses the following color scheme:

- **Gold**: #FCBA04 (Primary accent, headers, highlights)
- **Dark Red**: #A50104 (Secondary accent, gradients)
- **Darker Red**: #590004 (Background gradients)
- **Darkest Red**: #250001 (Primary background)
- **Light Gray**: #F3F3F3 (Text, light elements)

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: Below 480px

## ✨ Special Features

### Home Page
- **Background Video**: Automatically plays with overlay effects
- **Bouncing Quote**: Animated quote that moves around the screen
- **Floating Runes**: Magical symbols that float across the page
- **Particle Effects**: Interactive cursor trails and magical bursts

### About Me Page
- **Story Cards**: Hover effects with particle bursts
- **Floating Symbols**: Ambient magical atmosphere
- **Reading Progress**: Visual indicator of scroll progress
- **Interactive Cursor**: Sparkle effects follow mouse movement

### In The Works Page
- **Spinning Books**: Book containers spin 4 times rapidly on hover
- **3D Card Effects**: Front and back sides with detailed blurbs
- **Magical Bursts**: Particle effects on interaction
- **Floating Runes**: Background atmospheric effects

### Social Media Page
- **Facebook Integration**: Live Facebook page plugin with fallback
- **Community Features**: Interactive feature cards
- **Updates Feed**: Styled social media-like posts
- **Newsletter Signup**: Enhanced subscription form

## 🔧 Customization Options

### Changing Colors
Edit the CSS custom properties in each stylesheet:
```css
:root {
    --gold: #FCBA04;
    --dark-red: #A50104;
    --darker-red: #590004;
    --darkest-red: #250001;
    --light-gray: #F3F3F3;
}
```

### Adding New Books
To add new books to the "In The Works" page:

1. Open `works.html`
2. Copy an existing `.book-container` div
3. Update the book title, symbol, tagline, and blurb
4. Add appropriate `data-book` attribute for tracking

### Modifying Contact Forms
All contact forms use `mailto:` links. To change the email:

1. Find all instances of `paulcastro@paulcastro.org`
2. Replace with your preferred email address
3. Forms will open the user's default email client

### Facebook Page Integration
To update the Facebook page:

1. Open `social.html`
2. Find the `.fb-page` div
3. Update the `data-href` attribute with your Facebook page URL
4. Update the Facebook page ID in the fallback link

## 📧 Contact Form Configuration

The contact forms use the `mailto:` protocol which:
- Opens the user's default email client
- Pre-fills recipient, subject, and message
- Works on all devices and browsers
- Requires no server-side processing

For more advanced form handling, consider:
- **Formspree**: Easy form backend service
- **Netlify Forms**: If hosting on Netlify
- **EmailJS**: Client-side email service
- **Google Forms**: Embedded form solution

## 🚨 Troubleshooting

### Video Not Playing
- Ensure `background-home.mp4` is in the root directory
- Check file format (MP4 H.264 recommended)
- Verify file size (< 50MB for GitHub Pages)
- Check browser autoplay policies

### Facebook Plugin Not Loading
- Verify Facebook page is public
- Check Facebook page ID in the code
- Ensure internet connection for external scripts
- Fallback content will display if plugin fails

### Animations Not Working
- Check browser compatibility (modern browsers recommended)
- Verify JavaScript files are loading correctly
- Check browser console for errors
- Ensure CSS animations are supported

### Mobile Issues
- Test on actual devices, not just browser dev tools
- Check touch event handling
- Verify responsive breakpoints
- Test form functionality on mobile

## 🔄 Updates and Maintenance

### Adding New Content
1. **New Books**: Update `works.html` and add to book grid
2. **Blog Posts**: Add to social media updates feed
3. **About Updates**: Modify story cards in `about.html`
4. **New Pages**: Follow existing HTML structure and styling

### Performance Optimization
- Optimize images and videos for web
- Minify CSS and JavaScript for production
- Enable GitHub Pages compression
- Monitor loading times

### SEO Improvements
- Add meta descriptions to each page
- Include Open Graph tags for social sharing
- Create XML sitemap
- Add structured data markup

## 📞 Support

For questions about this website setup:
- **Email**: paulcastro@paulcastro.org
- **GitHub Issues**: Submit issues in the repository
- **Documentation**: Refer to this README file

## 📄 License

This website template is created for Paul Castro's personal use. The design and code structure can be adapted for similar author websites with proper attribution.

---

**Happy Writing! May your fantasy worlds captivate readers across the digital realm!** ⚔️📚✨
