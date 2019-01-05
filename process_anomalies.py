import pickle
dt = 'methylation'
accounted_for = [100, -100]
others = range(1,15)
accounted_for += others
df = pickle.load(open('/Users/calina01/PycharmProjects/cptac-heatmap/data/{}.pkl'.format(dt), 'rb'))

df[(df < 1) & (df > 0)] = 14

anomalies_1 = df[~df.isin(accounted_for)]
anomalies_1 = anomalies_1.dropna(how='all')
print(anomalies_1.shape)

pickle.dump(df, open('/Users/calina01/PycharmProjects/cptac-heatmap/data/{}.pkl'.format(dt), 'wb'))
# fixed_anomalies = anomalies_1 * 1000
# anomalies_1[(anomalies_1 < 1) & (anomalies_1 > 0)] = None
#
# anomalies_2 = anomalies_1.dropna(how='all')
# print(anomalies_2.shape)
#
# fixed_anomalies = anomalies_1 * 1000
# fixed_anomalies[(fixed_anomalies > 4)] = 14
#
# combined = df.combine_first(fixed_anomalies)
#
# anomalies_2 = combined[~combined.isin(accounted_for)]
#
# anomalies_2 = anomalies_2.dropna(how='all')
# print(anomalies_2.shape)
