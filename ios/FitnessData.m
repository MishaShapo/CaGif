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

//RCT_EXPORT_METHOD(printData:(NSString *)name location:(NSString *)location)
//{
//  RCTLogInfo(@"pretending to do something with name %@ at %@", name, location);
//}
//
//RCT_EXPORT_METHOD(testCallback:(NSString *)str1 callback:(RCTResponseSenderBlock)callback)
//{
//  NSArray *arr = @[@"I",@"can",@"do this.",str1];
//  callback(@[[NSNull null], arr]);
//}


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
/* method to receive the step count for a given time period. We send the initial time as the first argument, final time as the second one and callback as the third.
 */
//RCT_EXPORT_METHOD(getStepsData:(NSDate *)startDate endDate:(NSDate *)endDate cb:(RCTResponseSenderBlock)callback){
//  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
//  NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
//  [dateFormatter setLocale:enUSPOSIXLocale];
//  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
//  HKSampleQuery *stepsQuery = [[HKSampleQuery alloc]
//                               initWithSampleType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
//                               predicate:predicate
//                               limit:2000 sortDescriptors:nil resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
//                                 if(error){
//                                   /* if there is an error, send its description to callback */
//                                   callback(@[[error localizedDescription]]);
//                                   return;
//                                 }
//                                 NSMutableArray *data = [NSMutableArray new];
//                                 for (HKQuantitySample* sample in results) {
//                                   double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
//                                   NSNumber *val = [NSNumber numberWithDouble:count];
//                                   NSMutableDictionary* s = [NSMutableDictionary new];
//                                   [s setValue:val forKey:@"value"];
//                                   [s setValue:sample.sampleType.description forKey:@"data_type"];
//                                   [s setValue:[dateFormatter stringFromDate:sample.startDate] forKey:@"start_date"];
//                                   [s setValue:[dateFormatter stringFromDate:sample.endDate] forKey:@"end_date"];
//                                   [data addObject:s];
//                                 }
//                                 /* if everything is OK, call up a callback; null will be the first argument as there are ni mistakes, the array of data will come after it. */
//                                 callback(@[[NSNull null], data ]);
////                                 [self.bridge.eventDispatcher sendAppEventWithName:@"NewSteps" body:@{@"data": data}];
//                               }];
//  [self.healthKitStore executeQuery:stepsQuery];
//};

//RCT_EXPORT_METHOD(getStepsObserver:(NSDate *)startDate endDate:(NSDate *)endDate cb:(RCTResponseSenderBlock)callback){
//  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
//  endDate = [NSDate date];
//  NSDateComponents *dateComponents = [[NSDateComponents alloc] init];
//  [dateComponents setDay:-5];
//  startDate = [[NSCalendar currentCalendar] dateByAddingComponents:dateComponents toDate:endDate options:0];
//  NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
//  [dateFormatter setLocale:enUSPOSIXLocale];
//  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
//  HKObserverQuery *observerQuery = [[HKObserverQuery alloc]
//                               initWithSampleType:[HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
//                               predicate:predicate
//                               updateHandler:^(HKObserverQuery *query, HKObserverQueryCompletionHandler completionHandler, NSError *error) {
//                                 if(error){
//                                   /* if there is an error, send its description to callback */
////                                   callback(@[[error localizedDescription]]);
//                                   [self.bridge.eventDispatcher sendAppEventWithName:@"NewSteps" body:@{@"error": [error localizedDescription]}];
//                                   return;
//                                 }
//                                 RCTLogInfo(@"Running observer updateHandler");
//                                 HKSampleQuery *stepsQuery = [[HKSampleQuery alloc]
//                                                              initWithSampleType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
//                                                              predicate:predicate
//                                                              limit:2000 sortDescriptors:nil resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
//                                                                if(error){
//                                                                  /* if there is an error, send its description to callback */
//                                                                  callback(@[[error localizedDescription]]);
//                                                                  return;
//                                                                }
//                                                                NSMutableArray *data = [NSMutableArray new];
//                                                                for (HKQuantitySample* sample in results) {
//                                                                  double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
//                                                                  NSNumber *val = [NSNumber numberWithDouble:count];
//                                                                  NSMutableDictionary* s = [NSMutableDictionary new];
//                                                                  [s setValue:val forKey:@"value"];
//                                                                  [s setValue:sample.sampleType.description forKey:@"data_type"];
//                                                                  [s setValue:[dateFormatter stringFromDate:sample.startDate] forKey:@"start_date"];
//                                                                  [s setValue:[dateFormatter stringFromDate:sample.endDate] forKey:@"end_date"];
//                                                                  [data addObject:s];
//                                                                }
//                                                                /* if everything is OK, call up a callback; null will be the first argument as there are ni mistakes, the array of data will come after it. */
////                                                                callback(@[[NSNull null], data ]);
//                                                                [self.bridge.eventDispatcher sendAppEventWithName:@"NewSteps" body:@{@"data": data}];
//                                                              }];
//                                 [self.healthKitStore executeQuery:stepsQuery];
//
//                               }];
//  [self.healthKitStore executeQuery:observerQuery];
//};

