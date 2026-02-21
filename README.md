# LendsLog 📱💸

LendsLog is a comprehensive mobile application built with React Native and Expo. It provides an intuitive and seamless platform for users to log, manage, and track their lending and borrowing activities, ensuring transparent and hassle-free financial interactions among peers.

## 🌟 Key Features

- **Authentication & Security:** Secure login, sign-up, and mobile number verification via OTP.
- **Interactive Dashboard:** Get a quick overview of today's lends, upcoming dues, and pending installments at a glance.
- **Log Management:** Effortlessly add, track, and scrutinize lends and dues.
- **Installment Tracking:** Manage split payments and track individual installments cleanly.
- **Real-time Notifications:** Leveraging Firebase Messaging to keep you updated on upcoming and overdue logs.
- **Robust Searching & Filtering:** Easily dig through past logs with a scalable search bar and category filters.
- **Profile Management:** Manage your account details easily through a dedicated profile screen.

---

## 🛠️ Tech Stack

This project is scaffolded using **Expo** and leans on modern React Native development practices.

*   **Framework:** [React Native](https://reactnative.dev) & [Expo](https://expo.dev/) (SDK 51)
*   **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & React-Redux
*   **Data Fetching:** [Axios](https://axios-http.com/)
*   **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/)
*   **UI/UX:** Custom animated components, `react-native-reanimated`, and `react-navigation` tabs.
*   **Cloud & Notifications:** [React Native Firebase](https://rnfirebase.io/) (App & Messaging)
*   **Local Storage:** AsyncStorage

---

## 📂 Project Structure

A quick look at the file hierarchy inside the `app/` directory and surroundings:

```text
lendslog/
├── app/                  # Main Expo Router directory (file-based routing)
│   ├── (auth)/           # Authentication screens (login, sign-up, mobile verify)
│   ├── dashboard/        # Main app features (lends, dues, adding logs, profile, notifications)
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry point
├── api/                  # Axios instances and API endpoint configurations
├── components/           # Reusable UI components (Cards, Inputs, Modals, Checkboxes, etc.)
├── redux/                # Redux Toolkit store and slices for global state management
├── hooks/                # Custom React Hooks
├── contexts/             # React Context Providers
├── constants/            # Global constants and theme definitions
├── utils/                # Helper functions for formatting, validation, etc.
└── assets/               # Local media like fonts, icons, and splash screens
```

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### Prerequisites

- Node.js installed (v18 or higher recommended)
- `npm`, `yarn`, or `pnpm`
- [Expo Go](https://expo.dev/go) app installed on your physical device, or an iOS Simulator / Android Emulator running on your machine.

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd lendslog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

### Running the App

Once the development server is running, you can open the app in several ways:

- **Expo Go (Physical Device):** Open the Expo Go app and scan the QR code generated in your terminal.
- **iOS Simulator:** Press `i` in the terminal to open the app on an iOS simulator (macOS only).
- **Android Emulator:** Press `a` in the terminal to open the app on an Android emulator.
- **Web Browser:** Press `w` in the terminal to run the app in a web browser.

---

## 📜 Available Scripts

- `npm start` / `npm run dev`: Starts the Expo development server.
- `npm run android`: Starts the app directly in Android mode.
- `npm run ios`: Starts the app directly in iOS mode.
- `npm run web`: Starts the app on the web.
- `npm run lint`: Runs ESLint to find and fix problems in the project's codebase.
- `npm test`: Runs the Jest test suite in watch mode.
- `npm run dev-build` / `npm run preview-build`: Utility scripts for building with EAS (Expo Application Services).

---

## 📚 Learn More

To dive deeper into the technologies used within LendsLog, check out the following resources:

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/tutorials/quick-start)
