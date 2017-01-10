//
//  CagifGetSteps.m
//  CaGif
//
//  Created by Michail Shaposhnikov on 10/23/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "CagifGetSteps.h"

@implementation CagifGetSteps

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getSteps:(NSString *)startTimestamp)
{
  if ([HKHealthStore isHealthDataAvailable] == NO) {
    // If our device doesn't support HealthKit -> return.
    return;
  }
  
  NSArray *readTypes = @[[HKObjectType characteristicTypeForIdentifier:HKQuantityTypeIdentifier.stepCount]];
  
  
  [self.healthStore requestAuthorizationToShareTypes:[NSSet setWithArray:readTypes] completion:nil];
}

@end
