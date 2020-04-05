import json

from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

color_df = settings.COLOR
actual_df = settings.ACTUAL

def df_to_apex_data(color_scale_df, actual):
    series = [
        {
            'name': data_type,
            'data': [
                {
                 'x': val[0], # sample ID
                 'y': val[1], # color scale val
                 'value': actual[val[0]][data_type]
                }
                for val in vals.items()
            ]
        }
        for data_type, vals in color_scale_df.iterrows()
    ]
    clinical_series_len = actual[actual['Data type'] == ''].shape[0]
    blank_row = { 'name': '', 'data': [] }
    series.insert(clinical_series_len, blank_row)
    return series[::-1]

def filtered_df(df, genes):
    return df[(df['Gene symbol'].isin(genes)) | (df['Gene symbol'] == '')]

@csrf_exempt
def index(request):
    return render(request, 'index.html')


@csrf_exempt
def submit_genes(request):
    # if request.method != "POST":
    #     return render(request, 'index.html')

    # data = json.loads(request.body)
    # genes = data['genes']
    genes = ['VHL']

    filtered_scale = filtered_df(color_df, genes)

    series = df_to_apex_data(
        filtered_scale.drop(columns=['Data type', 'Gene symbol']),
        actual_df
    )

    return JsonResponse({
        'series': series
    })
    # all_genes = settings.ALL_GENES
    #
    # mutation_genes = [gene for gene in genes if gene in all_genes['mutation']]
    # methylation_genes = [gene for gene in genes if gene in all_genes['methylation']]
    # cnv_lr_genes = [gene for gene in genes if gene in all_genes['cnv_lr']]
    # # cnv_baf_genes = [gene for gene in genes if gene in all_genes['cnv_baf']]
    # cnv_baf_genes = []
    # rna_genes = [gene for gene in genes if gene in all_genes['rna']]
    # protein_genes = [gene for gene in genes if gene in all_genes['protein']]
    # phospho_genes = [gene for gene in genes if gene in all_genes['phospho']]
    # gene_details_genes = [gene for gene in genes if gene in all_genes['gene_details']]
    #
    # # might want to just transpose all of the data in the databases
    # sample_data = settings.CPTAC_DATA.T.to_json(orient='index')
    # mutation = settings.MUTATION[mutation_genes].T.to_json(orient='index')
    # methylation = settings.METHYLATION[methylation_genes].T.to_json(orient='index')
    # cnv_lr = settings.CNV_LR[cnv_lr_genes].T.to_json(orient='index')
    # cnv_baf = settings.CNV_BAF[cnv_baf_genes].T.to_json(orient='index')
    # rna = settings.RNA[rna_genes].T.to_json(orient='index')
    # protein = settings.PROTEIN[protein_genes].T.to_json(orient='index')
    # phospho = settings.PHOSPHO[phospho_genes].T.to_json(orient='index')
    # gene_details = settings.GENE_DETAILS.loc[gene_details_genes].to_json(orient='index')
    #
    # return JsonResponse(
    #     {'sample_data': sample_data,
    #      'mutation': mutation,
    #      'methylation': methylation,
    #      'cnv_lr': cnv_lr,
    #      'cnv_baf': cnv_baf,
    #      'rna': rna,
    #      'protein': protein,
    #      'phospho': phospho,
    #      'gene_details': gene_details
    #      },
    #     safe=False
    # )


@csrf_exempt
def download_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genes = data['genes']

    sample_data = settings.SAMPLE_DATA
    all_gene_data = settings.ALL_GENE_DATA

    select_gene_data = all_gene_data.loc[all_gene_data['Gene symbol'].isin(genes)]

    gene_data = json.loads(select_gene_data.to_json(orient='table'))
    actual_data = json.loads(select_gene_data.drop(columns=['Data type', 'Gene symbol']).fillna(-100).to_json(orient='index'))
    sample_data = json.loads(sample_data.to_json(orient='table'))
    data = sample_data['data'] + gene_data['data']

    return JsonResponse({
        'data': data,
        'actualData': actual_data
    }, safe=False)


@csrf_exempt
def load_first_data(request):
    histology = settings.HISTOLOGY
    return JsonResponse({'histology': histology}, safe=False)
