from crypt import methods
import queue
from flask import Flask,request
from py2neo import *
from py2neo.bulk import merge_nodes
import pandas
import pandas as pd
import json
from flask_cors import CORS
import ast
import difflib


app = Flask(__name__)  # Flask constructor
CORS(app)

#testing 
#Checking
#Required node label and node name
@app.route('/nodecreate',methods = ['POST'])
def node_label_create():
	node_data = request.data
	node_data = json.loads(node_data)
	node_type = node_data["dict"]["nodetype"]
	node_name = node_data["dict"]["nodename"]
	node_hash = node_data["dict"]["hashnodename"]
	node_topic = node_data["dict"]["nodetopic"]
	a = Node(node_type,name=node_name)
	a["hash"] = node_hash
	a["topic"] = node_topic
	graph.create(a)
	return "Node with label and hash creation done!!!"

#Required node name , node label and key 
#Topic not necessasary
@app.route('/delnodeprop',methods=['POST'])
def delnodepropkey():
	del_keys = request.data
	del_keys = json.loads(del_keys)
	del_data = del_keys["delete_dict"]
	node_name = del_data["nodename"]
	del_key = del_data["prop_todel"]
	typee = del_data["nodetype"]
	query = "MATCH (p:{}) WHERE p.name='{}' REMOVE p.{}".format(typee,node_name,del_key)
	graph.run(query)
	return "Node property deleted successfully"


#Required rel ID and key 
@app.route('/delrelprop', methods = ['POST'])
def delrelpropkey():
	del_keys = request.data
	del_keys = json.loads(del_keys)
	del_data = del_keys["delete_dict"]
	rel_id = del_data["relID"]
	del_key = del_data["prop_todel"]
	#topic = del_data["topic_val"]
	#add topic here "MATCH (a)-[r]->(b) WHERE id(r) = {} and a.topic = '{}' REMOVE r.{}".format(int(rel_id),del_key,topic)
	query = "MATCH (a)-[r]->(b) WHERE id(r) = {} REMOVE r.{}".format(int(rel_id),del_key)
	graph.run(query)
	return "Relationship property deleted successfully"

#Required Relation ID
#No need of topic beacuse ID is unique and topic segregation is done on node creation itself
@app.route('/getnoderelid',methods=['POST'])
def getNodesFromRelID():
	node_dict = {}
	getnode = request.data
	getnode = json.loads(getnode)
	get_node_data = getnode["rel_dict"]
	rel_id = get_node_data["relID"]
	query = "MATCH (a)-[r]->(b) WHERE id(r) = {} RETURN a.name AS node1 , b.name AS node2".format(int(rel_id))
	record = graph.run(query).to_data_frame()
	node_dict["node1"] = record.iloc[0,0]
	node_dict["node2"] = record.iloc[0,1]
	print("Wow you have got your nodes!!")
	return node_dict

#Required Node ID
#Topic not needed since ID is used
@app.route('/nodedelete',methods = ['POST'])
def deleteNode():
	node_data = request.data
	node_data = json.loads(node_data)
	node_ids_dict = node_data["totalDict"]
	id = node_ids_dict["nodeidtodel"]
	node = graph.evaluate("MATCH (n) where id(n) = {} RETURN n".format(int(id)))
	graph.delete(node)

	return "Node deleted"

#Required Relationship ID
#Topic not needed since ID is used
@app.route('/reldelete', methods = ['POST'])
def deleteRelationship():
	rel_data = request.data
	rel_data = json.loads(rel_data)
	rel_ids_dict = rel_data["delete_dict"]
	id = rel_ids_dict["relID"]
	query ="MATCH (a)-[r]->(b) where id(r) = {} DELETE r".format(int(id))
	graph.run(query)

	return "Relationship deleted"

#Deletes all the nodes and relationship
@app.route('/deleteall',methods = ['GET'])
def detach_delete_all():
	query = "MATCH (n) DETACH DELETE n"
	graph.run(query)
	return "Deletion done all"


#Required node ID's of the 2 nodes
#Topic not needed since ID is used
@app.route('/relationshipcreate', methods = ['POST'])
def relationship_create():
    nodes = NodeMatcher(graph)
    rel_data = request.data
    rel_data = json.loads(rel_data)
    rel_ids = rel_data["idsDict"]
    node1 = rel_ids["node1"]
    node2 = rel_ids["node2"]
    get_label = "match (n) where id(n)={} or id(n) = {} return labels(n) as labels".format(node1,node2)
    label_list = graph.run(get_label).to_data_frame()
    print(label_list.head())
    labela = label_list["labels"][0][0]
    labelb = label_list["labels"][1][0]
    query = "match (a:{}),(b:{}) where id(a)={} and id(b) = {} create (a) -[r:succeeded_by]->(b)".format(labela,labelb,node1,node2)
    graph.run(query)
    return "Relationship creation done"