//RCT_EXPORT_METHOD(getStepsObserver:(RCTResponseSenderBlock)callback){
//  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
//  __block NSDate* endDate = [NSDate date];
//  NSDateComponents *dateComponents = [[NSDateComponents alloc] init];
//  [dateComponents setDay:-5];
//  __block NSDate* startDate = [[NSCalendar currentCalendar] dateByAddingComponents:dateComponents toDate:endDate options:0];
//  __block NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
//  [dateFormatter setLocale:enUSPOSIXLocale];
//  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
//  HKObserverQuery *observerQuery = [[HKObserverQuery alloc]
//                                    initWithSampleType:[HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
//                                    predicate:predicate
//                                    updateHandler:^(HKObserverQuery *query, HKObserverQueryCompletionHandler completionHandler, NSError *error) {
//                                      if(error){
//                                        /* if there is an error, send its description to callback */
//                                        //                                   callback(@[[error localizedDescription]]);
//                                        [self.bridge.eventDispatcher sendAppEventWithName:@"NewSteps" body:@{@"error": [error localizedDescription]}];
//                                        return;
//                                      }
//                                      RCTLogInfo(@"Running observer updateHandler");
//                                      NSDate* endDate = [NSDate date];
//                                      NSDateComponents *dateComponents = [[NSDateComponents alloc] init];
//                                      [dateComponents setDay:-5];
//                                      NSDate* startDate = [[NSCalendar currentCalendar] dateByAddingComponents:dateComponents toDate:endDate options:0];
//                                      NSPredicate *predicate = [HKQuery predicateForSamplesWithStartDate:startDate endDate:endDate options:HKQueryOptionStrictStartDate];
//                                      HKSampleQuery *stepsQuery = [[HKSampleQuery alloc]
//                                                                   initWithSampleType:[HKQuantityType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount]
//                                                                   predicate:predicate
//                                                                   limit:2000 sortDescriptors:nil resultsHandler:^(HKSampleQuery *query, NSArray *results, NSError *error) {
//                                                                     if(error){
//                                                                       /* if there is an error, send its description to callback */
//                                                                       callback(@[[error localizedDescription]]);
//                                                                       return;
//                                                                     }
//                                                                     NSMutableArray *data = [NSMutableArray new];
//                                                                     for (HKQuantitySample* sample in results) {
//                                                                       double count = [sample.quantity doubleValueForUnit:[HKUnit countUnit]];
//                                                                       NSNumber *val = [NSNumber numberWithDouble:count];
//                                                                       NSMutableDictionary* s = [NSMutableDictionary new];
//                                                                       [s setValue:val forKey:@"value"];
//                                                                       [s setValue:sample.sampleType.description forKey:@"data_type"];
//                                                                       [s setValue:[dateFormatter stringFromDate:sample.startDate] forKey:@"start_date"];
//                                                                       [s setValue:[dateFormatter stringFromDate:sample.endDate] forKey:@"end_date"];
//                                                                       [data addObject:s];
//                                                                     }
//                                                                     /* if everything is OK, call up a callback; null will be the first argument as there are ni mistakes, the array of data will come after it. */
//                                                                     //                                                                callback(@[[NSNull null], data ]);
//                                                                     [self.bridge.eventDispatcher sendAppEventWithName:@"NewSteps" body:@{@"data": data}];
//                                                                   }];
//                                      [self.healthKitStore executeQuery:stepsQuery];
//                                      
//                                    }];
//  [self.healthKitStore executeQuery:observerQuery];
//};
//

