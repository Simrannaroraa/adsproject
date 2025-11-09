## 📌 Project Overview

This project is a full-stack data science application that analyzes the Netflix content library. It consists of two main parts:

1.  **A Data Science Pipeline:** A Google Colab notebook (`.ipynb`) that performs in-depth Exploratory Data Analysis (EDA), data cleaning, and builds a **Random Forest Classifier** to predict a title's content rating.
2.  **A Full-Stack Web Application:** A web app built with React and a Flask API that allows users to interact with the trained model, get AI-powered movie recommendations, and view key data visualizations.

## ✨ Key Features

* **Secure Authentication:** User login, sign-up, and logout functionality using **Firebase Authentication**.
* **Content Rating Predictor:** A form that sends user input (e.g., *type, release year, director*) to a Flask API, which returns a predicted rating from the trained ML model.
* **AI-Powered Recommendations:** A chat-like interface that connects to a generative AI to provide dynamic movie/show recommendations based on natural language queries.
* **EDA Dashboard:** An internal dashboard page displaying key visualizations (built with Plotly) from the data analysis.
* **In-Depth Analysis:** A complete Google Colab notebook showing all steps from data cleaning to model training and evaluation.

## 💻 Technology Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend (API):** Flask, Python
* **Data Science:** Google Colab, Scikit-learn, Pandas, NumPy, Plotly
* **Authentication:** Firebase
* **BI Tool:** Power BI (for external dashboard)
  ## 🚀 How to Run This Project Locally

### Prerequisites

* Python 3.8+
* Node.js v16+
* A Google Firebase project (for authentication)

# 1. Open a new terminal and navigate to the frontend folder
cd web-app/frontend

# 2. Install Node.js dependencies
npm install

# 3. Create a .env file in the /frontend/ directory
#    You must get these values from your own Supabase project.
touch .env

# 4. Add your Supabase config keys to the .env file
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
VITE_SUPABASE_PROJECT_ID="your-supabase-project-id"


# 5. Run the React development server
npm run dev

# Your app will now be running on http://localhost:5173

### 1. Backend (Flask API) Setup

The backend serves the trained machine learning model.

```bash
# 1. Navigate to the backend folder
cd web-app/backend


# 3. Install required Python packages
pip install flask scikit-learn pandas

# 4. Run the Flask server
python api.py

# Your API will now be running on [http://127.0.0.1:5000](http://127.0.0.1:5000)



