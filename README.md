# 🌾 KrishiMitra - Farmer Assistance Platform

A full-stack web application designed to help Indian farmers with crop management, weather forecasts, market prices, government schemes, and community support.

---

## ✨ Features

### 🌾 **Crops Management**
- Detailed crop information (sowing time, harvesting, water requirements)
- Pest and disease management guides
- Crop recommendations based on location and soil type

### 🌤️ **Weather Forecasting**
- Real-time weather updates
- 7-day weather forecast
- Weather alerts for farming activities

### 💰 **Market Prices**
- Live commodity prices
- Market trends and analysis
- Price predictions

### 🎯 **Government Schemes**
- Information about government agricultural schemes
- Eligibility criteria
- Application guidelines

### 👥 **Community Forum**
- Post farming experiences and problems
- Get advice from other farmers
- Follow other farmers
- Like and comment on posts
- Filter posts by crop type, state, category

### 👤 **User Profile**
- Manage profile information
- Edit name and location
- View your posts and followers

### 🤖 **AI Chatbot**
- Ask farming-related questions
- Get instant answers powered by Ollama
- Support for English and Hindi

---

## 🛠️ **Tech Stack**

### **Frontend**
- React 18 with Vite
- React Router for navigation
- i18n for multi-language support (English & Hindi)
- CSS3 for styling
- Fetch API for backend communication

### **Backend**
- Spring Boot 3.2
- Java 17
- MySQL 8.0
- JWT for authentication
- Ollama for AI chatbot

### **Database**
- MySQL 8.0
- Tables: users, posts, comments, followers, post_likes

---

## 📦 **Installation**

### **Prerequisites**
- Node.js (v16+)
- Java 17
- MySQL 8.0
- Ollama (for chatbot)

### **Backend Setup**

1. **Navigate to backend:**
```bash
   cd backend
```

2. **Configure MySQL:**
    - Create database: `krishimitra_db`
    - Update `application.properties`:
```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/krishimitra_db
     spring.datasource.username=root
     spring.datasource.password=your_password
```

3. **Run backend:**
```bash
   mvn clean install
   mvn spring-boot:run
```

Backend runs on: `http://localhost:8080`

### **Frontend Setup**

1. **Navigate to frontend:**
```bash
   cd frontend
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Run frontend:**
```bash
   npm run dev
```

Frontend runs on: `http://localhost:5173`

### **Ollama Setup (for Chatbot)**

1. **Install Ollama:** https://ollama.ai
2. **Pull a model:**
```bash
   ollama pull orca-mini
```
3. **Start Ollama:**
```bash
   ollama serve
```

---


## 🚀 **How to Use**

### **1. Registration & Login**
- Create account with email and password
- Login with credentials
- Profile is automatically created

### **2. Browse Community Posts**
- View posts from farmers
- Filter by crop type, state, category
- Search for specific posts

### **3. Create Posts**
- Click "Create Post" button
- Add title, content, images/videos
- Select crop type and category
- Post is instantly visible to other farmers

### **4. Follow Farmers**
- Click "Follow" button on any post
- See farmer's other posts
- Get notifications of their new posts

### **5. Use Chatbot**
- Click chatbot icon (💬) in bottom right
- Ask farming questions
- Get instant answers powered by AI

### **6. Manage Profile**
- Go to Profile page
- Edit name and location
- View your farming posts

---

## 📱 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `PUT /api/auth/update-profile` - Update profile

### **Community**
- `GET /api/community/posts` - Get all posts
- `POST /api/community/posts` - Create post
- `DELETE /api/community/posts/{id}` - Delete post
- `POST /api/community/posts/{id}/like` - Like post
- `GET /api/community/follow/check/{userId}` - Check follow status
- `POST /api/community/follow/{userId}` - Follow user
- `DELETE /api/community/follow/{userId}` - Unfollow user

### **Chatbot**
- `POST /api/chatbot/ask` - Ask question
- `GET /api/ollama/status` - Check Ollama status

---


## 🔐 **Security Features**

- JWT token-based authentication
- Password hashing with BCrypt
- CORS enabled for localhost
- Only post owners can delete posts
- Follow verification

---

## 🚧 **Future Enhancements**

- [ ] Real-time notifications
- [ ] Video tutorials for farmers
- [ ] Advanced crop analytics
- [ ] Mobile app (React Native)
- [ ] Payment integration for premium features
- [ ] Email notifications
- [ ] Google OAuth integration
- [ ] Crop disease detection using ML

---

## 📸 **Screenshots**

### Home Page
- Beautiful hero section
- Quick actions carousel
- Daily farming tips
- Success stories

### Community Page
- Post feed
- Filters (crop, state, category)
- Search functionality
- Like and follow features

### Chatbot
- AI-powered farming assistant
- English & Hindi support
- Instant responses

---

## 🤝 **Contributing**

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 **Support**

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@krishimitra.com

---

## 👨‍💻 **Author**

**Shruti Buwade**
- GitHub: [@shrutibuwade](https://github.com/shrutibuwade)
- Email: shrutibuwade01@gmail.com

---

## 🙏 **Acknowledgments**

- Spring Boot documentation
- React documentation
- Ollama for AI capabilities
- MySQL community
- All contributing farmers

---

**Happy Farming! 🌾**