#Required node ID's of the 2 nodes
#Topic not needed since ID is used
@app.route('/relationpropcreate',methods=['POST'])
def relation_create_with_prop():
	nodes = NodeMatcher(graph)
	rel_data = request.data
	rel_data = json.loads(rel_data)
	rel_d = rel_data["totalList"]
	id1 = int(rel_d[0])
	id2 = int(rel_d[1])
	prop_d = {}
	for i in range(2,len(rel_d)-1):
		prop_d[rel_d[i][0]] = rel_d[i][1]
	a = nodes.get(id1)
	b = nodes.get(id2)
	rel = Relationship(a,"succeeded_by",b)
	for k,v in prop_d.items():
		rel[k] = v
	graph.create(rel)

	return "Relation property updation while creation done"


#Required relationship ID
#Topic not needed since ID is used
@app.route('/relationprop',methods = ['POST'])
def relationship_property_update():
    #rel_prop = {"Fever":True,"Symptomatic":True}
	relprop_data = request.data
	relprop_data = json.loads(relprop_data)
	rel_details = relprop_data["totalList"]
	rel_prop = {}
	for i in range(1,len(rel_details)-1):
		rel_prop[rel_details[i][0]] = rel_details[i][1]
		
	relation = RelationshipMatcher(graph)
	rel = relation.get(rel_details[0])
	for k,v in rel_prop.items():
		rel[k] = v
	graph.push(rel)
	return "Relationship property addition done!"

#Required node name and node label at the time of creation
@app.route('/nodepropcreate',methods = ['POST'])
def node_property():
	prop_data = request.data
	prop_data = json.loads(prop_data)
	prop_data_val = prop_data["totalList"]
	node_name = prop_data_val[0]
	node_label = prop_data_val[1]
	node_topic = prop_data_val[2]
	for i in range(3,len(prop_data_val)-2):
		query = "MATCH (n:{}) WHERE n.name = '{}' and n.topic = '{}' SET n.{} = '{}' return n".format(node_label,node_name,node_topic,prop_data_val[i][0],prop_data_val[i][1])
		graph.run(query)

	return "Node property updated"


# Required node name and node type
@app.route('/nodeprop', methods=['POST'])
def node_property_update():
    node_prop = {}
    prop_data = request.data
    prop_data = json.loads(prop_data)
    # print(prop_data)
    prop_data_val = prop_data["totalList"]

    node_names = prop_data_val[0]
    node_label = prop_data_val[1]
    for i in range(2, len(prop_data_val) - 2):
        node_prop[prop_data_val[i][0]] = prop_data_val[i][1]
    if len(node_prop) != 0:
        keys = ["name"]
        k = node_prop.keys()
        keys.extend(k)
        prop_d = []
        prop_d.append(node_names)
        prop_d.extend(node_prop.values())
    else:
        keys = ['name']
        prop_d = [node_names]
    merge_nodes(graph.auto(), [prop_d], (node_label, "name"), keys=keys)
    return "Node property updated"

#Returns the dictionary of nodes with ID
@app.route('/getnodes',methods=['POST'])
def getnodes():
	topic_req = request.data
	topic_req = json.loads(topic_req)
	topic = topic_req["topic_dict"]
	ntopic = topic["selectedTopic"]
	getnode_dict = {}
	query = "MATCH (n) where n.topic = '{}' return n.name, id(n)".format(ntopic)
	record = graph.run(query).to_data_frame()
	req_df = record.iloc[:,0:2]
	req_df.rename({'n.name':'node_name','id(n)':'node_id'},axis=1,inplace=True)
	for i in range(req_df.shape[0]):
		getnode_dict[int(req_df["node_id"][i])] = req_df["node_name"][i]

	return getnode_dict


#Retrieving the node label list
@app.route('/node_label_list')
def node_label_list():
    ll = graph.schema.node_labels
    ll = list(ll)
    return {"nodelabels":ll}


#Returns the list of node keys
@app.route('/nodepropkeys')
def node_prop_keys():
	query = "match (n) return properties(n)"
	record = graph.run(query).to_data_frame()
	prop = list(record.iloc[:,0])
	key_list = []
	for i in range(len(prop)):
		key_list.extend(prop[i].keys())

	key_list = list(set(key_list))
	key_list.remove('name')
	key_list.remove('hash')
	key_list.remove('topic')
	return {"nodepropkeys":key_list}



#Returns the list of relation keys
@app.route('/relpropkeys',methods=['GET'])
def rel_prop_keys():
    query = "MATCH (a)<-[r]->(b) RETURN properties(r)"
    record = graph.run(query).to_data_frame()
    prop = list(record.iloc[:,0])
    key_list = []
    for i in range(len(prop)):
        key_list.extend(prop[i].keys())

    key_list = list(set(key_list))
    #print(key_list)
    #print(record)
    return {"relpropkeys":key_list}


