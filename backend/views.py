import json

from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

color_df = settings.COLOR
actual_df = settings.ACTUAL

def df_to_apex_data_single_gene(filtered_gene_df, actual):
    series = [
        {
            'name': data_type,
            'data': [
                {
                    'x': val[0],  # sample ID
                    'y': val[1],  # color scale val
                    'value': actual[val[0]][data_type],
                    'gene': actual.loc[data_type]['Gene symbol'],
                }
                for val in vals.items()
            ]
        }
        for data_type, vals in filtered_gene_df.iterrows()
    ]
    return series[::-1]

def df_to_apex_data(color_scale_df, actual, gene_tracks):
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
    blank_row = { 'name': '', 'data': [] }
    series.insert(2, blank_row)
    series.insert(4, blank_row)
    last_track_i = 4
    for i, tracks in gene_tracks.items():
        last_track_i += 1
        last_track_i += tracks
        print(i, last_track_i)
        series.insert(last_track_i, blank_row)
    series.insert(-3, blank_row)
    return series[::-1]

def filtered_df(df, genes):
    return df[(df['Gene symbol'].isin(genes)) | (df['Gene symbol'] == '')]

def filtered_df_single_gene(df, gene):
    return df[df['Gene symbol'] == gene]

def gene_track_counts(df):
    counts = {}
    for gene in df['Gene symbol'].values:
        if len(gene):
            if gene not in counts:
                counts[gene] = 0
            counts[gene] += 1
    return counts

@csrf_exempt
def index(request):
    return render(request, 'index.html')

@csrf_exempt
def gene_details(request):
    genes = [g for g in json.loads(request.body)['genes'] if g in settings.GENE_DETAILS.index]
    return JsonResponse({
        'geneDetails': settings.GENE_DETAILS.reindex(genes).to_dict(orient='index')
    })

@csrf_exempt
def submit_genes(request):
    if request.method != "POST":
        return render(request, 'index.html')

    genes = [g for g in json.loads(request.body) if g in actual_df['Gene symbol'].values]
    gene_dfs = {
        g: df_to_apex_data_single_gene(
            filtered_df_single_gene(color_df, g).drop(columns=['Data type', 'Gene symbol']),
            actual_df
        )
        for g in genes
    }

    return JsonResponse({
        'series': gene_dfs
    })


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
