"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin

import backend.views

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^$', backend.views.index),
    url('download_gene_data', backend.views.download_data),
    url('load_first_data', backend.views.load_first_data),
    url('api/series', backend.views.submit_genes),
    url('api/genedetails', backend.views.gene_details),
    url('api/table', backend.views.table),
    url('api/phospho_series', backend.views.phospho_series),
    url('api/phospho_table', backend.views.phospho_table),
    url('swagger', backend.views.swagger)
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns.append(url(r'^__debug__/', include(debug_toolbar.urls)))
