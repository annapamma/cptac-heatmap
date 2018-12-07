import pandas as pd
import pickle


df = pd.read_csv('data/heatmap_info_Anna.csv', index_col=0)
df = df.replace({'loss': 1, 'LR neutral LOH': 2, 'LR neutral': 3, 'LR amplification': 4, 'No': -100, 'Yes': 100})
# df = df.replace({'I': 1, 'LR neutral LOH': 2, 'LR neutral': 3, 'LR amplification': 4, 'No': -100, 'Yes': 100})
df = df.rename(str.lower, axis="columns")
df = df.sort_values(by=['ccrcc', '3p'])

pickle.dump(df, open('data/cptac.pkl', 'wb'))
