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

    sample_data = settings.CPTAC_DATA.to_json()
    mutation = settings.MUTATION[mutation_genes].to_json()
    methylation = settings.METHYLATION[methylation_genes].to_json()
    cnv_lr = settings.CNV_LR[cnv_lr_genes].to_json()
    cnv_baf = settings.CNV_BAF[cnv_baf_genes].to_json()
    rna = settings.RNA[rna_genes].to_json()
    protein = settings.PROTEIN[protein_genes].to_json()
    phospho = settings.PHOSPHO[phospho_genes].to_json()

    # sample_data = sample_data.to_json()
    # mutation = mutation.to_json()
    # methylation = methylation.to_json()
    # cnv_lr = cnv_lr.to_json()
    # cnv_baf = cnv_baf.to_json()
    # rna = rna.to_json()
    # protein = protein.to_json()
    # phospho = phospho.to_json()

    return JsonResponse(
        {'sample_data': sample_data,
         'mutation': mutation,
         'methylation': methylation,
         'cnv_lr': cnv_lr,
         'cnv_baf': cnv_baf,
         'rna': rna,
         'protein': protein,
         'phospho': phospho
         },
        safe=False
    )