#Required node ID
@app.route('/subgraph',methods = ['POST'])
def subgraph_render():
	nodeid = request.data
	nodeid = json.loads(nodeid)
	select = nodeid["select_dict"]
	nid = select["selectedId"]
	#nid = 0
	query1 = "MATCH (n)<-[r]->(m) WHERE id(n) = {} return n,r,m".format(nid)
	#query2 = "MATCH (p) WHERE id(p) = {} return p".format(nid)
	record1= graph.run(query1).to_data_frame()
	#record2 = graph.run(query2).to_data_frame()
	if(record1.shape == (0,0)):
		return_val = 1
	else:
		return_val = 2
	return str(return_val)

#Returns the unique topics covered
@app.route('/topicsubgraph',methods = ['GET'])
def topic_subgraph():
	query = "MATCH (n) RETURN n.topic AS topic"
	record = graph.run(query).to_data_frame()
	topics = list(set(record.iloc[:,0]))
	return {"topic":topics}

# Rename node
@app.route('/renamenode', methods=["POST"])
def rename_node() :
    # print(request.data)
    rename_module = request.data
    print(rename_module)
    # nid = 7
    # new_node_name = "(renamed) Testing node 3"
    rename_module = json.loads(rename_module)
    select = rename_module["rename_dict"]
    print(select)
    nid = select["selectedId"]
    existing_name = select['existing_name']
    new_node_name = select['new_name']
    query = "match (n) where id(n) =  {} set n.name = '{}' ".format(int(nid), new_node_name)
    record = graph.run(query).to_data_frame()
    print(record)
    return "Node renamed successfully"

# Rename label
@app.route('/renamelabel', methods=["POST"])
def rename_label() :
    # print(request.data)
    rename_label_module = request.data
    print(rename_label_module)
    rename_module = json.loads(rename_label_module)
    select = rename_module["rename_dict"]
    print(select)
    nid = select["selectedId"]
    existing_label_name = select['existing_label_name']
    new_label_name = select['new_label_name']
    query = "MATCH (n) WHERE ID(n) = {} REMOVE n:{} SET n:{}".format(int(nid), existing_label_name, new_label_name)
    record = graph.run(query).to_data_frame()
    print(record)
    return "Label renamed successfully"

#Returns the recommened suggestions for node key
@app.route('/nodekeysemantic',methods = ['POST'])
def nodekey_semantic():
	sm = difflib.SequenceMatcher(None)
	semantic_check = request.data
	semantic_check = json.loads(semantic_check)
	semantics = semantic_check["select_dict"]
	semantic_word = semantics["selectedText"]
	query = "match (n) return properties(n)"
	record = graph.run(query).to_data_frame()
	prop = list(record.iloc[:,0])
	key_list = []
	for i in range(len(prop)):
		key_list.extend(prop[i].keys())

	key_list = list(set(key_list))
	key_list.remove('name')
	key_list.remove('hash')
	key_list.remove('topic')

	text = semantic_word
	text = text.lower()
	text = text.replace("-","")
	text = text.replace("≥"," ")
	text = text.replace("<"," ")
	text = text.replace(">"," ")
	text = text.replace("≤"," ")

	sm.set_seq2(text)

	suggestion_list = []
	for x in key_list:
		xx = x.replace("_"," ")
		sm.set_seq1(xx)
		if(sm.ratio()>0.4):
			temp_dict = {}
			temp_dict["title"] = x
			temp_dict["score"] = round(sm.ratio(),2)
			suggestion_list.append(temp_dict)
	

	return {"suggestions":suggestion_list}


#Returns the recommened suggestions for relationship key
@app.route('/noderelationsemantic',methods = ['POST'])
def noderelation_semantic():
	sm = difflib.SequenceMatcher(None)
	semantic_check = request.data
	semantic_check = json.loads(semantic_check)
	semantics = semantic_check["select_dict"]
	semantic_word = semantics["selectedText"]
	query = "MATCH (a)<-[r]->(b) RETURN properties(r)"
	record = graph.run(query).to_data_frame()
	prop = list(record.iloc[:,0])
	key_list = []
	for i in range(len(prop)):
		key_list.extend(prop[i].keys())
	key_list = list(set(key_list))

	text = semantic_word
	text = text.lower()
	text = text.replace("-","")
	text = text.replace("≥"," ")
	text = text.replace("<"," ")
	text = text.replace(">"," ")
	text = text.replace("≤"," ")

	sm.set_seq2(text)

	suggestion_list = []
	for x in key_list:
		xx = x.replace("_"," ")
		sm.set_seq1(xx)
		if(sm.ratio()>0.4):
			temp_dict = {}
			temp_dict["title"] = x
			temp_dict["score"] = round(sm.ratio(),2)
			suggestion_list.append(temp_dict)
	

	return {"suggestions":suggestion_list}
	


if __name__ == '__main__':
	# uri = "neo4j+s://c822ccbf.databases.neo4j.io"
	uri = "neo4j+s://e9c642e9.databases.neo4j.io"
	user = "neo4j"
	# password = "qhbT-2MoWJhDMHcxZ-uBy1MAoinlIpm-p32Hq687BGk"
	password = "3yKkqqHaeAsy6mvk_aswwLpCPAy2O_Ep2qQQaGoAORE"
	graph = Graph(uri, auth=(user, password))
	app.run()
