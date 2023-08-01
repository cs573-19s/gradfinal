**Author:** S. Nusrat, T. Harbig and N. Gehlenborg

**Title:** Tasks, Techniques, and Tools for Genomic Data Visualization

**Venue:** Comput Graph Forum

**Year:** 2019

**Citations:** 70

**Aim:** 
This paper aims to:
* propose three taxonomies as they pertain to genomic data visualization:
	1. data taxonomy – genomic features
	2. task taxonomy – the most important tasks for genomic visualizations
	3. visualization taxonomy – tools
* provide examples of existing genomic visualizations along with how they fit within taxonomy


**Conclusion:** 
The authors undertook a literature review, gathering papers on existing visualization techniques as well as the aspects of visualizing biological data that they pertained to. They limited themselves to genomic visualizations with genomic-based coordinate systems that drove ordering the data within the visualization. After screening, 83 papers were surveyed to develop the taxonomy. 
The researchers were able to identify and categorize components of their three-part taxonomy.  Central to the *data taxonomy* was the preservation of sequence, regardless of the abstraction level, dimensionality, and so on.  At the highest level, the *task taxonomy* was organized around looking for features at locations or for locations based on features. The *tool taxonomy* categorized existing genomic data visualization tools by layout, arrangement, views, scales, and foci.

**How does what they're saying inform this project:** 
The authors included Hi-C data visualizations in their analysis, which gives us an idea of the current visualization landscape through the lens of their taxonomy. It also helped us identify the "level" of task Hi-C data is generally used for – reletively high, as it is often used to find similarities between large portions of the genome – and that what we want to use it for – identification of potential microscopy targets – may be mid-to-low-level, depending on the scope of our search (any genes with a given set of characteristics versus those related to a specific disease pathway, for example).
We can use the taxonomy as it is laid out to identify the components of our vis and determine if they contribute to accomplishing our goals.


Note: This paper is cited heavily in the 2022 L'Yi paper, "Gosling: A Grammar-based Toolkit for Scalable and Interactive Genomics Data Visualization"
