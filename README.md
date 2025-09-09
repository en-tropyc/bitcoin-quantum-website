# Bitcoin Quantum Website

A modern, responsive website for Bitcoin Quantum built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Homepage**: Hero section with key features and call-to-action
- **Introduction**: Detailed explanation of Bitcoin Quantum and quantum-resistant cryptography
- **Resources**: Wallets, exchanges, tools, and developer resources
- **FAQ**: Interactive frequently asked questions with category filtering
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Typography**: Uses Manrope, DM Sans, and DM Mono fonts
- **Quantum-Resistant Branding**: Professional design reflecting security and innovation

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern utility-first styling
- **Google Fonts**: Manrope, DM Sans, and DM Mono
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── introduction/
│   │   │   └── page.tsx        # Introduction page
│   │   ├── resources/
│   │   │   └── page.tsx        # Resources page
│   │   ├── faq/
│   │   │   └── page.tsx        # FAQ page
│   │   └── globals.css         # Global styles
│   └── components/
│       ├── Header.tsx          # Navigation header
│       └── Footer.tsx          # Site footer
├── public/                     # Static assets
└── package.json
```

## Pages

### Homepage (`/`)
- Hero section with Bitcoin Quantum branding
- Feature highlights (Quantum Resistant, Fast & Scalable, Community Driven)
- Call-to-action sections

### Introduction (`/introduction`)
- What is Bitcoin Quantum
- The Quantum Threat explanation
- Quantum-resistant solution details
- Key features overview

### Resources (`/resources`)
- Wallets (Core, Lite, Hardware support)
- Exchanges (Centralized and Decentralized)
- Network Tools (Block Explorer, Faucet, Mining Calculator, Network Status)
- Developer Resources (Documentation, GitHub, SDK, Community)

### FAQ (`/faq`)
- Interactive FAQ with expandable answers
- Category filtering (General, Technical, Security, Trading)
- Comprehensive answers about Bitcoin Quantum

## Customization

### Fonts
The site uses three Google Fonts configured in `src/app/layout.tsx`:
- **Manrope**: Primary headings
- **DM Sans**: Body text and UI elements
- **DM Mono**: Code and monospace text

### Colors
Primary color scheme defined in `src/app/globals.css`:
- Primary: `#4d65ff` (blue)
- Gradients: Blue to purple combinations
- Semantic colors for different sections

### Styling
Built with Tailwind CSS v4 using the new `@theme` directive for custom configuration.

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The project is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Development

### Adding New Pages
1. Create new directory in `src/app/`
2. Add `page.tsx` file
3. Update navigation in `src/components/Header.tsx`

### Styling Guidelines
- Use Tailwind utility classes
- Follow the established color scheme
- Use appropriate font classes (`font-manrope`, `font-dm-sans`, `font-dm-mono`)
- Maintain responsive design patterns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
