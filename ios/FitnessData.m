//
//  FitnessData.m
//  CaGif
//
//  Created by Michail Shaposhnikov on 1/6/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "FitnessData.h"
#import <React/RCTLog.h>
#import <HealthKit/HealthKit.h>
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface FitnessData ()

@property (nonatomic, retain) HKHealthStore *healthStore;

@end

@implementation FitnessData

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();


- (NSDictionary *)constantsToExport
{
  NSMutableDictionary *hkConstants = [NSMutableDictionary new];
  NSMutableDictionary *hkQuantityTypes = [NSMutableDictionary new];
  [hkQuantityTypes setValue:HKQuantityTypeIdentifierStepCount forKey:@"StepCount"];
  [hkConstants setObject:hkQuantityTypes forKey:@"Type"];
  return hkConstants;
}
/* method to ask for permission to get access to data from HealthKit */
RCT_EXPORT_METHOD(askForPermissionToReadTypes:(NSArray *)types callback:(RCTResponseSenderBlock)callback){
  if(!self.healthKitStore){
    self.healthKitStore = [[HKHealthStore alloc] init];
  }
  NSMutableSet* typesToRequest = [NSMutableSet new];
  for (NSString* type in types) {
    [typesToRequest addObject:[HKQuantityType quantityTypeForIdentifier:type]];
  }
  [self.healthKitStore requestAuthorizationToShareTypes:nil readTypes:typesToRequest completion:^(BOOL success, NSError *error) {
    /* if everything is fine, we call up a  callback with argument null that triggers the error */
    if(success){
      callback(@[[NSNull null]]);
      return;
    }
    /* otherwise, send the error message to callback */
    callback(@[[error localizedDescription]]);
  }];
}


