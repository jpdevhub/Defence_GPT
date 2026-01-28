# 🛡️ DefenseGPT - Military AI Assistant

A professional Next.js chatbot application specialized in defense, military affairs, and geopolitical strategy.

![DefenseGPT](./app/assets/sword-and-shield-logo-illustration-free-vector.jpg)

## ✨ Features

- 🤖 **AI-Powered Responses**: Uses GPT-4 via OpenRouter for authoritative defense analysis
- 🎯 **Military Expertise**: Specialized in defense technologies, military doctrines, and geopolitics
- 💬 **Real-time Chat**: Smooth chat interface with proper scrolling and message handling
- 📱 **Responsive Design**: Military-inspired UI that works on all devices
- 🚀 **Production Ready**: Optimized for deployment on Vercel, Netlify, or any Node.js host

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Custom CSS with military theme
- **AI**: OpenRouter API (GPT-4)
- **Runtime**: Node.js 18+

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- An OpenRouter API key ([Get one here](https://openrouter.ai/keys))

### Local Development

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd nextjs-armygpt
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenRouter API key
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Push code to GitHub/GitLab
   - Import project in Vercel Dashboard

2. **Environment Variables**
   - Add `OPENROUTER_API_KEY` in Vercel settings
   - Deploy automatically

3. **Custom Domain** (Optional)
   - Configure in Vercel dashboard

### Other Platforms

#### Netlify
```bash
npm run build
# Deploy the .next folder
```

#### Railway/Render
```bash
# Use these build commands:
# Build: npm run build
# Start: npm start
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📋 Environment Variables

```bash
# Required
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional (for future database features)
ASTRA_DB_API_ENDPOINT=your_astra_db_endpoint
ASTRA_DB_APPLICATION_TOKEN=your_astra_db_token
```

## 🎯 API Usage

### Chat Endpoint

```bash
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {"role": "user", "content": "What are the latest defense technologies?"}
  ]
}
```

### Response Format

```json
{
  "message": {
    "role": "assistant",
    "content": "Based on current defense developments..."
  }
}
```

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Customization

### Modify AI Persona
Edit the system message in [`app/api/chat/route.ts`](app/api/chat/route.ts#L26-L42)

### Update UI Theme
Customize styles in [`app/global.css`](app/global.css)

### Change Prompt Suggestions
Modify [`app/components/PromptSuggessionsRow.tsx`](app/components/PromptSuggessionsRow.tsx)

## 🔒 Security

- ✅ API keys stored securely in environment variables
- ✅ Input validation on all API endpoints
- ✅ Error handling without exposing internal details
- ✅ CORS headers configured properly

## 📊 Performance

- ✅ Optimized bundle size (~50KB gzipped)
- ✅ Server-side rendering for fast initial load
- ✅ Automatic code splitting
- ✅ Responsive design for all devices

## 🐛 Troubleshooting

### Common Issues

**API Not Working**
```bash
# Check environment variables
echo $OPENROUTER_API_KEY
# Verify API key is valid at openrouter.ai
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Hydration Errors**
```bash
# Already fixed with useEffect hooks
# Check console for any remaining issues
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🆘 Support

- 📧 Email: your-email@domain.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/repo/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/repo/discussions)

---

**DefenseGPT** - Your AI-powered defense and military affairs assistant 🛡️