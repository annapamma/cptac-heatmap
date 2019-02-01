import pandas as pd
import pickle


# PROCESS SAMPLE INFO

# df = pd.read_csv('data/heatmap_info_Anna.csv', index_col=0)
# df = df.replace({'loss': 1, 'LR neutral LOH': 2, 'LR neutral': 3, 'LR amplification': 4, 'No': -100, 'Yes': 100})
# df = df.rename(str.lower, axis="columns")
# #
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
# data_type = 'phospho'
# x_df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
# x_df = x_df.T
#
# x_df[x_df < -2] = 2000 # (-3, -2)
# x_df[x_df < -1] = 4000 # (-2, -1)
# x_df[x_df < 0] = 6000 # (-1, 0)
# x_df[x_df < 1] = 8000 # (0, 1)
# x_df[x_df < 2] = 10000 # (1, 2)
# x_df[x_df < 3] = 12000 # (2, 3)
# x_df[x_df < 4] = 14000 #(3)
# x_df = x_df / 1000
# pickle.dump(x_df, open('data/{}.pkl'.format(data_type), 'wb'))

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

# # pull out all genes
# data_types = ['cnv_baf', 'mutation', 'cnv_lr', 'methylation', 'phospho', 'protein', 'rna']
# all_genes = {}
#
#
# def pull_out_all(data_type):
#     df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
#     all_genes = list(df.index)
#     return all_genes
#     # pickle.dump(all_genes, open('data/{}_genes.pkl'.format(data_type), 'wb'))
#
#
# for data_type in data_types:
#     all_genes[data_type] = pull_out_all(data_type)
#
# pickle.dump(all_genes, open('data/all_genes.pkl', 'wb'))

# def data_to_pickle(data_type):
#     df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
#     pickle.dump(df, open('data/{}_real.pkl'.format(data_type), 'wb'))
#
# data_types = ['cnv_baf', 'mutation', 'cnv_lr', 'methylation', 'phospho', 'protein', 'rna', 'cptac']
# for dt in data_types:
#     data_to_pickle(dt)


# process data for download file

# data_types = {
#     'cnv_baf': 'CNV (baf)',
#     'mutation': 'Mut',
#     'cnv_lr': 'CNV (lr)',
#     'methylation': 'Methy',
#     'phospho': 'Phospho',
#     'protein': 'Protein',
#     'rna': 'mRNA'
# }
#
# def process_data_for_dl_file(data_type, data_type_title):
#     f = 'data/{}_real.pkl'.format(data_type)
#     df = pickle.load(open(f, 'rb'))
#     genes = df.index
#     df['Data type'] = None
#     df['Data type'] = data_type
#     df['Gene symbol'] = genes
#     new_index = {}
#     for gene in genes:
#         new_index[gene] = '{} {}'.format(gene, data_type_title)
#     df = df.rename(index=new_index)
#     pickle.dump(df, open(f, 'wb'))
#     print('Finished: {}'.format(f))
#
# for dt in data_types:
#     process_data_for_dl_file(dt, data_types[dt])

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

# df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
import pandas as pd
import pickle

sample_ids = pickle.load(open('/Users/calina01/PycharmProjects/cptac-heatmap/data/sample_id_mapping.pkl', 'rb'))

data_type = 'cnv_lr'
df = pd.read_csv('data/heatmap/heatmap_{}.csv'.format(data_type), index_col=0)
df[(df >= 3)] = 14000
df[(df > 2) & (df < 3)] = 12000
df[(df > 0.1) & (df <= 2)] = 10000
df[(df > -0.1) & (df <= 0.1)] = 8000
df[(df > -2) & (df <= -0.1)] = 6000
df[(df > -3) & (df <= -2)] = 4000
df[df <= -3] = 2000

df = df/1000 # avoids conflicts with transformation
df = df.fillna('')
df = df.rename(columns = sample_ids).T

pickle.dump(df, open('data/{}.pkl'.format(data_type), 'wb'))


# [FAM132A, CPT0014450004] = 14








