# 🧠 DeepChallenge – A Gamified E-Learning Platform

**DeepChallenge** is a full-stack educational web application designed to make learning to code interactive, competitive, and rewarding. Inspired by platforms like Codecademy and built as a graduation project by a team of MIS students, this app brings together structured curriculum delivery, a built-in code editor, and real-time coding duels.

---

## 🎯 Project Vision

Many learners struggle to stay engaged on traditional e-learning platforms due to passive formats, lack of motivation, and financial barriers that limit long-term commitment. **DeepChallenge** was born from these real challenges — to empower learners through interactivity, practicality, and reward-driven motivation.

The platform delivers an all-in-one, split-screen learning experience that combines curriculum, code editor, and output console in a single interface — helping learners concentrate, visualize, and stay immersed.

Beyond that, DeepChallenge introduces two key systems:

- **🪙 Points System** – Users earn points by completing lesson-based coding tasks. This creates a measurable, gamified sense of progression.

- **⚔️ Challenge System** – Learners can stake their earned points in real-time, 1v1 coding challenges against peers. For example, both players stake 100 points; the winner takes 200, while the loser forfeits theirs.

These points can later be redeemed for:
- Unlocking premium courses or tools  
- Gaining community rewards  
- Or even converting into real financial value (prototype stage)

The ultimate mission is to remove the burden of financial stress from learners — whether students or job seekers — and instead let passion and performance lead the way. Challenges create passion. Rewards create sustainability. **DeepChallenge combines both.**

---

## 🚀 Key Features

### 📚 Curriculum Learning
- Embedded chapter-based learning modules
- Each chapter includes lessons + coding tasks
- Progression tied to solving challenges

### 🖥️ Interactive IDE
- Built-in code editor with syntax highlighting
- Split-screen layout for:
  - Left: curriculum/task view
  - Right: live editor + console output

### 🏆 Gamification
- Earn points by completing lessons correctly
- Redeem points for:
  - Premium features
  - Competitive challenges
  - Real-world rewards (optional, prototype)

### ⚔️ Real-Time 1v1 Challenges
- Socket.IO powered multiplayer system
- Players can stake their points
- Time-limited, synchronous coding battles
- Win/loss affects user score and progression

---

## 🧰 Tech Stack

| Layer       | Tech Used                  |
|-------------|----------------------------|
| Frontend    | React.js, Bootstrap, CSS   |
| Backend     | Node.js, Express.js        |
| Realtime    | Socket.IO                  |
| Database    | MongoDB                    |
| Dev Tools   | Git, GitHub, Postman       |

---


## ⚙️ Getting Started

To run this project locally:

### 1. Clone the Repo

```bash
git clone https://github.com/h4shiim/DeepChallenge.git


cd server
npm install

cd ../client
npm install

cd DeepChallenge
npm install
npm run dev


