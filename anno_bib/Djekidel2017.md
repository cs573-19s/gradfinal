10.1007/s40484-017-0091-8

**Author:** M. N. Djekidel, M. Wang, M. Q. Zhang and J. Gao

**Title:** HiC-3DViewer: a new tool to visualize Hi-C data in 3D space

**Venue:** Quantitative Biology 

**Year:** 2017

**Citations:** 15

**Aim:** 
The creators of HiC-3DViewer set out to overcome a variety of limitations with currently available methods of viewing Hi-C data within a 3D environment, which is a worthy goal given the purpose of HiC data: to provide data on the 3D structure of chromatin in the nucleus. Most existing tools only allowed users to see pre-set data during 3D exploration, with users limited to 2D for visualizing their own data. 3D tools that did allow for import of user data were originally designed for protein visualization (eg. PyMol, Chimera) and were prone to losing information with respect to genomic coordinates, limiting the ability to overlay additional datatypes (ex. ChIP-seq) on of Hi-C visualizations.
To address the first limitiation, allowing users to import their own data, they created an interface that either: 1. accepted data output from a 3d prediction tool data, or 2. utilize an accompanying set of 3D structral prediction algorithms. With the 3D prediction model data, the model was loaded with a 1D-2D-3D view structure*, which was previously unavaible for exploring Hi-C data. In the case of 2D for Hi-C, instead of where proteins aligned, the added dimension were the chromatin interactions (*cis* and *trans*). Vis of *trans* interactions is not a strength of heatmaps for HiC data, making this is an additional contribution to the vis space. They overcame the second limitation by maintaining genomic coordinate information in the 3D structural prediction model and allowing users to upload BED tracks of data collected using other NGS methods (such as ChIP-seq).

/* similar to that of Chimera, which visualizes aligned 3D protein structures along with the sequence alignments of those protein, with the ability to select a region in either view and see it highlighted in the other.

**Conclusion:** 
The tool was tested with a number of different HiC datasets of varying quality and purpose. For example, in the visualization of a high quality HiC dataset, they were able to see the clustering of centromeres at the nuclear pore, as expected. However, similar patterns were not visible in a noisier dataset. To look at the outcome of visualization with other datatypes overlayed on the 3d chromatin model, the researchers combined ChIP-seq data with Hi-C data and annotated two genes that were known to co-bind. This clustering was apparent in their visualization of the overlapping datasets. The researchers achieved their goals with this visualization and also demonstrated the way poor data handicaps good visualization.


**How does what they're saying inform this project:** 
Though less common than visualizing cis-interactions, HiC-3DViewer specifically addresses trans-interactions. As we seek to develop a methodology that suits both interaction types, this tells us that there is a need for both within this space and such a method may be of use to those beyond our lab. 
The researchers used two factors (GATA1 & GATA2) that have a documented tendency to co-bind to test the efficacy of their method. We intend to adopt a similar approach in the broader project that inspired the application of probability densities to visualizing chromatin interactions. 
The use of Hi-C data alongside ChIP-seq data is also an approach we intend to mirror going forward, though with DamID data instead. 
