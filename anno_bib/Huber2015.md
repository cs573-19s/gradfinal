**Author:** W. Huber, V. J. Carey, R. Gentleman, S. Anders, M. Carlson, B. S. Carvalho, et al.

**Title:** Orchestrating high-throughput genomic analysis with Bioconductor

**Venue:** Nature Methods

**Year:** 2015

**Citations:** 3,114

**Aim:** This paper introduce the Bioconductor project, an open-source, open-development project rooted in the R language. The aim of this project is to provide packages for bioinformaticians that can be used in conjunction with each other. One of the highlighted features of Bioconductor is the documentation, which not only provides function definitions and the like, it includes vingettes with examples within their intended research context.

**Conclusion:** The paper provides the general schema of Bioconductor packages and how they interlink. This includes a brief walk through of how *GenomicRanges*, a foundational package, applies to genomic data and the algebra required to perform common operations such as counting within designated bins along a gene. It also outlines various data structures used to organize experiment information and results, which are used across the platform. The utility of Bioconductor as a training tool is also apparent through its inclusion of datasets that can be used to learn tool use through application. And, of course, Bioconductor provides means for visualizing biological data. 


**How does what they're saying inform this project:** 
Bioconductor provides data structures as well as packages for manipulating genomic data. If used with data run analyzed using Bioconductor-based pipelines, by ourselves or others, the code used should align with such data structures. This paper gives us an understanding of the landscape within which our project sits.