RCT_EXPORT_METHOD(getStepStats:(NSDate * )startDate){
  RCTLogInfo(@"getStepsStats native log");
  
  
  NSCalendar *calendar = [NSCalendar currentCalendar];
  NSDateComponents *comps = [calendar components:NSCalendarUnitDay|NSCalendarUnitMonth|NSCalendarUnitYear fromDate:startDate];
  comps.hour = 0;
  comps.minute = 0;
  comps.second = 0;
  
  NSDate *midnightOfStartDate = [calendar dateFromComponents:comps];
  NSDate *anchorDate = midnightOfStartDate;
  
  HKQuantityType *stepType = [HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
//  HKStatisticsOptions sumOptions = HKStatisticsOptionCumulativeSum;
//  NSPredicate *dateRangePred = [HKQuery predicateForSamplesWithStartDate:midnightOfStartDate endDate:today options:HKQueryOptionNone];
  
  NSDateComponents *interval = [[NSDateComponents alloc] init];
  interval.day = 1;
//  HKStatisticsCollectionQuery *query = [[HKStatisticsCollectionQuery alloc] initWithQuantityType:stepType quantitySamplePredicate:dateRangePred options:sumOptions anchorDate:anchorDate intervalComponents:interval];
//  
//  NSCalendar *calendar = [NSCalendar currentCalendar];
//  NSDateComponents *interval = [[NSDateComponents alloc] init];
//  interval.day = 1;
//  
//  // Set the anchor date to Monday at 3:00 a.m.
//  NSDateComponents *anchorComponents =
//  [calendar components:NSCalendarUnitDay | NSCalendarUnitMonth |
//   NSCalendarUnitYear | NSCalendarUnitWeekday fromDate:[NSDate date]];
//  
//  NSInteger offset = (7 + anchorComponents.weekday - 2) % 7;
//  anchorComponents.day -= offset;
//  anchorComponents.hour = 3;
//  
//  NSDate *anchorDate = [calendar dateFromComponents:anchorComponents];
//  
//  HKQuantityType *quantityType =
//  [HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
//  
//  
//  
//  // Create the query
  HKStatisticsCollectionQuery *query =
  [[HKStatisticsCollectionQuery alloc]
   initWithQuantityType:stepType
   quantitySamplePredicate:nil
   options:HKStatisticsOptionCumulativeSum
   anchorDate:anchorDate
   intervalComponents:interval];
  
  // Set the results handler
  query.initialResultsHandler =
  ^(HKStatisticsCollectionQuery *query, HKStatisticsCollection *results, NSError *error) {
    
    if (error) {
      // Perform proper error handling here
      RCTLogInfo(@"*** An error occurred while calculating the statistics: %@ ***",
            error.localizedDescription);
      [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"error": [error localizedDescription]}];
      abort();
    }
    
    RCTLogInfo(@"initalResultsHanlder");
    
//    NSMutableArray *output = [NSMutableArray array];
//    
//    // we want "populated" statistics only, so we use result.statistics to iterate
//    for (HKStatistics *sample in results.statistics) {
//      double steps = [sample.sumQuantity doubleValueForUnit:[HKUnit countUnit]];
//      NSDictionary *dict = @{@"date": sample.startDate, @"steps": @(steps)};
//      RCTLogInfo(@"[STEP] date:%@ steps:%.0f", sample.startDate, steps);
//      [output addObject:dict];
//    }
    
    NSDate *endDate = [NSDate date];
//    NSDate *startDate = [calendar
//                         dateByAddingUnit:NSCalendarUnitDay
//                         value:-1
//                         toDate:endDate
//                         options:0];
//    
//    // Plot the weekly step counts over the past 3 months
    [results
     enumerateStatisticsFromDate:anchorDate
     toDate:endDate
     withBlock:^(HKStatistics *result, BOOL *stop) {
       
       HKQuantity *quantity = result.sumQuantity;
       if (quantity) {
         NSDate *date = result.startDate;
         double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
         
         // Call a custom method to plot each data point.
         NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
         [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
         NSString *dateString = [dateFormatter stringFromDate:date];
         
         [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": dateString, @"endDate": [dateFormatter stringFromDate:endDate]}];
       }
       
     }];
  };
  
  query.statisticsUpdateHandler =
  ^(HKStatisticsCollectionQuery *query, HKStatistics *statistics, HKStatisticsCollection *results, NSError *error) {
    if (error) {
      // Perform proper error handling here
      RCTLogInfo(@"*** An error occurred while calculating the statistics: %@ ***",
            error.localizedDescription);
      [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"error": [error localizedDescription]}];
      abort();
    }
    
    RCTLogInfo(@"statisticsUpdateHandler");
//    NSMutableArray *output = [NSMutableArray array];
//
//    // we want "populated" statistics only, so we use result.statistics to iterate
//    for (HKStatistics *sample in results.statistics) {
//      double steps = [sample.sumQuantity doubleValueForUnit:[HKUnit countUnit]];
//      NSDictionary *dict = @{@"date": sample.startDate, @"steps": @(steps)};
//      RCTLogInfo(@"[STEP] date:%@ steps:%.0f", sample.startDate, steps);
//      [output addObject:dict];
//    }
    
    NSDate *endDate = [NSDate date];
//    NSDate *startDate = [calendar
//                         dateByAddingUnit:NSCalendarUnitDay
//                         value:-1
//                         toDate:endDate
//                         options:0];
    
    [results
     enumerateStatisticsFromDate:anchorDate
     toDate:endDate
     withBlock:^(HKStatistics *result, BOOL *stop) {
       
       HKQuantity *quantity = result.sumQuantity;
       if (quantity) {
         NSDate *date = result.startDate;
         double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
         
         // Call a custom method to plot each data point.
         NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
         [dateFormatter setDateFormat:@"dd-MM-yyyy"];
         NSString *dateString = [dateFormatter stringFromDate:date];
         
         //         callback(@[[NSNull null], @{@"value": [NSNumber numberWithDouble:value], @"date": dateString} ]);
         [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": dateString, @"endDate": [dateFormatter stringFromDate:endDate]}];       }
       
     }];
  };
  
  [self.healthKitStore executeQuery:query];

}






@end
