import numpy as np
from os import sys, path
import pandas as pd
from urllib.request import urlopen
import json
import sys

# map gene symbols to gene ID x
# perform scrape
# save URL in dataframe


if __name__ == '__main__':

    gene_info_file = sys.argv[1]
    output_file = sys.argv[2]
    open(output_file, 'w').close()
    gene_ids = pd.read_csv(gene_info_file, index_col=0, header=0)['GeneID']
    chunk_size = 100
    cn = int(len(gene_ids)/chunk_size+1)
    for i in range(cn):
        chunk_genes = gene_ids[chunk_size*i:np.min([chunk_size*(i+1), len(gene_ids)])]
        gids = ','.join([str(s) for s in chunk_genes])
        print((i + 1), '/', cn)
        url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=' + gids + '&retmode=json'
        print(url)
        data = json.load(urlopen(url))
        result = []
        for g in chunk_genes:
            result.append([g, data['result'][str(g)]['summary'] if str(g) in data['result'] else ''])
        pd.DataFrame(result, columns=['gene_id', 'summary']).to_csv(output_file, index=False, mode='a', header=(i == 0))

    # # for i in range(cn):
    #     print(chunk_genes)
    #     # print(gids)
    #     print((i+1),'/',cn)
    #     url = 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=' + chunk_genes[0] + '&retmode=json'
    #     print(url)
    #     data = json.load(urlopen(url))
    #     print(data)
    #     result = []
    #     for g in chunk_genes:
    #         result.append([g, data['result'][str(g)]['summary'] if str(g) in data['result'] else ''])
    #     pd.DataFrame(result, columns=['gene_id', 'summary']).to_csv(output_file, index=False, mode='a', header=(i == 0))

    """
    Usage:
    
    python scrape_summary.py gene_ids.csv gene_summary.csv
    
    gene_ids.csv is a csv file with the first column holding the gene_ids you want to get the summaries for. 
    
    gene_summary.csv is the output. 
    """
