**Author:** N. Harmston, E. Ing-Simmons, M. Perry, A. Baresic and B. Lenhard

**Title:** GenomicInteractions: An R/Bioconductor package for manipulating and investigating chromatin interaction data

**Venue:** BMC Genomics

**Year:** 2015

**Citations:** 49

**Aim:** 
This group aimed to build an R/Bioconductor package " for the manipulation, annotation and visualization of various types of chromatin interactions data" bridging the gap left by existing tools, which either did not interface with R/Bioconductor or were specific to one chromatin capture technique.
tool that takes inputs in formats beyond BAM
implementation in R to facilitate integration of different "omic" data types


**Conclusion:** 
The researchers developed the R/Bioconductor project as described. They demonstrated its use for both "regular" Hi-C data collected at a low resolution (100kb) as well as Chromatin Interaction Analysis with Paired-End Tag (ChIA-PET) data for PolIII. They showed that summary statistics as well as chord diagram could be created for both kinds of data using their R package.

**How does what they're saying inform this project:** 
First of all, the researchers used HOMER to filter their reads, which is not commonly done with Hi-C data (at least not any more*) but was what was done with the data we were using in its originally published analysis. While it did not directly inform our method, it exemplified one of the reoccurring themes of differences in bioinformatic pipelines aimed at the same goal. Often, the reason for picking X tool over Y tool is not given and this paper was no exception.


*4DN uses pairtools, which used to be called pairsamtools, to filter Hi-C reads in their recommended analysis pipeline
