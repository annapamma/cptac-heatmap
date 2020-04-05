// import rnaColorScale from './rnaColorScale.js';


function colorRange([val, hex]) {
  return {
    from: val,
    to: val,
    color: hex,
  };
}

const zscoreRanges = [
{
  from: -30,
  to: 0.0,
  color: '#00004d',
},
{
  from: 0.0,
  to: 0.05,
  color: '#003366',
},
{
  from: 0.05,
  to: 0.1,
  color: '#004c99',
},
{
  from: 0.1,
  to: 0.15,
  color: '#0066cc',
},
{
  from: 0.15,
  to: 0.2,
  color: '#0080ff',
},
{
  from: 0.2,
  to: 0.25,
  color: '#3399ff',
},
{
  from: 0.25,
  to: 0.3,
  color: '#66b2ff',
},
{
  from: 0.3,
  to: 0.35,
  color: '#82b6ff',
},
{
  from: 0.35,
  to: 0.4,
  color: '#99ccff',
},
{
  from: 0.4,
  to: 0.45,
  color: '#CCE5FF',
},
  {
  from: 0.45,
  to: 0.5,
  color: '#ffffff',
},
{
  from: 0.5,
  to: 0.55,
  color: '#ffcccc',
},
{
  from: 0.55,
  to: 0.6,
  color: '#ff9999',
},
{
  from: 0.6,
  to: 0.65,
  color: '#ff7777',
},

{
  from: 0.65,
  to: 0.7,
  color: '#ff6666',
},
  {
  from: 0.7,
  to: 0.75,
  color: '#ff5555',
},
{
  from: 0.75,
  to: 0.8,
  color: '#ff3333',
},
  {
  from: 0.8,
  to: 0.85,
  color: '#ff1111',
},
{
  from: 0.85,
  to: 0.9,
  color: '#ff0000',
},
{
  from: 0.9,
  to: 0.95,
  color: '#ff0000',
},
{
  from: 0.95,
  to: 1.0,
  color: '#E50000',
},
{
  from: 1.0,
  to: 30,
  color: '#990000',
},
];

const colorsRanges = {
  1000: '#ffffff', // Not applicable
  1001: '#d3d3d3', // Wild type
  1002: '#0c08c9', // Mutant
  1024: '#ffffff', // unknown
  1025: '#363ab0', // Male
  1026: '#f26522', // Female
  1027: '#7FC97F', // 'Lifelong non-smoker: Less than 100 cigarettes smoked in lifetime',
  1028: '#d4d417', // 'Current reformed smoker within past 15 years',
  1029: '#F0027F', // 'Current reformed smoker, more than 15 years',
  1030: '#b09021', // 'Current reformed smoker, years unknown'
  1031: '#4cb6ff', // 'Current smoker: Includes daily and non-daily smokers',
  1032: '#800080', // 'Smoking history not available',
  1033: '#FF89B0', // 'Lip',
  1034: '#7CA4E8', // 'epiglottis',
  1035: '#DBCBF1', // 'Tonsil',
  1036: '#FFD9BB', // 'Floor of mouth',
  1037: '#FA8F61', // 'Hypopharynx',
  1038: '#FFFFC3', // 'Pyrifrom sinus',
  1039: '#9CE59C', // 'Oropharynx',
  1040: '#A0A0A0', // 'Larynx',
  1041: '#468189', // 'Tongue',
  1042: '#8EF9F3', // 'Alveolar ridge',
  1043: '#BF1A2F', // ''Oral cavity',
  1044: '#755B69', // 'Buccal mucosa',
  1045: '#379634', // 'Base of tongue',
  1046: '#d3d3d3', // 'NO',
  1047: '#0c08c9', // 'YES',
};

export default {
  ranges: Object.entries(colorsRanges).map(colorRange).concat(zscoreRanges),
};
