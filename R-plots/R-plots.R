
abc = read.csv("cluster_matrix_R.csv",sep=",",row.names=1)
names(abc) = 1:48

def = read.csv("cluster_matrix_sum_R.csv",sep=",",row.names=1)
names(def) = 1:48

library(dplyr)
library(tidyr)
library(ggplot2)

ghi = abc/def

samp = ifelse(def[,1]>exp(7.5),T,F)

ghi = ghi[samp,]

Out = ghi %>% 
  select(1:24) %>% 
  mutate(station=as.numeric(row.names(ghi))) %>% 
  gather(key = "hour", value = "proportion",1:24) %>% 
  mutate(hour = as.numeric(hour)-1)
names(Out) = c("Station","Hour","Proportion")

In = ghi %>% 
  select(25:48) %>% 
  mutate(station=as.numeric(row.names(ghi))) %>% 
  gather(key = "hour", value = "proportion",1:24) %>% 
  mutate(hour = as.numeric(hour)-25)
names(In) = c("Station","Hour","Proportion")

In_minus_Out = In %>% 
  mutate(Proportion = In$Proportion - Out$Proportion)

df = cbind(rbind(Out,In),rep(c("Out","In"),each=dim(In)[1]) )
names(df) = c("Station","Hour","Proportion","Bikes")

#write.csv(In,"Historical_Bikes_In.csv",row.names = F)
#write.csv(Out,"Historical_Bikes_Out.csv",row.names = F)
#write.csv(In_minus_Out,"Historical_Bikes_In_-_Out.csv",row.names = F)
#write.csv(df,"Historical_Bikes_In_Out.csv",row.names = F)

## 1) Total In/Out Trips per Station:
Bikes = rep(c("Out","In"),each=length(def[,1]))
Trips = c(c(def[,1],def[,48]))

ggplot()+
  geom_boxplot(aes(x=Bikes,y=log( Trips+1 ),color=Bikes))+
  scale_y_continuous(breaks = c(0,2,4,6,8,10,12,14,16))+
  scale_colour_manual(values=c("#00BFC4","#F8766D"))

summary(log(1+def[,1]))
exp(9.5)
ggplot()+
geom_histogram(aes(c(def[,48]/def[,1])))

#2 In/Out over Time
#Top Out: 35,76,91,192,177,268,85,77,90,174
#Top In: 35,76,177,91,268,192,90,85,77,174

df %>% 
  filter(Station %in% c(35,91,192,85,90,77) ) %>% 
  ggplot()+
  geom_point(aes(x=Hour,y=Proportion,color=Bikes))+
  geom_line(aes(x=Hour,y=Proportion,color=Bikes),se=F)+
  facet_wrap(~Station)+
  scale_colour_manual(values=c("#00BFC4","#F8766D"))+
  scale_x_continuous(breaks=c(0,2,4,6,8,10,12,14,16,18,20,22,24))+
  scale_y_continuous(breaks=c(0,0.05,0.1,0.15,0.2,0.25,0.3),
                     labels=c("0%","5%","10%","15%","20%","25%","30%"))
  
#3 In - Out over Time
#Top Out: 35,76,91,192,177,268,85,77,90,174
#Top In: 35,76,177,91,268,192,90,85,77,174

In_minus_Out %>% 
  filter(Station %in% c(35,91,192,85,90,77) ) %>% 
  mutate(Net_Bikes = ifelse(Proportion<0,"Out","In")) %>% 
  ggplot()+
  geom_point(aes(x=Hour,y=Proportion,color=Net_Bikes))+
  facet_wrap(~Station)+
  scale_colour_manual(values=c("#00BFC4","#F8766D"))+
  scale_x_continuous(breaks=c(0,2,4,6,8,10,12,14,16,18,20,22,24))+
  scale_y_continuous(breaks=c(-0.2,-0.15,-0.1,-0.05,0,0.05,0.1,0.15,0.2,0.25,0.3),
                     labels=c("-20%","-15%","-10%","-5%","0%","5%","10%","15%","20%","25%","30%"))







  
