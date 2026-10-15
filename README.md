# 🎨 DoodleDraw.io — Frontend

An interactive, real-time collaborative canvas application featuring a modern **Neumorphic design system**. Built with **React**, **Vite**, **Tailwind CSS**, and **Socket.io-client**, DoodleDraw allows users to register, log in, create or join rooms, draw together live on a synchronized canvas, and chat in real-time.

---

## ✨ Features

- **🎨 Neumorphic UI Design:** Modern, tactile, soft-shadow interface tailored for smooth user interaction.
- **🔐 User Authentication:** Secure signup, login, and session persistence backed by JWT cookies.
- **🏠 Room Management:** Easily create private or shared drawing rooms with join-code validation.
- **🖌️ Real-time Drawing Canvas:**
  - Multiple drawing tools (Pencil, Eraser, Shapes, Brush size selector).
  - Multi-user live cursor and drawing synchronization.
  - Canvas clearing and color palette options.
- **💬 Live Chat:** Integrated room sidebar for real-time messaging using WebSockets.
- **⚡ Fast Performance:** Built on Vite and optimized for zero-latency canvas updates.

---

## 🛠️ Tech Stack

- **Framework:** [React](https://react.dev/) (v18+)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Real-Time Communication:** [Socket.io-client](https://socket.io/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📁 Folder Structure

```text
DoodleDraw_Frontend/
├── public/                # Static assets & favicons
├── src/
│   ├── assets/            # Fonts, images, and visual assets
│   ├── components/        # Reusable UI components (Buttons, Inputs, Canvas, Chat Sidebar)
│   ├── context/           # React Context (AuthContext, SocketContext, RoomContext)
│   ├── hooks/             # Custom React Hooks (useCanvas, useSocket)
│   ├── pages/             # Route pages (Auth, Dashboard, Room Canvas)
│   ├── services/          # Axios API configuration and endpoint helpers
│   ├── utils/             # Canvas drawing helpers & formatting utilities
│   ├── App.jsx            # Main App container & Route declarations
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind imports & Neumorphic custom utility classes
├── .env.example           # Environment template
├── index.html             # HTML entry template
├── tailwind.config.js     # Tailwind configuration & custom neumorphic shadows
├── vite.config.js         # Vite build configuration
└── package.json           # Project dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

---

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/InzmamKhan/DoodleDraw_Frontend.git
   cd DoodleDraw_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory by copying the `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your backend server URLs:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Runs the app in development mode with HMR (Hot Module Replacement).
- **`npm run build`**: Bundles and optimizes the application for production inside the `dist` folder.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs ESLint to check for code formatting errors.

---

## 🌍 Production Environment Variables

When deploying to platforms like **Vercel**, ensure the following environment variables are set in the dashboard:

| Variable | Description | Production Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | Express REST API backend base URL | `https://doodledraw-backend.onrender.com` |
| `VITE_SOCKET_URL` | Socket.io backend server URL | `https://doodledraw-backend.onrender.com` |

---

## 🤝 Contributing

Contributions are welcome!
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.