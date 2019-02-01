import pandas as pd
import pickle


# PROCESS SAMPLE INFO

# df = pd.read_csv('data/heatmap_info_Anna.csv', index_col=0)
# df = df.replace({'loss': 1, 'LR neutral LOH': 2, 'LR neutral': 3, 'LR amplification': 4, 'No': -100, 'Yes': 100})
# df = df.rename(str.lower, axis="columns")
# #
# pickle.dump(df, open('data/cptac.pkl', 'wb'))

# PROCESS GENE INFO
# z-score data (-3 to +3)
# df[(df >= 3)] = dark_red --> 14
# df[(df > 2) & (df < 3)] = med_red --> 12
# df[(df > 1) & (df <= 2)] = light_red --> 10
# df[(df > 0.1) & (df <= 1)] = light_red --> 10
# df[(df > -0.1) & (df <= 0.1)] = grey --> 8
# df[(df > -1) & (df <= -0.1)] = light_blue --> 6
# df[(df > -2) & (df <= -1)] = light_blue --> 6
# df[(df > -3) & (df <= -2)] = med_blue --> 4
# df[df <= -3] = dark_blue --> 2

# import pandas as pd
# import pickle
#
# sample_ids = pickle.load(open('/Users/calina01/PycharmProjects/cptac-heatmap/data/sample_id_mapping.pkl', 'rb'))
#
# data_types_with_z_scores = ['protein', 'rna', 'phospho', 'methylation']
# for data_type in data_types_with_z_scores:
#     df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
#     df[(df >= 3)] = 14000
#     df[(df > 2) & (df < 3)] = 12000
#     df[(df > 0.1) & (df <= 2)] = 10000
#     df[(df > -0.1) & (df <= 0.1)] = 8000
#     df[(df > -2) & (df <= -0.1)] = 6000
#     df[(df > -3) & (df <= -2)] = 4000
#     df[df <= -3] = 2000
#
#     df = df/1000 # avoids conflicts with transformation
#     df = df.fillna(-100)
#     df = df.rename(columns = sample_ids).T
#
#     pickle.dump(df, open('data/{}.pkl'.format(data_type), 'wb'))


# CNV data (-0.5 to 0.5)
# df[(df >= 0.5)] = dark_red --> 14
# df[(df >= 0.2) & (df < 0.5)] = light_red --> 10
# df[(df >= -0.2) & (df < 0.2)] = grey --> 8
# df[(df >= -0.5) & (df < -0.2)] = light_blue --> 6
# df[df < -0.5] = dark_blue --> 2

import pandas as pd
import pickle

sample_ids = pickle.load(open('/Users/calina01/PycharmProjects/cptac-heatmap/data/sample_id_mapping.pkl', 'rb'))

cnv_data_types = ['cnv_baf', 'cnv_lr']
for data_type in cnv_data_types:
    df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
    df[(df >= 0.5)] = 14000
    df[(df >= 0.2) & (df < 0.5)] = 10000
    df[(df >= -0.2) & (df < 0.2)] = 8000
    df[(df >= -0.5) & (df < -0.2)] = 6000
    df[df < -0.5] = 2000

    df = df/1000 # avoids conflicts with transformation
    df = df.fillna(-100)
    df = df.rename(columns = sample_ids).T

    pickle.dump(df, open('data/{}.pkl'.format(data_type), 'wb'))







