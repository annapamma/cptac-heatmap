import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex); // only required if you're using modules.
              // We're using modules, so there you go.

const apiRoot = '';

const store = new Vuex.Store({
    state: {
        subnetwork: {
            'first_degree': {'elements': {'nodes': []}},
            'second_degree': {'elements': {'nodes': []}},
            'third_degree': {'elements': {'nodes': []}},
            'whole': {'elements': {'nodes': []}},
        },
        geneInput: [],
        goTermsLoaded: false,
        listName: '',
        networkDegree: 'first_degree',
        networkDatabase: 'biogrid',
        selectedPathways: ['query_list'],
        labelHover: 'Hover over number for details',
        pathwayColors: {
            'query_list': '#00ffff',
            'AKT_ext_path': '#ff9900',
            'Apoptosis_path': '#ffff00',
            'Apoptosis_ext_path': '#ffa730',
            'CALC_PKC_ext_path': '#00ffff',
            'Cellular_Architecture_and_Microenvironment_path': '#4a86e8',
            'Cell_Cycle_Control_path': '#0000ff',
            'Cell_Cycle_ext_path': '#9900ff',
            'Chromatin_Remodeling-DNA_Methylation_path': '#ff00ff',
            'DNA_Damage_path': '#ff00ff',
            'ERK_ext_path': '#f9cb9c',
            'G-Protein_Signaling_path': '#ffe599',
            'Hedgehog_Signaling_path': '#b6d7a8',
            'HIPPO_ext_path': '#a2c4c9',
            'Hormone_Signaling_path': '#b4a7d6',
            'Immune_Checkpoints_path': '#d5a6bd',
            'B-Catenin-WNT_Signaling_path': '#e06666',
            'Jack_Stat_ext_path': '#f6b26b',
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': '#ffd966',
            'Kinase_Fusions_path': '#93c47d',
            'Metabolic_Signaling_path': '#45818e',
            'NFKB_ext_path': '#3d85c6',
            'Notch_ext_path': '#674ea7',
            'PI3K-AKT1-MTOR_Signaling_path': '#741b47',
            'Protein_Degradation_Ubiquitination_path': '#d9d2e9',
            'RNA_Splicing_path': '#783f04',
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': '#000000',
            'TGF-B_Signaling_path': '#bf9000',
            'TGFB_ext_path': '#0c343d',
            'WNT_ext_path': '#1155cc',
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': '#4c1130'
        },
        previousSelectedPathways: [],
        pathwaysEdgeCounts: {
            'AKT_ext_path': 0,
            'Apoptosis_path': 0,
            'Apoptosis_ext_path': 0,
            'CALC_PKC_ext_path': 0,
            'Cellular_Architecture_and_Microenvironment_path': 0,
            'Cell_Cycle_Control_path': 0,
            'Cell_Cycle_ext_path': 0,
            'Chromatin_Remodeling-DNA_Methylation_path': 0,
            'DNA_Damage_path': 0,
            'ERK_ext_path': 0,
            'G-Protein_Signaling_path': 0,
            'Hedgehog_Signaling_path': 0,
            'HIPPO_ext_path': 0,
            'Hormone_Signaling_path': 0,
            'Immune_Checkpoints_path': 0,
            'B-Catenin-WNT_Signaling_path': 0,
            'Jack_Stat_ext_path': 0,
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': 0,
            'Kinase_Fusions_path': 0,
            'Metabolic_Signaling_path': 0,
            'NFKB_ext_path': 0,
            'Notch_ext_path': 0,
            'PI3K-AKT1-MTOR_Signaling_path': 0,
            'Protein_Degradation_Ubiquitination_path': 0,
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': 0,
            'RNA_Splicing_path': 0,
            'TGF-B_Signaling_path': 0,
            'TGFB_ext_path': 0,
            'WNT_ext_path': 0,
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': 0
        },
        pathwaysPVals: {
            'AKT_ext_path': 0,
            'Apoptosis_path': 0,
            'Apoptosis_ext_path': 0,
            'CALC_PKC_ext_path': 0,
            'Cellular_Architecture_and_Microenvironment_path': 0,
            'Cell_Cycle_Control_path': 0,
            'Cell_Cycle_ext_path': 0,
            'Chromatin_Remodeling-DNA_Methylation_path': 0,
            'DNA_Damage_path': 0,
            'ERK_ext_path': 0,
            'G-Protein_Signaling_path': 0,
            'Hedgehog_Signaling_path': 0,
            'HIPPO_ext_path': 0,
            'Hormone_Signaling_path': 0,
            'Immune_Checkpoints_path': 0,
            'B-Catenin-WNT_Signaling_path': 0,
            'Jack_Stat_ext_path': 0,
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': 0,
            'Kinase_Fusions_path': 0,
            'Metabolic_Signaling_path': 0,
            'NFKB_ext_path': 0,
            'Notch_ext_path': 0,
            'PI3K-AKT1-MTOR_Signaling_path': 0,
            'Protein_Degradation_Ubiquitination_path': 0,
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': 0,
            'RNA_Splicing_path': 0,
            'TGF-B_Signaling_path': 0,
            'TGFB_ext_path': 0,
            'WNT_ext_path': 0,
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': 0
        },
        pathwayMemberCounts: {
            'AKT_ext_path': 20,
            'Apoptosis_path': 10,
            'Apoptosis_ext_path': 31,
            'CALC_PKC_ext_path': 18,
            'Cellular_Architecture_and_Microenvironment_path': 2,
            'Cell_Cycle_Control_path': 30,
            'Cell_Cycle_ext_path': 87,
            'Chromatin_Remodeling-DNA_Methylation_path': 19,
            'DNA_Damage_path': 24,
            'ERK_ext_path': 40,
            'G-Protein_Signaling_path': 6,
            'Hedgehog_Signaling_path': 3,
            'HIPPO_ext_path': 31,
            'Hormone_Signaling_path': 5,
            'Immune_Checkpoints_path': 12,
            'B-Catenin-WNT_Signaling_path': 14,
            'Jack_Stat_ext_path': 21,
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': 12,
            'Kinase_Fusions_path': 12,
            'Metabolic_Signaling_path': 17,
            'NFKB_ext_path': 12,
            'Notch_ext_path': 19,
            'PI3K-AKT1-MTOR_Signaling_path': 16,
            'Protein_Degradation_Ubiquitination_path': 8,
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': 38,
            'RNA_Splicing_path': 4,
            'TGF-B_Signaling_path': 7,
            'TGFB_ext_path': 19,
            'WNT_ext_path': 92,
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': 14
        },
        pathwayMembers: {
            'AKT_ext_path': ['AKT1', 'AKT2', 'AKT3', 'GSK3B', 'MTOR', 'PDPK1', 'PIK3CA', 'PIK3CB', 'PIK3CD', 'PIK3CG', 'PIK3R1', 'PIK3R2', 'PIK3R3', 'PIK3R4', 'PIK3R5', 'PIK3R6', 'PRAS40', 'PTEN', 'TSC1', 'TSC2'],
            'Apoptosis_path': ['APAF1', 'BAK1', 'BAX', 'BCL2', 'BID', 'CASP3', 'CASP8', 'CASP9', 'FAS', 'FASLG'],
            'Apoptosis_ext_path': ['A1', 'APAF1', 'BAD', 'BCL2', 'BCLG', 'BCLW', 'BCLXL', 'BFK', 'BID', 'BIK', 'BIM', 'BIRC3', 'BIRC5', 'BIRC6', 'BIRC7', 'BIRC8', 'BMF', 'BOO', 'CASP3', 'CASP6', 'CASP7', 'CASP9', 'CYTOC', 'DIABLO', 'HECTH9', 'HRK', 'MCL1', 'NAIP', 'NOXA', 'PUMA', 'XIAP'],
            'CALC_PKC_ext_path': ['GNA11', 'GNAQ', 'ITPKA', 'ITPKB', 'ITPKC', 'ITPR1', 'ITPR2', 'ITPR3', 'PLCB1', 'PLCB2', 'PLCB3', 'PLCB4', 'PLCG1', 'PLCG2', 'PRKCA', 'PRKCB', 'PRKCG', 'PTK2B'],
            'Cellular_Architecture_and_Microenvironment_path': ['PTK2', 'SRC'],
            'Cell_Cycle_Control_path': ['AURKA', 'AURKB', 'C11orf30', 'CCNA1', 'CCNA2', 'CCNB1', 'CCNB2', 'CCNB3', 'CCND1', 'CCND2', 'CCND3', 'CCNE1', 'CCNE2', 'CDK1', 'CDK12', 'CDK2', 'CDK3', 'CDK4', 'CDK6', 'CDK8', 'CDKN1B', 'CDKN2A', 'CDKN2B', 'CDKN2C', 'CHEK1', 'CHEK2', 'E2F1', 'EMSY', 'RB1', 'TP53'],
            'Cell_Cycle_ext_path': ['APC', 'BUB1', 'BUB1B', 'BUB3', 'CCNA1', 'CCNA2', 'CCNB1', 'CCNB2', 'CCNB3', 'CCNC', 'CCND1', 'CCND2', 'CCND3', 'CCNE1', 'CCNE2', 'CCNF', 'CCNG1', 'CCNG2', 'CCNH', 'CCNI', 'CCNI2', 'CCNJ', 'CCNJL', 'CCNK', 'CCNL1', 'CCNL2', 'CCNO', 'CCNT1', 'CCNT2', 'CCNY', 'CCNYL1', 'CCNYL3', 'CDC14A', 'CDC20', 'CDC25A', 'CDC25B', 'CDC45', 'CDC6', 'CDC7', 'CDH1', 'CDK1', 'CDK2', 'CDK4', 'CDK6', 'CDK7', 'CDKN1A', 'CDKN1B', 'CDKN1C', 'CDKN2A', 'CDKN2B', 'CDKN2C', 'CDKN2D', 'CIB2', 'CRIP2', 'E2F1', 'E2F2', 'E2F3', 'E2F4', 'E2F5', 'ELL', 'ESPL1', 'FZR1', 'HDAC9', 'KITLG', 'MAD1L1', 'MAD2L1', 'MXD1', 'MXI1', 'MYT1', 'NOLC1', 'PKMYT1', 'PLK1', 'PMEPA1', 'PTTG1', 'RAD21', 'RB1', 'RBL1', 'RBL2', 'SKP2', 'SLC12A9', 'SMC2', 'STAG1', 'STAG2', 'TFDP1', 'TFDP2', 'TTK', 'YWHAQ'],
            'Chromatin_Remodeling-DNA_Methylation_path': ['ASXL1', 'DNMT3A', 'DOT1L', 'EZH2', 'IDH1', 'IDH2', 'IKZF1', 'KAT6A', 'KDM5A', 'KDM5C', 'KDM6A', 'KMT2D', 'MLL2', 'MRE11', 'MSH2', 'MSH6', 'PBRM1', 'SETD2', 'TET2'],
            'DNA_Damage_path': ['ATM', 'ATR', 'ATRX', 'BRCA1', 'BRCA2', 'BRIP1', 'EMSY', 'FANCA', 'FANCC', 'FANCD2', 'FANCE', 'FANCF', 'FANCG', 'FANCL', 'MDM2', 'MDM4', 'MLH1', 'MUTYH', 'NPM1', 'PALB2', 'PP2R1A', 'RAD50', 'RAD51', 'STAG2'],
            'ERK_ext_path': ['BRAF', 'CRAF', 'DUSP1', 'DUSP10', 'DUSP16', 'DUSP2', 'DUSP4', 'DUSP5', 'DUSP6', 'DUSP7', 'DUSP8', 'DUSP9', 'HRAS', 'KRAS', 'MAP2K1', 'MAP2K2', 'MAPK1', 'MAPK3', 'MOS', 'NF1', 'NRAS', 'PEA15', 'RAP1A', 'RAP1B', 'RAPGEF2', 'RASA1', 'RASA2', 'RASGRP1', 'RASGRP2', 'RASGRP3', 'RASGRP4', 'RPS6KA1', 'RPS6KA2', 'RPS6KA3', 'SOS1', 'SOS2', 'SPRY1', 'SPRY2', 'SPRY3', 'SPRY4'],
            'G-Protein_Signaling_path': ['GNA11', 'GNA13', 'GNAQ', 'GNAS', 'GPR124', 'MITF'],
            'Hedgehog_Signaling_path': ['PTCH1', 'SMO', 'SUFU'],
            'HIPPO_ext_path': ['AJUBA', 'AMOT', 'AMOTL1', 'AMOTL2', 'CRB1', 'CRB2', 'FAT1', 'FAT2', 'FAT3', 'FAT4', 'FRMD1', 'FRMD6', 'LATS1', 'LATS2', 'LIMD1', 'MOB1A', 'MOB1B', 'MPP5', 'NF2', 'RASSF1A', 'RASSF6', 'SAV1', 'STK3', 'TEAD1', 'TEAD2', 'TEAD3', 'TEAD4', 'WTIP', 'WWC1', 'WWTR1', 'YAP1'],
            'Hormone_Signaling_path': ['AR', 'ESR1', 'LRP1B', 'PGR', 'TSHR'],
            'Immune_Checkpoints_path': ['BTK', 'CD79A', 'CD79B', 'FAM46C', 'IL7R', 'INHBA', 'IRF4', 'KLHL6', 'MPL', 'MYD88', 'NFKBIA', 'TNFAIP3'],
            'B-Catenin-WNT_Signaling_path': ['APC', 'AXIN1', 'BTRC', 'CSNK1A1', 'CTNNA1', 'CTNNB1', 'DVL1', 'FZD1', 'GSK3B', 'LRP5', 'LRP6', 'WISP3', 'WNT1', 'WT1'],
            'Jack_Stat_ext_path': ['CISH', 'JAK1', 'JAK2', 'JAK3', 'PIAS1', 'PIAS2', 'PIAS3', 'PIAS4', 'SOCS1', 'SOCS2', 'SOCS3', 'SOCS4', 'SOCS5', 'SOCS7', 'STAT1', 'STAT2', 'STAT3', 'STAT4', 'STAT5', 'STAT6', 'TYK2'],
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': ['CRLF2', 'JAK1', 'JAK2', 'JAK3', 'SOCS1', 'STAT1', 'STAT2', 'STAT3', 'STAT4', 'STAT5A', 'STAT5B', 'STAT6'],
            'Kinase_Fusions_path': ['ABL1', 'AKAP', 'ALK', 'BCR', 'FGFR1', 'FGFR2', 'FGFR3', 'NTRK1', 'NTRK2', 'NTRK3', 'RET', 'ROS1'],
            'Metabolic_Signaling_path': ['ACO1', 'ACO2', 'CS', 'FH', 'IDH1', 'IDH2', 'LDHA', 'LDHB', 'MDH2', 'OGDH', 'PC', 'PDHA1', 'PDHB', 'PKM', 'SUCLA2', 'SUCLG1', 'SUCLG2'],
            'NFKB_ext_path': ['CHUK', 'IKBKB', 'IKBKG', 'MAP3K7', 'NFKB1', 'NFKB2', 'NFKBIA', 'RELA', 'RELB', 'TAB1', 'TAB2', 'TAB3'],
            'Notch_ext_path': ['ADAM17', 'APH1A', 'APH1B', 'DLL3', 'DLL4', 'HES1', 'HES5', 'LFNG', 'MFNG', 'NCSTN', 'NOTCH1', 'NOTCH2', 'NOTCH3', 'NOTCH4', 'PSEN1', 'PSEN2', 'PSENEN', 'RBPJL', 'RFNG'],
            'PI3K-AKT1-MTOR_Signaling_path': ['AKT1', 'AKT2', 'AKT3', 'CRKL', 'IRS2', 'MTOR', 'PIK3CA', 'PIK3CG', 'PIK3R1', 'PIK3R2', 'PTEN', 'RICTOR', 'RNF43', 'RPTOR', 'TSC1', 'TSC2'],
            'Protein_Degradation_Ubiquitination_path': ['BTRC', 'ITCH', 'MDM2', 'NEDD4L', 'PARK2', 'UBA1', 'UBE2D2', 'UBR5'],
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': ['ALK', 'CBL', 'CSF1R', 'DDR2', 'EGFR', 'EPHA3', 'EPHA5', 'EPHB1', 'ERBB2', 'ERBB3', 'ERBB4', 'FGF10', 'FGF14', 'FGF19', 'FGF23', 'FGF3', 'FGF4', 'FGF6', 'FGFR1', 'FGFR2', 'FGFR3', 'FGFR4', 'FLT1', 'FLT3', 'FLT4', 'HGF', 'IGF1R', 'KIT', 'MET', 'NF1', 'NTRK1', 'NTRK2', 'NTRK3', 'PDGFRA', 'PDGFRB', 'PTPN11', 'RET', 'ROS1'],
            'RNA_Splicing_path': ['SF3B1', 'SRSF2', 'U2AF1', 'ZRSR2'],
            'TGF-B_Signaling_path': ['SMAD2', 'SMAD3', 'SMAD4', 'TGFB1', 'TGFBR1', 'TGFBR2', 'TGFBR3'],
            'TGFB_ext_path': ['BAMBI', 'LFTY1', 'LFTY2', 'LTBP1', 'SMAD2', 'SMAD3', 'SMAD4', 'SMAD6', 'SMAD7', 'SMURF1', 'SMURF2', 'TGFB1', 'TGFB2', 'TGFB3', 'TGFBR1', 'TGFBR2', 'THBS1', 'ZFYVE16', 'ZFYVE9'],
            'WNT_ext_path': ['APC', 'APC2', 'AXIN1', 'AXIN2', 'CTNNB1', 'CTNNBIP1', 'CTNND1', 'DAAM1', 'DAAM2', 'DKK1', 'DKK2', 'DKK3', 'DKK4', 'DKKL1', 'DVL1', 'DVL1P1', 'DVL2', 'DVL3', 'FBXW11', 'FBXW2', 'FBXW4', 'FRZB', 'FST', 'FZD1', 'FZD10', 'FZD2', 'FZD3', 'FZD4', 'FZD5', 'FZD6', 'FZD7', 'FZD8', 'FZD9', 'GSK3A', 'GSK3B', 'GSKIP', 'LRP1', 'LRP4', 'LRP5', 'LRP5L', 'LRP6', 'NKD1', 'NKD2', 'PORCN', 'PRICKLE1', 'RAC1', 'RAC2', 'RAC3', 'RHOA', 'RHOU', 'RHOV', 'RUVBL1', 'RYK', 'SENP2', 'SFRP1', 'SFRP2', 'SFRP4', 'SFRP5', 'SKP1', 'TCF15', 'TCF23', 'TCF3', 'TCF4', 'TCF7', 'TCF7L1', 'TCF7L2', 'TDGF1', 'TGFB1I1', 'VANGL2', 'WIF1', 'WISP1', 'WISP2', 'WISP3', 'WNT1', 'WNT10A', 'WNT10B', 'WNT11', 'WNT16', 'WNT2', 'WNT2B', 'WNT3', 'WNT3A', 'WNT4', 'WNT5A', 'WNT5B', 'WNT6', 'WNT7A', 'WNT7B', 'WNT8A', 'WNT8B', 'WNT9A', 'WNT9B'],
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': ['ARAF', 'BRAF', 'CRAF', 'CRKL', 'HRAS', 'KRAS', 'MAP2K1', 'MAP2K2', 'MAP2K4', 'MAP3K1', 'MAPK1', 'NRAS', 'RAF1', 'SRC']
        },
        predefinedPathways: ['AKT_ext_path', 'Apoptosis_path', 'Apoptosis_ext_path', 'CALC_PKC_ext_path', 'Cellular_Architecture_and_Microenvironment_path', 'Cell_Cycle_Control_path', 'Cell_Cycle_ext_path', 'Chromatin_Remodeling-DNA_Methylation_path', 'DNA_Damage_path', 'ERK_ext_path', 'G-Protein_Signaling_path', 'Hedgehog_Signaling_path', 'HIPPO_ext_path', 'Hormone_Signaling_path', 'Immune_Checkpoints_path', 'B-Catenin-WNT_Signaling_path', 'Jack_Stat_ext_path', 'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path', 'Kinase_Fusions_path', 'Metabolic_Signaling_path', 'NFKB_ext_path', 'Notch_ext_path', 'PI3K-AKT1-MTOR_Signaling_path', 'Protein_Degradation_Ubiquitination_path', 'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path', 'RNA_Splicing_path', 'TGF-B_Signaling_path', 'TGFB_ext_path', 'WNT_ext_path', 'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path'],
        userPathways: {'query_list': []},
        pathwayDisplayNames: {
            'query_list': 'Query List',
            'AKT_ext_path': 'AKT Extension',
            'Apoptosis_path': 'Apoptosis',
            'Apoptosis_ext_path': 'Apoptosis Extension',
            'CALC_PKC_ext_path': 'CALC-PKC Extension',
            'Cellular_Architecture_and_Microenvironment_path': 'Cellular Architecture and Microenvironment',
            'Cell_Cycle_Control_path': 'Cell Cycle Control',
            'Cell_Cycle_ext_path': 'Cell Cycle Extension',
            'Chromatin_Remodeling-DNA_Methylation_path': 'Chromatin Remodeling-DNA Methylation',
            'DNA_Damage_path': 'DNA Damage',
            'ERK_ext_path': 'ERK Extension',
            'G-Protein_Signaling_path': 'G-Protein Signaling',
            'Hedgehog_Signaling_path': 'Hedgehog Signaling',
            'HIPPO_ext_path': 'HIPPO Extension',
            'Hormone_Signaling_path': 'Hormone Signaling',
            'Immune_Checkpoints_path': 'Immune Checkpoints',
            'B-Catenin-WNT_Signaling_path': 'B-Catenin-WNT Signaling',
            'Jack_Stat_ext_path': 'JAK-STAT Extension',
            'Janus_Kinase_JAK-or-Signal_Transducers_and_Activators_of_Transcription_STAT_path': 'JAK-STAT',
            'Kinase_Fusions_path': 'Kinase Fusions',
            'Metabolic_Signaling_path': 'Metabolic Signaling',
            'NFKB_ext_path': 'NFKB Extension',
            'Notch_ext_path': 'Notch Extension',
            'PI3K-AKT1-MTOR_Signaling_path': 'PI3K-AKT1-MTOR Signaling',
            'Protein_Degradation_Ubiquitination_path': 'Protein Degradation-Ubiquitination',
            'Receptor_Tyrosine_KinaseORGrowth_Factor_Signaling_path': 'RTK/Growth Factor Signaling',
            'RNA_Splicing_path': 'RNA Splicing',
            'TGF-B_Signaling_path': 'TGF-B Signaling',
            'TGFB_ext_path': 'TGFB Extension',
            'WNT_ext_path': 'WNT Extension',
            'Mitogen_Activated_Protein-MAP_Kinase_Signaling_path': 'MAP Kinase Signaling'
        },
        queryGenesNotInPPI: [],
        queryListAndPWHit: false,
        GO: {
            cellularLocation: {
            },
            molecularFunction: {
            },
            biologicalProcess: {}
        },
        queryListGenesInNetwork: [],
        showIsolates: false,
    },
    mutations: {
        'ADD_GENE_INPUT' (state, geneInput) {
            state.geneInput = geneInput
        },
        'ADD_GO_TERMS' (state, goTerms) {
            state.GO = goTerms;
            state.goTermsLoaded = true;
        },
        'ADD_PATHWAYS_EDGE_COUNTS' (state, pathwaysEdgeCounts) {
            state.pathwaysEdgeCounts = pathwaysEdgeCounts
        },
        'ADD_PATHWAYS_P_VALS' (state, pathwaysPVals) {
            state.pathwaysPVals = pathwaysPVals
        },
        'ADD_QUERY_GENES_NOT_IN_PPI' (state, queryGenesNotInPPI) {
            state.queryGenesNotInPPI = queryGenesNotInPPI
        },
        'ADD_SUBNETWORK' (state, subnetwork) {
            state.subnetwork = subnetwork;
        },
        'HOLD_PREVIOUS_SELECTED_PATHWAYS' (state, previousSelectedPathways) {
            state.previousSelectedPathways = previousSelectedPathways
        },
        'UPDATE_USER_PATHWAY_COLORS' (state, userPathwayColors) {
            let raw = state.pathwayColors;
            let allowed = state.predefinedPathways;

            const filtered = Object.keys(raw)
              .filter(key => allowed.includes(key))
              .reduce((obj, key) => {
                obj[key] = raw[key];
                return obj;
              }, {});

            state.pathwayColors = {...filtered, ...userPathwayColors}
        },
        'API_FAIL' (state, error) {
            console.error(error)
        },
        'UPDATE_NETWORK_DEGREE' (state, degree) {
            state.networkDegree = degree;
        },
        'UPDATE_NETWORK_DATABASE' (state, database) {
            state.networkDatabase = database;
        },
        'UPDATE_PATHWAY_COLOR' (state, pathwayColorData) {
            const objectWithoutKey = (object, key) => {
              const {[key]: deletedKey, ...otherKeys} = object;
              return otherKeys;
            };
            const pathwayToChange = Object.keys(pathwayColorData)[0];

            const maintainedPathwayColors = objectWithoutKey(state.pathwayColors, pathwayToChange);
            state.pathwayColors = {...maintainedPathwayColors, ...pathwayColorData};
        },
        'UPDATE_USER_PATHWAY_DISPLAY' (state, displayData) {
            const { pathways, add } = displayData;
            if(add) {
                state.pathwayDisplayNames = {...state.pathwayDisplayNames, ...pathways};
            } else {
                for (let pathway in pathways) {
                    delete state.pathwayDisplayNames[pathway];
                    delete state.pathwaysEdgeCounts[pathway];
                }
            }

        },
        'UPDATE_LABEL_HOVER' (state, label) {
            state.labelHover = label;
        },
        'UPDATE_QL_AND_PW_HIT' (state, queryListAndPWHit) {
          state.queryListAndPWHit = queryListAndPWHit;
        },
        'UPDATE_QL_GENES_IN_NETWORK' (state, queryListGenesInNetwork) {
            state.queryListGenesInNetwork = queryListGenesInNetwork;
        },
        'UPDATE_SELECTED_PATHWAYS' (state, selectedPathways) {
            state.selectedPathways = selectedPathways
        },
        'UPDATE_USER_PATHWAYS' (state, userPathways) {
            state.userPathways = userPathways;
        },
        'UPDATE_OLD_EDGE_COUNTS' (state, currentlySelectedPathways) {
            // const maintainedSelectedPathways = state.selectedPathways.slice();
            const currentEdgeCounts = Object.create(state.pathwaysEdgeCounts, {});
            const maintainedEdgeCounts = Object.create(state.pathwaysEdgeCountsOld, {});
            const oldEdgeCounts = {};

            currentlySelectedPathways.filter(function(pathway) {
                return maintainedEdgeCounts[pathway];
            });

            currentlySelectedPathways.forEach(pathway => {
                if (pathway === 'query_list') {
                    return
                }
                if (maintainedEdgeCounts[pathway]) {
                    oldEdgeCounts[pathway] = maintainedEdgeCounts[pathway]
                } else {
                    oldEdgeCounts[pathway] = currentEdgeCounts[pathway]
                }
            });

            state.pathwaysEdgeCountsOld = oldEdgeCounts;
        },
        'UPDATE_GO_TERM_SELECTION' (
            state,
            {
                ontology,
                goTerm,
                selected
            })
        {
            state.GO[ontology][goTerm].selected = selected;
        },
        'UPDATE_SHOW_ISOLATES' (state, shown) {
            // state.showIsolates = shown;
            state.showIsolates = shown;
        }
    },
    actions: {
        addGeneInput(store, geneInput) {
            store.commit('ADD_GENE_INPUT', geneInput);
        },
        fetchGOTerms(store, geneList) {
            api.post(`${apiRoot}/api/subnetwork/go-terms/`, geneList)
                .then(
                    response => {
                        store.commit('ADD_GO_TERMS', response.body);
                    }
                )
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                )
            // store.commit('ADD_GO_TERMS', gene)
        },
        holdPreviousSelectedPathways(store, previousSelectedPathways) {
            store.commit('HOLD_PREVIOUS_SELECTED_PATHWAYS', previousSelectedPathways)
        },
        getPathwaySubnetwork(store, queryGenesSelectedPathways) {
            api.post(`${apiRoot}/api/subnetwork/submit_genes/`, queryGenesSelectedPathways)
                .then(
                    response => {
                        const subnetworkAndEdgeCounts = response.body;
                        store.commit('ADD_SUBNETWORK', subnetworkAndEdgeCounts['subnetwork']);
                        store.commit('ADD_PATHWAYS_EDGE_COUNTS', subnetworkAndEdgeCounts['pathways_edge_counts']);
                        store.commit('ADD_PATHWAYS_P_VALS', subnetworkAndEdgeCounts['pathways_p_vals']);
                        store.commit('ADD_QUERY_GENES_NOT_IN_PPI', subnetworkAndEdgeCounts['query_genes_not_in_ppi_db']);
                    }
                )
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                )

        },
        submitBugReport(store, bugReport) {
          api.post('/api/subnetwork/bug-report/', { bugReport })
              .then(
                    response => {
                    }
                )
                .catch(
                    error => {
                        store.commit('API_FAIL', error);
                    }
                )
        },
        updateDatabase(store, database) {
          store.commit('UPDATE_NETWORK_DATABASE', database)
        },
        updateDegree(store, degree) {
            store.commit('UPDATE_NETWORK_DEGREE', degree)
        },
        updateSelectedPathways(store, selectedPathways) {
            store.commit('UPDATE_SELECTED_PATHWAYS', selectedPathways)
        },
        updatePathwayColors(store, pathway_color_data) {
            store.commit('UPDATE_PATHWAY_COLOR', pathway_color_data)
        },
        updateQueryListAndPathwayHit(store, queryListAndPWHit) {
            store.commit('UPDATE_QL_AND_PW_HIT', queryListAndPWHit)
        },
        updateQueryListGenesInNetwork (store, queryListGenesInNetwork) {
            store.commit('UPDATE_QL_GENES_IN_NETWORK', queryListGenesInNetwork)
        },
        updateLabelHover(store, label) {
            store.commit('UPDATE_LABEL_HOVER', label)
        },
        updateUserPathways(store, userPathways) {
            store.commit('UPDATE_USER_PATHWAYS', userPathways);
            let pathwayColors = {};
            for (let pathway in userPathways) {
                pathwayColors[pathway] = userPathways[pathway]['color'];
            }
            store.commit('UPDATE_USER_PATHWAY_COLORS', pathwayColors)
        },
        updateUserPathwayDisplay(store, displayData) {
            store.commit('UPDATE_USER_PATHWAY_DISPLAY', displayData)
        },
        updateGOTermSelection(store, goTermData) {
            store.commit('UPDATE_GO_TERM_SELECTION', goTermData)
        },
        updateShowIsolates(store, shown) {
            store.commit('UPDATE_SHOW_ISOLATES', shown)
        }
    },
});

export default store;