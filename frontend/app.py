from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Dummy symptom data
symptoms_data = [
    "Fever", "Cough", "Shortness of breath", "Fatigue", "Muscle pain", "Headache", "Sore throat", "Loss of taste", "Loss of smell",
    "Runny nose", "Sneezing", "Nausea", "Vomiting", "Diarrhea", "Abdominal pain", "Chest pain", "Dizziness", "Chills",
    "Night sweats", "Joint pain", "Skin rash", "Swelling", "Red eyes", "Blurred vision", "Numbness", "Tingling", "Weakness",
    "Confusion", "Memory loss", "Seizures", "Palpitations", "High blood pressure", "Low blood pressure", "Weight loss",
    "Weight gain", "Difficulty swallowing", "Frequent urination", "Burning urination", "Blood in urine", "Constipation",
    "Heartburn", "Bloating", "Depression", "Anxiety", "Insomnia", "Hallucinations"
]

# Dummy co-occurring symptoms mapping
co_occurring_symptoms = {
    "Fever": ["Chills", "Sweating", "Fatigue"],
    "Cough": ["Sore throat", "Runny nose", "Shortness of breath"],
    "Shortness of breath": ["Chest pain", "Fatigue", "Palpitations"],
    "Fatigue": ["Muscle pain", "Headache", "Depression"],
    "Headache": ["Nausea", "Dizziness", "Blurred vision"],
    "Abdominal pain": ["Nausea", "Vomiting", "Diarrhea"],
    "Joint pain": ["Swelling", "Skin rash", "Fatigue"],
    "Depression": ["Anxiety", "Insomnia", "Memory loss"]
}


@app.route('/search_symptoms', methods=['GET'])
def search_symptoms():
    query = request.args.get('q', '').lower()
    selected = json.loads(request.args.get('selected', '[]'))  # Parse selected symptoms list

    # Collect co-occurring symptoms
    suggested_symptoms = set()
    for symptom in selected:
        if symptom in co_occurring_symptoms:
            suggested_symptoms.update(co_occurring_symptoms[symptom])

    # Get symptoms that start with the query
    matching_symptoms = [s for s in symptoms_data if s.lower().startswith(query)]

    # Remove co-occurring symptoms from regular search results
    regular_symptoms = list(set(matching_symptoms) - suggested_symptoms)

    return jsonify({
        "suggested": list(suggested_symptoms),
        "regular": regular_symptoms
    })
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms', [])
    
    # Your prediction logic here
    prediction_result = (symptoms)
    
    return jsonify({"prediction": prediction_result})
if __name__ == '__main__':
    app.run(debug=True)
