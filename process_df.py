import pandas as pd
import pickle


# PROCESS SAMPLE INFO

# df = pd.read_csv('data/heatmap_info_Anna.csv', index_col=0)
# df = df.replace({'loss': 1, 'LR neutral LOH': 2, 'LR neutral': 3, 'LR amplification': 4, 'No': -100, 'Yes': 100})
# df = df.rename(str.lower, axis="columns")
#
# pickle.dump(df, open('data/cptac.pkl', 'wb'))

# PROCESS GENE INFO

# df = pd.read_csv('data/KDM5C.csv', index_col=0)
# # df.fillna(0)
# df = df.rename(str.lower, axis="columns")
# df = df.rename(columns=
#                {
#                 'methylation_normalized': 'methylation',
#                 'rna_normalized': 'rna',
#                 'protein_normalized': 'protein',
#                 'phospho_normalized': 'phospho'
#               }
# )
#
#
# def process_gene_data_type(gene_df, gene_name, data_type):
#     as_series = gene_df[data_type]
#     as_df = as_series.to_frame(gene_name)
#     # pickle.dump(as_df, open('data/{}.pkl'.format(data_type), 'wb'))
#     return as_df

# Process mutation
# mutation = pd.DataFrame.empty()
# data_type = 'mutation'
# mutation = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
# mutation = mutation.T
# mutation[mutation == 1] = 100
# mutation[mutation == 0] = -100
# pickle.dump(mutation, open('data/{}.pkl'.format(data_type), 'wb'))

# # Process cnv_lr
# data_type = 'cnv_lr'
# cnv_lr = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
# cnv_lr = cnv_lr.T
# cnv_lr[cnv_lr < -0.5] = 2000
# cnv_lr[cnv_lr < -0.2] = 6000
# cnv_lr[cnv_lr < 0.2] = 8000
# cnv_lr[cnv_lr < 0.5] = 10000
# cnv_lr[cnv_lr < 1] = 14000
# cnv_lr = cnv_lr / 1000
# pickle.dump(cnv_lr, open('data/{}.pkl'.format(data_type), 'wb'))

# # Process rna_normalized, protein_normalized, phospho_normalized
data_type = 'phospho'
x_df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
x_df = x_df.T

x_df[x_df < -2] = 2000 # (-3, -2)
x_df[x_df < -1] = 4000 # (-2, -1)
x_df[x_df < 0] = 6000 # (-1, 0)
x_df[x_df < 1] = 8000 # (0, 1)
x_df[x_df < 2] = 10000 # (1, 2)
x_df[x_df < 3] = 12000 # (2, 3)
x_df[x_df < 4] = 14000 #(3)
x_df = x_df / 1000
pickle.dump(x_df, open('data/{}.pkl'.format(data_type), 'wb'))

# # Process cnv_baf
# cnv_baf = pd.DataFrame.empty()
# data_type = 'cnv_baf'
# cnv_baf = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
# cnv_baf = cnv_baf.T
# cnv_baf[cnv_baf < 0.1] = 1000
# cnv_baf[cnv_baf < 0.2] = 2000
# cnv_baf[cnv_baf < 0.3] = 3000
# cnv_baf[cnv_baf < 0.4] = 4000
# cnv_baf[cnv_baf < 0.5] = 6000
# cnv_baf[cnv_baf < 0.6] = 8000
# cnv_baf = cnv_baf / 1000
# pickle.dump(cnv_baf, open('data/{}.pkl'.format(data_type), 'wb'))
