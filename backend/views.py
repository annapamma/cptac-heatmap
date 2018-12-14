import json

from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings


@csrf_exempt
def index(request):
    return render(request, 'index.html')


@csrf_exempt
def submit_genes(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genes = data['genes']

    all_genes = settings.ALL_GENES

    mutation_genes = [gene for gene in genes if gene in all_genes['mutation']]
    methylation_genes = [gene for gene in genes if gene in all_genes['methylation']]
    cnv_lr_genes = [gene for gene in genes if gene in all_genes['cnv_lr']]
    cnv_baf_genes = [gene for gene in genes if gene in all_genes['cnv_baf']]
    rna_genes = [gene for gene in genes if gene in all_genes['rna']]
    protein_genes = [gene for gene in genes if gene in all_genes['protein']]
    phospho_genes = [gene for gene in genes if gene in all_genes['phospho']]
    gene_details_genes = [gene for gene in genes if gene in all_genes['gene_details']]

    # might want to just transpose all of the data in the databases
    sample_data = settings.CPTAC_DATA.T.to_json(orient='index')
    mutation = settings.MUTATION[mutation_genes].T.to_json(orient='index')
    methylation = settings.METHYLATION[methylation_genes].T.to_json(orient='index')
    cnv_lr = settings.CNV_LR[cnv_lr_genes].T.to_json(orient='index')
    cnv_baf = settings.CNV_BAF[cnv_baf_genes].T.to_json(orient='index')
    rna = settings.RNA[rna_genes].T.to_json(orient='index')
    protein = settings.PROTEIN[protein_genes].T.to_json(orient='index')
    phospho = settings.PHOSPHO[phospho_genes].T.to_json(orient='index')
    gene_details = settings.GENE_DETAILS.loc[gene_details_genes].to_json(orient='index')

    return JsonResponse(
        {'sample_data': sample_data,
         'mutation': mutation,
         'methylation': methylation,
         'cnv_lr': cnv_lr,
         'cnv_baf': cnv_baf,
         'rna': rna,
         'protein': protein,
         'phospho': phospho,
         'gene_details': gene_details
         },
        safe=False
    )


@csrf_exempt
def download_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        genes = data['genes']

    sample_data = settings.SAMPLE_DATA
    all_gene_data = settings.ALL_GENE_DATA

    select_gene_data = all_gene_data.loc[all_gene_data['Gene symbol'].isin(genes)]

    gene_data = json.loads(select_gene_data.to_json(orient='table'))
    sample_data = json.loads(sample_data.to_json(orient='table'))
    data = sample_data['data'] + gene_data['data']

    params = {}
    fields = gene_data['schema']['fields']
    for field in fields:
        name = field['name']
        type = field['type']
        params[name] = type

    return JsonResponse({
        'params': params,
        'data': data
    }, safe=False)


@csrf_exempt
def load_first_data(request):
    histology = settings.HISTOLOGY
    return JsonResponse({'histology': histology}, safe=False)
