nested = {}
for i, v in mut.iterrows():
    if i not in nested:
        nested[i] = {}
    sample = v['Tumor_Sample_Barcode']
    if sample not in nested[i]:
        nested[i][sample] = {}
    mut_type = v['Variant_Classification']
    if mut_type not in nested[i][sample]:
        nested[i][sample][mut_type] = []
    hgvsp = v['HGVSp_Short']
    nested[i][sample][mut_type].append(hgvsp)
    if len(nested[i][sample][mut_type]) > 1:
        print(i)
        print(nested[i][sample][mut_type])

transformed_arrs = {}
for i, v in mut.iterrows():
    variant = v['Variant_Classification']
    gene_idx = i + ' ' + variant
    sample = v['Tumor_Sample_Barcode']
    if gene_idx not in transformed_arrs:
        transformed_arrs[gene_idx] = {}
    transformed_arrs[gene_idx]['Gene symbol'] = i
    transformed_arrs[gene_idx]['Variant_Classification'] = variant
    for s in mut_samples:
        s_fixed = s.split('_')[0]
        if s_fixed not in transformed_arrs[gene_idx]:
            transformed_arrs[gene_idx][s_fixed] = 0
        if s == sample:
            transformed_arrs[gene_idx][s_fixed] += 1
print(transformed_arrs)
