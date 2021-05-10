
import math

def main():
    relevance_seq = [0,0,1,1,0,0,0,0,0,1]
    dcg = 0
    idcg = 0

    #Calculating DCG
    for i in range(len(relevance_seq)):
        dcg += ((2^relevance_seq[i])-1)/math.log((i+2),2)

    #Calculating IDCG
    relevance_seq.sort(reverse=True)
    for i in range(len(relevance_seq)):
        idcg += ((2^relevance_seq[i])-1)/math.log((i+2),2)
  
    #Calculating NDCG
    ndcg = dcg/idcg
    
    print("nDCG is: ",ndcg)

main()


