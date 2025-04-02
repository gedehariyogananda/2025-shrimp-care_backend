```bash
// select by relation
options.relation = [
        "diagnosisResult.disease",
        "diagnosisResult.diagnosisDetail.symptom",
        "disease",
      ];

// relation options with selected fields
 options.relationOptions = [
        { relation: "disease", fields: ["id", "name_disease", "code_disease"] },
        { relation: "diagnosisResult", fields: ["id", "diagnosis_id", "disease_id", "percentage"] },
        { relation: "diagnosisDetail", fields: ["id", "diagnosis_result_id", "symptom_id"] },
        { relation: "symptom", fields: ["id", "name_symptom", "code_symptom"] },
];

// all fields main fields
options.fields = ["id", "user_id", "threshold", "best_disease_id", "best_percentage_disease"];
```
