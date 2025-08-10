<div align="center">
  <h1>🚀 Space Travel</h1>
  <p><em>Explore the cosmos and document your interstellar journeys</em></p>
  
  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
</div>

---

## 🌟 About

**Space Travel** is a full-stack web application that allows users to document and explore their imaginary space journeys. Built as a comprehensive study project, it demonstrates modern web development practices with a beautiful, space-themed interface.

### ✨ Key Features

- 🛸 **Planet Discovery** - Browse and explore various cosmic destinations
- 📝 **Travel Journals** - Document your space adventures with rich stories
- 🤖 **AI-Powered Writing** - Enhance your stories with Ollama AI integration
- 🖼️ **Image Management** - Upload and manage planet images
- ⭐ **Favorites System** - Mark your favorite destinations
- 📅 **Date Filtering** - Filter travels by visit dates
- 🔐 **Secure Authentication** - JWT-based user authentication
- 🌌 **NASA Integration** - Real space imagery from NASA's API

---

## 🛠️ Tech Stack

### Frontend

| Core Framework | Styling & UI | Tools & Build |
|----------------|--------------|---------------|
| ⚛️ React.js 18 | 🎨 TailwindCSS | 📦 PostCSS |
| 🔷 TypeScript | 📱 Responsive Design | 🔧 ESLint |
| ⚡ Vite | 🌈 Glassmorphism Effects | 💅 Prettier |

### Backend

| Core Framework | Database & Auth | AI & External APIs |
|----------------|-----------------|-------------------|
| 🚀 Fastify | 🍃 MongoDB | 🤖 Ollama (LLaMA 3.2) |
| 🔷 TypeScript | 🔐 JWT Tokens | 🛰️ NASA API |
| 🗃️ Prisma ORM | 🔒 bcrypt | 📁 Multer File Upload |

### Testing & Development

- 📡 **Insomnia** - API testing and development
- 🔍 **Zod** - Schema validation

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB instance
- Ollama (for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/space-travel.git
   cd space-travel
   ```

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your environment variables
   npx prisma generate
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd frontend/space-travel
   npm install
   cp .env.example .env
   # Configure your environment variables
   npm run dev
   ```

4. **Setup Ollama (for AI features)**

   ```bash
   # Install Ollama
   ollama serve
   ollama pull llama3.2
   ```

### Environment Variables

**Backend (.env)**

```env
DATABASE_URL=""
JWT_SECRET="your-secret-key"
PORT=3333
NASA_API_KEY="your-nasa-api-key"
```

**Frontend (.env)**

```env
VITE_API_URL="http://localhost:3333"
```

---

## 📱 Features Showcase

### 🏠 Dashboard

- View all your documented space travels
- Filter by date ranges
- Search through your journeys

### ✍️ Travel Documentation

- Create detailed travel logs
- Upload stunning planet images
- AI-powered story enhancement
- Rich text editing capabilities

### 🤖 AI Integration

- Powered by Ollama and LLaMA 3.2
- Intelligent text improvement
- Story enhancement suggestions
- Natural language processing

### 🛰️ NASA Integration

- Real space imagery
- Astronomical picture of the day

---

## 🗂️ Project Structure

```text
space-travel/
├── frontend/space-travel/          # React frontend application
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Main application pages
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── utils/                 # Utility functions
│   │   └── api/                   # API integration
│   └── public/                    # Static assets
└── backend/                       # Fastify backend application
    ├── src/
    │   ├── controller/            # Route controllers
    │   ├── service/               # Business logic
    │   ├── middleware/            # Custom middleware
    │   ├── schemas/               # Zod validation schemas
    │   └── utils/                 # Backend utilities
    └── prisma/                    # Database schema and migrations
```

---

## 🤝 Contributing

This is a study project, but contributions and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📈 Learning Objectives

This project demonstrates proficiency in:

- ✅ **Full-stack TypeScript development**
- ✅ **Modern React patterns and hooks**
- ✅ **RESTful API design with Fastify**
- ✅ **Database design with Prisma and MongoDB**
- ✅ **Authentication and authorization**
- ✅ **File upload and management**
- ✅ **AI integration and prompt engineering**
- ✅ **External API integration**
- ✅ **Responsive UI design**
- ✅ **Testing strategies**

---

## 📄 License

This project is for **educational purposes** and is available under the MIT License.

---

<div align="center">
  <p>Made with ❤️ for learning and exploration</p>
  <p><em>🌌 "The universe is not only stranger than we imagine, it is stranger than we can imagine." - J.B.S. Haldane</em></p>
</div>
