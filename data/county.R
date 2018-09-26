library(tidyverse)
library(readxl)
library(jsonlite)


setwd("projects/county/data")
getwd()


mn <- "county-to-county-2011-2015-current-residence-sort.xlsx"

mnData <-read_xlsx(mn, sheet="Minnesota")
azData <-read_xlsx(mn, sheet="Arizona")



View(azData)
View(dataRaw)

dataRaw <- "county-to-county-2011-2015-current-residence-sort.xlsx" %>% 
  excel_sheets() %>% 
  set_names() %>% 
  map_df(~ read_excel(path = "county-to-county-2011-2015-current-residence-sort.xlsx", sheet=.x), .id="sheet")


# 
# dataRaw1 <- "county-to-county-2011-2015-previous-residence-sort.xlsx" %>% 
#   excel_sheets() %>% 
#   set_names() %>% 
#   map_df(~ read_excel(path = "county-to-county-2011-2015-previous-residence-sort.xlsx", sheet=.x), .id="sheet")


unqLoc <- as.data.frame(unique(county$currentLocation))
colnames(unqLoc) <- "currentLocation"



dis <- distinct(county, currentFips, .keep_all = TRUE)
dis <-  dis %>% select(currentFips, currentLocation)

write_json(dis, "countiesDistinct.json")



unqLoc <- mutate(fips =  county[ ,currentLocation==unqLoc$currentLocation]  )
locations <- inner_join(unqLoc, county)
View(locations)
# countyRaw <- read_xlsx("county-to-county-2011-2015-current-residence-sort.xlsx")





View(countyRaw)

# master <- data.frame;
# colnames(master) <- c("currentFips", "formerFips", "currentState", "currentCounty", "formerState", "formerCounty", "number")


county <- dataRaw %>% select(-1)
county <- county %>% select(c(1,2,3,4,5,6, 21,22,37))
colnames(county) <- c("currentStateFips", "currentFips", "formerStateFips", "formerFips", "currentState", "currentCounty", "formerState", "formerCounty", "number")
county <- county[4:nrow(county),]

county <- county %>% mutate(currentLocation = paste0(currentCounty, ', ', currentState))
county <- county %>% mutate(formerLocation = paste0(formerCounty, ', ', formerState))

county <- county %>% mutate(currentFips = paste0(currentStateFips, currentFips))
county <- county %>% mutate(formerFips = paste0(formerStateFips, formerFips))


county <- county %>% mutate(currentFips = substr(county$currentFips, 2,6))
county <- county %>% mutate(formerFips = substr(county$formerFips, 2,6))

county <- county %>% select(-currentStateFips, -formerStateFips, -currentState, -currentCounty, -formerState, -formerCounty, -currentLocation, -formerLocation)

write_csv(county, "countyMin.csv")

countyMin <-  county %>% mutate(id=1:n()) %>% select (id, currentFips, formerFips, number)

countyMinSmall <- countyMin[1:300,]

countySpread <- countyMin %>%  spread(key=formerFips, value = number, fill=0) %>% write_csv("countySpread.csv")

View(countySpread)


View(countySpread)
write_csv(county, "county.csv")
write_json(county, "county.json")







clal <- county %>% filter(currentCounty=="Clallam County")
clalFor <- county %>% filter(formerCounty=="Clallam County")


hen <-  county %>% filter(currentCounty=="Hennepin County")
henFor <-  county %>% filter(formerCounty=="Hennepin County")



jun <-  county %>% filter(County=="Juneau City and Borough")
junFor <-  county %>% filter(formerCounty=="Juneau City and Borough")


View(clal)
View(clalFor)

View(henFor)

View(jun)
View(junFor)






