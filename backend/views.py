import json

from django.shortcuts import render

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import pandas as pd


@csrf_exempt
def index(request):
    return render(request, 'index.html')


@csrf_exempt
def submit_genes(request):
    cptac_data = settings.CPTAC_DATA
    if request.method == "POST":
        data = json.loads(request.body)
    results = cptac_data.to_json()
    return JsonResponse(results, safe=False)
    # return render(request, 'index.html')