RCT_EXPORT_METHOD(getStepStats:(RCTResponseSenderBlock)callback){
  RCTLogInfo(@"getStepsStats native log");
  
  
  NSCalendar *calendar = [NSCalendar currentCalendar];
  NSDateComponents *interval = [[NSDateComponents alloc] init];
  interval.day = 7;
  
  // Set the anchor date to Monday at 3:00 a.m.
  NSDateComponents *anchorComponents =
  [calendar components:NSCalendarUnitDay | NSCalendarUnitMonth |
   NSCalendarUnitYear | NSCalendarUnitWeekday fromDate:[NSDate date]];
  
  NSInteger offset = (7 + anchorComponents.weekday - 2) % 7;
  anchorComponents.day -= offset;
  anchorComponents.hour = 3;
  
  NSDate *anchorDate = [calendar dateFromComponents:anchorComponents];
  
  HKQuantityType *quantityType =
  [HKObjectType quantityTypeForIdentifier:HKQuantityTypeIdentifierStepCount];
  
  
  
  // Create the query
  HKStatisticsCollectionQuery *query =
  [[HKStatisticsCollectionQuery alloc]
   initWithQuantityType:quantityType
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
      callback(@[[error localizedDescription]]);
      abort();
    }
    
    RCTLogInfo(@"initalResultsHanlder");
    
    NSDate *endDate = [NSDate date];
    NSDate *startDate = [calendar
                         dateByAddingUnit:NSCalendarUnitMonth
                         value:-3
                         toDate:endDate
                         options:0];
    
    // Plot the weekly step counts over the past 3 months
    [results
     enumerateStatisticsFromDate:startDate
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
         [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": dateString}];
       }
       
     }];
  };
  
  query.statisticsUpdateHandler =
  ^(HKStatisticsCollectionQuery *query, HKStatistics *statistics, HKStatisticsCollection *results, NSError *error) {
    if (error) {
      // Perform proper error handling here
      RCTLogInfo(@"*** An error occurred while calculating the statistics: %@ ***",
            error.localizedDescription);
      callback(@[[error localizedDescription]]);
      abort();
    }
    
    RCTLogInfo(@"statisticsUpdateHandler");
    
    NSDate *endDate = [NSDate date];
    NSDate *startDate = [calendar
                         dateByAddingUnit:NSCalendarUnitMonth
                         value:-3
                         toDate:endDate
                         options:0];
    
    [results
     enumerateStatisticsFromDate:startDate
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
         [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": dateString}];
       }
       
     }];

    
//    HKQuantity *quantity = statistics.sumQuantity;
//      if (quantity) {
//        NSDate *date = statistics.startDate;
//        double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
//        NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
//        [dateFormatter setDateFormat:@"dd-MM-yyyy"];
//        NSString *dateString = [dateFormatter stringFromDate:date];
//    
//             // Call a custom method to plot each data point.
//        [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": dateString}];
//      } else {
//        RCTLogInfo(@"updateHandler no quantity");
//      }
//    
//    NSDate *endDate = [NSDate date];
//    NSDate *startDate = [calendar
//                         dateByAddingUnit:NSCalendarUnitDay
//                         value:-5
//                         toDate:endDate
//                         options:0];
//    
    // Plot the weekly step counts over the past 5 days
//    [results
//     enumerateStatisticsFromDate:startDate
//     toDate:endDate
//     withBlock:^(HKStatistics *result, BOOL *stop) {
//       
//       HKQuantity *quantity = result.sumQuantity;
//       if (quantity) {
//         NSDate *date = result.startDate;
//         double value = [quantity doubleValueForUnit:[HKUnit countUnit]];
//         
//         // Call a custom method to plot each data point.
//        [self.bridge.eventDispatcher sendAppEventWithName:@"StepStats" body:@{@"value": [NSNumber numberWithDouble:value], @"date": date}];
//       }
//       
//     }];
  };
  
  [self.healthKitStore executeQuery:query];

}






@end
