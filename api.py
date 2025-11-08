from flask import Flask, request, jsonify
import os, random, traceback
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.utils import resample
from flask_cors import CORS
from dotenv import load_dotenv

# ====================================
# INIT
# ====================================
load_dotenv()
app = Flask(__name__)
CORS(app)

# ======== ML Model Globals =========
model = None
le = None
TRAINING_COLUMNS = None
balanced_df = None

TOP_K_FEATURES = 20
DURATION_THRESHOLD = 20
MAX_DURATION = 500

# ======== Load + Train Prediction Model =========
def load_and_train_model():
    global model, le, TRAINING_COLUMNS, balanced_df
    try:
        df = pd.read_csv("netflix_titles.csv")
    except FileNotFoundError:
        print("❌ netflix_titles.csv not found.")
        return

    for col in ["director", "cast", "country", "rating", "duration", "listed_in"]:
        df[col] = df[col].astype(str).str.strip().replace("nan", pd.NA).fillna(df[col].mode()[0])

    df["duration_int"] = df["duration"].str.extract(r"(\d+)", expand=False).fillna("0").astype(int)
    df["director_single"] = df["director"].str.split(",").str[0].str.strip()
    df["cast_main"] = df["cast"].str.split(",").str[0].str.strip()
    df["listed_in_main"] = df["listed_in"].str.split(",").str[0].str.strip()
    df["type_country"] = df["type"] + "_" + df["country"]
    df["director_activity"] = df["director_single"].map(df["director_single"].value_counts())

    top_countries = df["country"].value_counts().head(TOP_K_FEATURES).index
    df["country_reduced"] = df["country"].apply(lambda x: x if x in top_countries else "Other_Country")

    top_directors = df["director_single"].value_counts().head(TOP_K_FEATURES).index
    df["director_reduced"] = df["director_single"].apply(lambda x: x if x in top_directors else "Other_Director")

    top_cast = df["cast_main"].value_counts().head(TOP_K_FEATURES).index
    df["cast_reduced"] = df["cast_main"].apply(lambda x: x if x in top_cast else "Other_Cast")

    def simplify_rating(r):
        r = r.strip().upper()
        if r in ["TV-MA", "R", "NC-17", "UR", "NR", "A"]:
            return "Adult_Mature (TV-MA / R)"
        elif r in ["PG-13", "PG", "TV-PG", "TV-14", "TV-G", "G", "TV-Y7", "TV-Y7-FV", "M"]:
            return "Teen_Family (PG-13 / TV-14)"
        else:
            return "Kids_Young (TV-Y / G)"

    df["rating_simplified"] = df["rating"].apply(simplify_rating)

    min_count = df["rating_simplified"].value_counts().min()
    balanced_df = pd.concat([
        resample(df[df["rating_simplified"] == cls], replace=False, n_samples=min_count, random_state=42)
        for cls in df["rating_simplified"].unique()
    ])

    le = LabelEncoder()
    balanced_df["rating_encoded"] = le.fit_transform(balanced_df["rating_simplified"])

    features = [
        "type", "country_reduced", "release_year", "duration_int",
        "cast_reduced", "director_activity", "type_country",
        "director_reduced", "listed_in_main"
    ]

    X = pd.get_dummies(balanced_df[features], drop_first=True)
    y = balanced_df["rating_encoded"]
    TRAINING_COLUMNS = X.columns.tolist()

    model = RandomForestClassifier(n_estimators=300, max_depth=30, random_state=42, class_weight="balanced")
    model.fit(X, y)
    print("✅ Model trained successfully!")

load_and_train_model()

# ======== Routes =========
@app.route("/")
def home():
    return "✅ Netflix Prediction + Recommendation API running!"

@app.route("/predict", methods=["POST"])
def predict():
    global model, le, TRAINING_COLUMNS, balanced_df
    if model is None:
        return jsonify({"error": "Model not loaded."}), 500

    data = request.get_json()
    genres_str = data.get("genre", "").strip()
    duration = data.get("duration", 0)
    if duration <= 0 or duration > MAX_DURATION:
        return jsonify({"error": f"Duration must be between 1 and {MAX_DURATION}."}), 400

    genres = [g.strip().title() for g in genres_str.split(",")]
    primary_genre = genres[0]
    inferred_type = "Movie" if duration > DURATION_THRESHOLD else "TV Show"

    def get_random_top_k(series, k=5):
        try:
            return random.choice(series.value_counts().head(k).index.tolist())
        except IndexError:
            return series.mode()[0]

    random_country = get_random_top_k(balanced_df["country_reduced"])
    random_director = get_random_top_k(balanced_df["director_reduced"])
    random_cast = get_random_top_k(balanced_df["cast_reduced"])

    sample = pd.DataFrame({
        "type": [inferred_type],
        "country_reduced": [random_country],
        "release_year": [2020],
        "duration_int": [duration],
        "cast_reduced": [random_cast],
        "director_activity": [balanced_df["director_activity"].mean()],
        "type_country": [f"{inferred_type}_{random_country}"],
        "director_reduced": [random_director],
        "listed_in_main": [primary_genre]
    })

    sample_encoded = pd.get_dummies(sample, drop_first=True)
    sample_aligned = sample_encoded.reindex(columns=TRAINING_COLUMNS, fill_value=0)

    pred_encoded = model.predict(sample_aligned)[0]
    final_pred_label = le.inverse_transform([pred_encoded])[0]

    details = f"Inferred Type: {inferred_type}, Duration: {duration}, Primary Genre: {primary_genre}."
    HIGH_RISK_GENRES = ["HORROR", "THRILLER"]
    LOW_RISK_GENRES = ["COMEDY", "ROMANCE", "DOCUMENTARY"]
    KIDS_GENRES = ["ANIMATION", "KIDS", "CHILDREN", "FAMILY"]

    if primary_genre.upper() in KIDS_GENRES:
        final_pred_label = "Kids_Young (TV-Y / G)"
    elif primary_genre.upper() in HIGH_RISK_GENRES:
        final_pred_label = "Adult_Mature (TV-MA / R)"
    elif primary_genre.upper() in LOW_RISK_GENRES and "Adult" in final_pred_label:
        final_pred_label = "Teen_Family (PG-13 / TV-14)"

    return jsonify({"prediction": final_pred_label, "details": details})


if __name__ == "__main__":
    # Allow running the Flask app directly: `python api.py`
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Starting Flask server on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port)


