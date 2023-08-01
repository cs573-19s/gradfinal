**Authors:** B. Rowland, R. Huh, Z. Hou, C. Crowley, J. Wen, Y. Shen, et al.

**Title:** THUNDER: A reference-free deconvolution method to infer cell type proportions from bulk Hi-C data

**Venue:** PLoS Genetics

**Year:** 2022

**Citations:** 6

**Aim:** 
THUNDER is a statistical approach proposed to inferring cell type (including differentiation between cell-cycle states) from a heterogeneous sample, specifically bulk Hi-C data. The approach consists of a feature seleection step followed by a deconvolution step. As part of the method, intra- and inter-chromosomal interactions are considered, which is not the norm (they are the first to their knowledge to do so for this task).  Simulated datasets were created by aggregating scHi-C datasets so that known proportions of cell type could be used for evaluating the method.
For feature selection, 11 published and one novel feature selection method were applied to 12 simulated Hi-C datasets across five simulated replicates. They results were compared for various Hi-C readouts such as inter- and intra-chromosomal contacts and TAD insulation scores. THUNDER was compared to other methods: reference dependent (MuSiC), unsupervised (TOAST), and matrix-based decomposition (3CDE).


**Conclusion:** 
THUNDER consistently clustered cell types such that the researchers were able to identify the types by the characteristics of each cluster. The method performed better than other reference-free methods. When compared to reference-based methods, while out performed when the sample contained only cell types with references, it was more robust in situations where complete reference data was not available. It also performed better when both inter- and intra-chromosomal interactions were used as features, though doing so came with some computation cost. Given the statistical nature of this method, however, it is possible to subset the original data to run in parallel and combine the output for the final estimation step. 

**How does what they're saying inform this project:** 
While this paper does not directly inform the visualization aspect of this project, it does inform the data procurement/processing aspect of applications of this project. For example, if we wanted to give context to a visualization of the interaction between two genes from a bulk Hi-C dataset, being able to estimate the proportion of cells in each stage would give such a context. It may also be another tool for determining which genes interact in a cell-type specific way, which is a basis for selecting gene pairs to visualize using our method.
