#Semantic suggestions
# import time
# import difflib

# start_time = time.time()
# sm = difflib.SequenceMatcher(None)
# # model = SentenceTransformer('nli-roberta-base')
# # # # nlp = spacy.load("en_core_web_lg")
# print("Model loading time :",time.time() - start_time)

# start_time1 = time.time()

# key_list = ["pathological_t_staging","non_bloody_cyst_fluid","hr_value","(1\u20133)_positive_axillary_nodes","ypn_staging_after_preoperative_systemic_therapy","clinical_n_staging","ypt_staging_after_preoperative_systemic_therapy","birads_score","premenopausal","her2_value","ado_trastuzumab_emtansine_discontinued_for toxicity","peau_d_orange","doctor_choice","negative_margin_lt_1mm","germline_brca1/2_mutation","rtpcr_recurrence_score_(16-25)","edema","palpable_mass","rtpcr_recurrence_score_lte_15","erythema","pathology_findings","tumor_1-2.9cm","preoperative_sysmetic_therapy","negative_or_benign","bcs_not_possible","margin_gte_1mm","bcs_possible","scaling","discordant_with_imaging","presentation_in_men","symptom_persists","spontaneous","tumor_lte_5cm","concordant_with_imaging","pembrolizumab_containing_regimen_given_preoperatively","malignant_axillary_lymph_node(non_breast_origin)","operable_breast_cancer","symptomatic","mass_recurs","low_risk","extensive_lymphovascular_invasion","margin_lt_1mm",">=4_positive_axillary_nodes","skin_thickening","skin_ulceration","average_risk","negative_axillary_nodes","central_tumor","inflammatory_breast_cancer","pr_value","pathological_n_staging","yes_to_all","postmenopausal","tumor_operable","skin_changes","invasive_breast_cancer_m0","risk_for_hereditary_breast_cancer","stable/resolves","bilateral","no_systemic_disease","candidate_for_chemotherapy","clinically_suspicious","age_gte","m_staging","breast_implant-related_symptoms","age_lt","symptom_resolves","nipple_excoriation","stable_or_decrease_in_size","rtpcr_recurrence_score_gte_26","adjuvant_abemaciclib","grade","malignant_axillary_lymph_node_and_breast_cancer","axillary_mass","non_traumatic_bloody_fluid","residual_disease","increased_risk","tumor_0.6-1.0cm","malignant","mri_findings","rtpcr_not_done","cytology","high_risk","mass_persists","negative_margin","no_palpable_mass","primary","complete_pathological_response","rtpcr_recurrence_score_lt_26","significant_increase_in_size_or_suspicion","er_value","testing_json_type_value","persistent_or_sever_breast_pain","aspiration","secondary","image_findings","benign","suspicious","germline_brca1/2_mutation_cps+eg_score_gte_3","tumor_gt_0.5cm","note","category_of_evidence_and_consensus","tumor_gte_3cm","adjuvant_endocrine_therapy_(category 1)","preoperative_systemic_therapy","low_clinical_suspicion","malignant_axillary_lymph_node(breast_origin)","asymptomatic","systemic_disease","tumor_gt_1cm","mass_resolves","positive_margin","response_to_preoperative_systemic_therapy","clinical_findings","amenable_to_core_needle_biopsy","tumor_gt_5cm","clinical_t_staging","unilateral","tumor_lte_0.5cm","adjuvant_olaparib","tumor_lt_1cm","paget_disease","<10_axillary_nodes_removed","triple_negative_breast_cancer","mri_taken","symptoms_for_metastatic_disease"]


# text = "BI-RADS 1-2"
# text = text.lower()
# text = text.replace("-","")
# text = text.replace("≥"," ")
# text = text.replace("<"," ")
# text = text.replace(">"," ")
# text = text.replace("≤"," ")

# sm.set_seq2(text)

# score_list = {}
# for x in key_list:
#     xx = x.replace("_"," ")
#     sm.set_seq1(xx)
#     if(sm.ratio()>0.4):
#         score_list[x] = round(sm.ratio(),2)

# print(score_list)
# print("Computation :",time.time() - start_time1)


#Rename nodes

import pandas as pd
from py2neo import *
import collections

def getnodes():
	getnode_dict = {}
	ntopic = "NCCN Evidence blocks - Breast Cancer"
	query = "MATCH (n) where n.topic = '{}' return n.name, id(n)".format(ntopic)
	record = graph.run(query).to_data_frame()
	req_df = record.iloc[:,0:2]
	req_df.rename({'n.name':'node_name','id(n)':'node_id'},axis=1,inplace=True)
	for i in range(req_df.shape[0]):
		getnode_dict[int(req_df["node_id"][i])] = req_df["node_name"][i]

	return getnode_dict

def rename_nodes(id,existing_name):
    new_name = existing_name.replace("\n"," ")
    query = "match (n) where id(n) = {} and n.name = '{}' set n.name ='{}'".format(id,existing_name,new_name)
    graph.run(query)

def order_DN():
    query = "match (n:DECISION_NODE) return id(n) as dn_ids"
    record = graph.run(query).to_data_frame()
    #print(record.shape[0])
    for i in range(record.shape[0]):
        new_dn = "Decision Node "+str(i+1)
        q1 = "match (n) where id(n) = {} set n.name ='{}'".format(record.iloc[i,0],new_dn)
        graph.run(q1)
    return "Done"

def node_unique():
    query = "match (n) return n.name as names"
    record = graph.run(query).to_data_frame()
    print(record.shape)
    print([item for item,count in collections.Counter(list(record.iloc[:,0])).items() if count > 1])



if __name__ == "__main__":
    #uri = "neo4j+s://c822ccbf.databases.neo4j.io"
    uri = "neo4j+s://e9c642e9.databases.neo4j.io"
    user = "neo4j"
    #password = "qhbT-2MoWJhDMHcxZ-uBy1MAoinlIpm-p32Hq687BGk"
    password = "3yKkqqHaeAsy6mvk_aswwLpCPAy2O_Ep2qQQaGoAORE"
    graph = Graph(uri, auth=(user, password))
    # nodes_dict = getnodes()
    # node_keys = list(nodes_dict.keys())
    # for i in range(len(node_keys)):
    #     rename_nodes(node_keys[i],nodes_dict[node_keys[i]])
    # print(order_DN())
    node_unique()
