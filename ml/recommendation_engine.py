"""Optional scikit-learn career recommendation prototype for CareerPath Phase 2."""
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

careers = pd.DataFrame([
    ["Data Science","python statistics machine learning sql data ai analytics"],
    ["Machine Learning Engineer","python machine learning apis cloud ai coding systems"],
    ["Data Analyst","sql excel data visualization python analytics business"],
    ["Business Analytics","sql statistics data visualization business analytics communication"],
    ["UI/UX Designer","figma ux research prototyping visual design creativity"],
    ["Cybersecurity Analyst","networking linux security python systems technology"],
], columns=["career","profile"])

def recommend(user_profile, top_n=3):
    corpus = careers["profile"].tolist() + [user_profile]
    matrix = TfidfVectorizer().fit_transform(corpus)
    scores = cosine_similarity(matrix[-1], matrix[:-1]).flatten()
    out = careers.copy()
    out["score"] = scores
    return out.sort_values("score", ascending=False).head(top_n)

if __name__ == "__main__":
    print(recommend("python sql machine learning ai data problem solving").to_string(index=False))
